
import * as THREE from 'three';
import followMouse from './followMouse';
import keycapHoverAction from './keycapHoverAction';
import { OrbitControls } from '@react-three/drei';

interface ModelProps {
    scene: THREE.Group;
    animations: THREE.AnimationClip[];
    camera: THREE.PerspectiveCamera;
    setCurrentCap: (cap: string | null) => void;
    onWaveAnimationsReady: (playWave: () => void) => void
    onSpinAnimationsReady: (playSpin: () => void) => void
    isInteractive: boolean;
    playWaveLoop: boolean;
    zoom: number;
}

const Model = ({
    scene,
    animations,
    camera,
    onWaveAnimationsReady,
    onSpinAnimationsReady,
    setCurrentCap,
    isInteractive = true,
    playWaveLoop = false,
    zoom = 1
}: ModelProps) => {
    // followMouse({ camera });

    const {
        handlePointerEnter,
        handlePointerLeave,
        playWaveAnimation,
        playSpinAnimation,
    } = keycapHoverAction({
        scene,
        animations,
        camera,
        isInteractive,
        playWaveLoop,
        setCurrentCap,
        zoom
    });
    onWaveAnimationsReady(playWaveAnimation)
    onSpinAnimationsReady(playSpinAnimation)



    return (
        <group>
            <primitive
                object={scene}
                onPointerEnter={handlePointerEnter}
                onPointerLeave={handlePointerLeave}
            />
            {/* <OrbitControls /> */}
        </group>
    );
};

export default Model;


