import { useEffect, useState, useRef } from 'react';

export default function OiiaiCat() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [clickTimes, setClickTimes] = useState(0);
    const [displayLetter, setDisplayLetter] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        setIsPlaying(!video.paused);

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);

        video.addEventListener('play', handlePlay);
        video.addEventListener('pause', handlePause);
        video.addEventListener('ended', handlePause);

        return () => {
            video.removeEventListener('play', handlePlay);
            video.removeEventListener('pause', handlePause);
            video.removeEventListener('ended', handlePause);
        };
    }, []);

    const handleClickToPlay = () => {
        const video = videoRef.current;
        if (video) {
            video.currentTime = 0;
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.error("Video play failed:", error);
                    setIsPlaying(false);
                });
            }
        }
        setClickTimes(clickTimes + 1);
        if (clickTimes === 5) {
            setClickTimes(0);
            console.log("clicked 5 times");
            window.open("https://www.youtube.com/watch?v=ZHgyQGoeaB0", "_blank");
        }

        setDisplayLetter(true);
        setTimeout(() => {
            setDisplayLetter(false);
        }, 800);
    };

    return (
        <div className="relative w-full h-full" onClick={handleClickToPlay}>
            <video
                className="relative w-full h-full object-cover cursor-pointer"
                muted
                ref={videoRef}
            >
                <source src="/oiiai_alpha.webm" type="video/webm" />
            </video>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none cursor-pointer">
                <p className={`text-white text-3xl font-bold 
                transition-opacity duration-200 ${displayLetter ? 'opacity-100' : 'opacity-0'}`}>
                    {clickTimes === 1 ? "O" :
                        clickTimes === 2 ? "I" :
                            clickTimes === 3 ? "I" :
                                clickTimes === 4 ? "A" :
                                    clickTimes === 5 ? "I" :
                                        "O"}
                </p>
            </div>
        </div>
    )
}
