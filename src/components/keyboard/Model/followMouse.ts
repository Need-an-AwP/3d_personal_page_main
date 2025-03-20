import { useState, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';


export default function followMouse({camera}: {camera: THREE.OrthographicCamera}) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const initialRotation = useRef({ x: camera.rotation.x, y: camera.rotation.y });

    useFrame((state) => {
        if (!camera) return;
        
        // 计算目标旋转角度（基于初始值）
        const targetRotationX = initialRotation.current.x + (mousePosition.y - window.innerHeight / 2) * 0.0002;
        const targetRotationY = initialRotation.current.y + (mousePosition.x - window.innerWidth / 2) * 0.0002;
        
        // 平滑插值
        camera.rotation.x += (targetRotationX - camera.rotation.x) * 0.05;
        camera.rotation.y += (targetRotationY - camera.rotation.y) * 0.05;
    });

    useEffect(() => {
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
}
