import { useState, useEffect } from 'react'
import './App.css'
import { BackgroundBeams } from "@/components/ui/background-beams"
import Title from "@/components/Title"
import Keyboard from '@/components/keyboard'
import ScrollIcon from '@/components/ui/scroll-icon'
import { Toaster } from "@/components/ui/sonner"
import Footer from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CardSpotlight } from "@/components/ui/card-spotlight";


function App() {
    const [isInteractive, setIsInteractive] = useState(false);
    const [scrollSegment, setScrollSegment] = useState<number>(0);


    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight;
            const scrollPosition = window.scrollY;
            const segmentHeight = scrollHeight / 3;

            if (scrollPosition < segmentHeight) {
                setScrollSegment(0);
                setIsInteractive(false);
            } else if (scrollPosition < 2 * segmentHeight) {
                setScrollSegment(1);
                setIsInteractive(true);
            } else {
                setScrollSegment(2);
                setIsInteractive(false);
            }
        };

        window.addEventListener('scroll', handleScroll);


        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <>
            <Toaster />
            <BackgroundBeams className="fixed z-[-10]" />
            <div className="mt-[9vh] z-30">
                <Title />
            </div>
            <div className={`flex flex-col items-center left-1/2 -translate-x-1/2
                ${isInteractive ? 'fixed top-0 -translate-y-1/1' : 'absolute bottom-0 translate-y-1/4'}`}>
                <ScrollIcon className="w-[50px] " />
                <p className="text-md opacity-20 translate-y-9">
                    HOVER TO INTERACT
                </p>
            </div>

            <div
                className={`fixed left-0 bottom-0 w-[100vw] h-[100vh]
                transition-all duration-300 ease-in-out _border-2 _border-red-500
                ${isInteractive ? 'pointer-events-auto' : 'pointer-events-none z-[-10]'}`}
                style={{
                    transform: scrollSegment === 0 ? 'translate(0, 20%)' : (scrollSegment === 1 ? 'none' : 'translate(0, -50%)'),
                }}
            >
                <Keyboard
                    isInteractive={isInteractive}
                    playWaveLoop={scrollSegment === 0}
                />
            </div>


            
            <div className={`relative space-y-4  ${scrollSegment === 2 ? 'z-10' : 'z-[-10]'}`}>
                {/* placeholder for scroll */}
                {Array.from({ length: 100 }).map((_, index) => (
                    <div key={index} className="w-0 h-4 bg-red-500"></div>
                ))}
                
                <div className="absolute bottom-0 left-0 w-full flex flex-col">
                    <div className="mx-auto mb-[20vh] flex flex-row gap-4">
                        <CardSpotlight className="w-[300px] aspect-[3/4]">
                            <p className="relative text-4xl">
                                😳
                            </p>
                            <div className="relative mt-4 text-sm space-y-8">
                                <p>i should have something else to show here</p>
                                <p>but that all i got</p>
                                <p>check my github if you interested</p>
                                <a href="https://github.com/Need-an-AwP" className="text-blue-500" target="_blank" rel="noopener noreferrer">https://github.com/Need-an-AwP</a>

                            </div>
                        </CardSpotlight>

                    </div>
                    <div className=" bg-white/5 backdrop-blur-sm">
                        <Footer />
                    </div>
                </div>

            </div>
        </>
    )
}

export default App
