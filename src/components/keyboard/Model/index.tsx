
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
}: ModelProps) => {
    // followMouse({ camera });

    const {
        handlePointerEnter,
        handlePointerLeave,
        playWaveAnimation,
        playSpinAnimation
    } = keycapHoverAction({
        scene,
        animations,
        camera,
        isInteractive,
        playWaveLoop,
        setCurrentCap
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


