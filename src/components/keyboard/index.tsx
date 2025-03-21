import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import Model from './Model';

const Keyboard = ({
    isInteractive = true,
    playWaveLoop = false,
    zoom = 1
}: {
    isInteractive: boolean
    playWaveLoop: boolean
    zoom: number
}) => {
    const filePath = '/keyboard.glb'
    const { scene, animations, cameras } = useGLTF(filePath, true);//enable compression
    const mainCamera = cameras[0] as THREE.PerspectiveCamera;
    const [playWave, setPlayWave] = useState<(() => void) | null>(null);
    const [playSpin, setPlaySpin] = useState<(() => void) | null>(null);
    const [currentCap, setCurrentCap] = useState<string | null>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });


    useEffect(() => {
        console.log("scene", scene)
        console.log("animations", animations)
        console.log("mainCamera", mainCamera)

        const handleMouseMove = (event: MouseEvent) => {
            setMousePosition({
                x: event.clientX,
                y: event.clientY
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const keycapInfo: Record<string, { title: string; description: string }> = {
        "0,0": { "title": "JavaScript", "description": "❤️" },
        "0,1": { "title": "Python", "description": "ngl\n It's my introductory programming language." },
        "0,2": { "title": "NodeJS", "description": "use JS to build the whole stack\n performance is not promissed 😝" },
        "0,3": { "title": "SolidWorks", "description": "The best modeling software I've found\nXD" },
        "1,0": { "title": "TypeScript", "description": "Thanks god!🙌\n We have type system now" },
        "1,1": { "title": "golang", "description": "if err != nil {\n\treturn err\n}\nif err != nil {\n\treturn err\n}\nif err != nil {\n\treturn err\n}\nif err != nil..." },
        "1,2": { "title": "Ubuntu", "description": "Linux for humans? 🤨" },
        "1,3": { "title": "blender", "description": "I'm absolutely a rookie in this 🤓" },
        "2,0": { "title": "React", "description": "old old friend" },
        "2,1": { "title": "C++", "description": "I hate memory management 😡" },
        "2,2": { "title": "Wails", "description": "Is Tauri a Rust version of Wails or Wails a Go version of Tauri? 🤔" },
        "2,3": { "title": "Photoshop", "description": "Just handle some basic pictures processing" },
        "3,0": { "title": "Vite", "description": "Lightning fast hot reload" },
        "3,1": { "title": "Git", "description": "always remember to add .env into .gitignore 😵‍💫" },
        "3,2": { "title": "Electron", "description": "All in one, only JS can do" },
        "3,3": { "title": "Lightroom", "description": "Makes photos look good or bad" },
        "4,0": { "title": "Tailwind", "description": "CSS that writes itself,\n I don't know how to write CSS 😢" },
        "4,1": { "title": "Vim", "description": ":wq" },
        "4,2": { "title": "PyWebview", "description": "Build desktop apps with Python backend,\nif you need to" },
        "4,3": { "title": "more", "description": "LOL🤡\n just a placeholder" }
    }


    return (
        <div className="relative w-full h-full">
            <Canvas camera={mainCamera} >

                <ambientLight intensity={0.5} />
                <directionalLight
                    position={[-5, 5, -5]}
                    intensity={0.3}
                />
                <directionalLight
                    position={[10, 10, 5]}
                    intensity={1}
                    castShadow
                />
                <Model
                    scene={scene}
                    animations={animations}
                    camera={mainCamera}
                    onWaveAnimationsReady={(playFn) => setPlayWave(() => playFn)}
                    onSpinAnimationsReady={(playFn) => setPlaySpin(() => playFn)}
                    isInteractive={isInteractive}
                    playWaveLoop={playWaveLoop}
                    setCurrentCap={setCurrentCap}
                    zoom={zoom}
                />
            </Canvas>
            {/* <div className="absolute top-0 left-0">
                <p>{filePath}</p>
            </div> */}
            {currentCap && isInteractive && (
                <div
                    className="fixed p-4 bg-white/20 backdrop-blur-sm border-1 border-white rounded-md pointer-events-none"
                    style={{
                        left: `${mousePosition.x + 15}px`,
                        top: `${mousePosition.y + 15}px`
                    }}
                >
                    <div className="text-white text-left flex flex-col gap-4">
                        <span className="text-xl font-bold">{keycapInfo[currentCap]?.title}</span>
                        <span className={`text-lg  ${currentCap === "1,1" ? "whitespace-pre font-mono" : "whitespace-pre-line"}`}>
                            {keycapInfo[currentCap]?.description}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Keyboard;


