import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface Keycap {
    action: THREE.AnimationAction;
    keycap: THREE.Object3D;
}

export default function keycapHoverAction({
    scene,
    animations,
    camera,
    isInteractive,
    playWaveLoop,
    setCurrentCap
}: {
    scene: THREE.Group;
    animations: THREE.AnimationClip[];
    camera: THREE.PerspectiveCamera;
    isInteractive: boolean;
    playWaveLoop: boolean;
    setCurrentCap: (cap: string | null) => void;
}) {
    const mixerRef = useRef<THREE.AnimationMixer | null>(null);
    const cameraMixerRef = useRef<THREE.AnimationMixer | null>(null);
    const animationSequenceRef = useRef<{
        forward: { action: THREE.AnimationAction, delay: number }[],
        reverse: { action: THREE.AnimationAction, delay: number }[]
    }>({ forward: [], reverse: [] });
    const spinActionRef = useRef<THREE.AnimationAction | null>(null);
    const waveIntervalRef = useRef<number | null>(null)

    useEffect(() => {
        const mixer = new THREE.AnimationMixer(scene);
        mixerRef.current = mixer;
        const cameraMixer = new THREE.AnimationMixer(scene);
        cameraMixerRef.current = cameraMixer;

        const keycapsList: Keycap[] = []
        animations.filter(animation => animation.name.includes("press."))
            .forEach(animation => {
                const keycapId = animation.name.slice(-3);
                const keycap = scene.getObjectByName(keycapId);
                if (!keycap) {
                    console.warn("keycap not found", keycapId);
                    return;
                }
                const action = mixer.clipAction(animation);
                action.loop = THREE.LoopOnce;
                action.clampWhenFinished = true;

                keycapsList.push({ action, keycap });

                // add animation action to keycap itself
                (keycap as any).userData = {
                    ...(keycap as any).userData,
                    isKeycap: true,
                    action: action
                };

                // prevent logo from blocking mouse event
                // add an identifier to the logo and handle it in mouse enter event 
                // coulde cause a small gap between keycap and logo
                // which will trigger leave event and enter event again when mouse move between the gap
                // use setting raycast to null instead

                const logo = keycap.children[0];// only handle the situation of first child is logo
                if (logo) {
                    (logo as any).raycast = () => { }
                    // (logo as any).userData = {
                    //     ...(logo as any).userData,
                    //     ignoreRaycast: true
                    // }
                }
            })

        // const playList = [
        //     ["0,0"],
        //     ["0,1", "1,0"],
        //     ["0,2", "1,1", "2,0"],
        //     ["0,3", "1,2", "2,1", "3,0"],
        //            ["1,3", "2,2", "3,1", "4,0"],
        //                   ["2,3", "3,2", "4,1"],
        //                          ["3,3", "4,2"],
        //                                 ["4,3"]
        // ]
        // wave animation
        const forwardSequence: { action: THREE.AnimationAction, delay: number }[] = [];
        const reverseSequence: { action: THREE.AnimationAction, delay: number }[] = [];
        animations.filter(animation => animation.name.includes("z."))
            .forEach(animation => {
                const [row, col] = animation.name.slice(-3).split(',').map(Number);
                const distance = row + col;
                const reverseDistance = 7 - distance;
                const action = mixer.clipAction(animation);
                action.loop = THREE.LoopOnce;
                action.clampWhenFinished = true;

                forwardSequence.push({
                    action,
                    delay: distance * 100// delay 100ms
                });

                reverseSequence.push({
                    action,
                    delay: reverseDistance * 100
                });
            })

        forwardSequence.sort((a, b) => a.delay - b.delay);
        reverseSequence.sort((a, b) => a.delay - b.delay);

        animationSequenceRef.current = {
            forward: forwardSequence,
            reverse: reverseSequence
        };

        // camare spin animation
        const spinAction = animations.find(animation => animation.name === "camera_spin")
        if (spinAction) {
            const action = cameraMixer.clipAction(spinAction, camera);
            action.loop = THREE.LoopOnce;
            action.clampWhenFinished = false;

            spinActionRef.current = action;
        }

        // camera flaot animation
        const floatAction = animations.find(animation => animation.name === "camera_float")
        if (floatAction) {
            const action = cameraMixer.clipAction(floatAction, camera);
            action.loop = THREE.LoopRepeat;
            action.clampWhenFinished = false;
            action.reset()
            action.play()
            // play float animation at the beginning
        }


        return () => {
            mixer.stopAllAction();
            mixerRef.current = null;
        };
    }, [])

    const playSpinAnimation = () => {
        if (spinActionRef.current) {
            spinActionRef.current.reset();
            spinActionRef.current.play();
        }
    }

    const playWaveAnimation = (reverse: boolean = false) => {
        const sequence = reverse ? 
            animationSequenceRef.current.reverse : 
            animationSequenceRef.current.forward;
            
        if (sequence.length > 0) {
            sequence.forEach(({ action, delay }) => {
                setTimeout(() => {
                    action.reset();
                    action.play();
                }, delay);
            });
        }
    };

    // event's type is PointerEvent or THREE.Event
    const handlePointerEnter = (event: any) => {
        if (!isInteractive) return;
        event.stopPropagation();

        let object = event.object;
        // console.log(object);

        if (object.userData?.isKeycap) {
            // console.log("pointer enter", object.name);
            const action = object.userData.action as THREE.AnimationAction;
            action.timeScale = 1;
            action.paused = false;
            action.play();
            setCurrentCap(object.name);
        }
    };

    const handlePointerLeave = (event: any) => {
        if (!isInteractive) return;
        event.stopPropagation();

        const object = event.object;
        if (object.userData?.isKeycap) {
            // console.log("pointer leave", object.name);
            const action = object.userData.action as THREE.AnimationAction;
            action.time = action.getClip().duration;
            action.timeScale = -1;
            action.paused = false;
            action.play();

            setCurrentCap(null);
        }
    };

    useFrame((state, delta) => {
        if (mixerRef.current) {
            mixerRef.current.update(delta);
        }
        if (cameraMixerRef.current) {
            cameraMixerRef.current.update(delta);
        }
    });


    const [targetZoom, setTargetZoom] = useState<number>(1);

    useEffect(() => {
        if (!playWaveLoop) {
            setTargetZoom(0.8)
            if (waveIntervalRef.current) {
                clearInterval(waveIntervalRef.current)
                waveIntervalRef.current = null
            }
        } else {
            setTargetZoom(0.5)
            playWaveAnimation()
            const waveInterval = setInterval(() => {
                const r = Math.round(Math.random());
                playWaveAnimation(r === 0)
            }, 9000) as unknown as number
            waveIntervalRef.current = waveInterval
        }
    }, [playWaveLoop])

    // camera smooth zoom
    useFrame(() => {
        const v = 0.05
        if (camera) {
            camera.zoom += (targetZoom - camera.zoom) * v;
            camera.updateProjectionMatrix();
        }
    })

    return {
        handlePointerEnter,
        handlePointerLeave,
        playWaveAnimation,
        playSpinAnimation
    }
}

