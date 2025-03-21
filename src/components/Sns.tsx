import { useState, useEffect } from "react"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { Copy } from "lucide-react"
import "../App.css"
import GithubSnake from "@/components/GithubSnake"
import { toast } from "sonner"
// import { FloatingDock } from "@/components/floating-dock";



const snsSvgClassName = "w-6 h-6 fill-neutral-400 hover:fill-white"

export default function Sns({ className }: { className: string }) {
    const [isLoading, setIsLoading] = useState(true);
    const [steamImg, setSteamImg] = useState("");
    const [steamImgLoading, setSteamImgLoading] = useState(true);
    const [weChatImg, setWeChatImg] = useState("");
    const [weChatImgLoading, setWeChatImgLoading] = useState(true);
    // preload images
    useEffect(() => {
        let img = new Image();
        img.src = "https://card.yuy1n.io/card/76561198188223899/gradient3,en,badge";
        img.onload = () => {
            setSteamImgLoading(false)
            setSteamImg(img.src)
        };
        img.onerror = () => { setSteamImgLoading(false) };

        img = new Image();
        img.src = "https://wokerd1-blue-math-ewq.1790414525klz.workers.dev/api/image?id=14";
        img.onload = () => {
            setWeChatImgLoading(false)
            setWeChatImg(img.src)
        };
        img.onerror = () => { setWeChatImgLoading(false) };
    }, []);

    return (
        <div className={cn(
            "flex justify-center gap-2 w-fit bg-neutral-500 bg-opacity-10 rounded-lg p-1",
            className // equal !important
        )}>
            {/* github */}
            <Drawer>
                <DrawerTrigger asChild>
                    <div className=" rounded-full p-1 hover:scale-125 transition-all duration-300 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" className={snsSvgClassName}>
                            {/* <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
                            <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                        </svg>
                    </div>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader className="flex flex-col items-center">
                        <DrawerTitle>Github Profile</DrawerTitle>
                        <DrawerDescription className="text-center mt-2">Click to open github profile in a new tab</DrawerDescription>
                    </DrawerHeader>
                    <div
                        className="w-full h-full flex justify-center items-center my-8 mx-auto cursor-pointer"
                        onClick={() => window.open('https://github.com/Need-an-AwP', '_blank', 'noopener,noreferrer')}
                        title="Click to open in a new tab"
                    >
                        <GithubSnake url='https://need-an-awp.github.io/contribution-snake/snake.svg' />
                    </div>
                    <DrawerFooter>

                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

            {/* email */}
            <Drawer>
                <DrawerTrigger asChild>
                    <div className=" rounded-full p-1 hover:scale-125 transition-all duration-300 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={snsSvgClassName}>
                            {/* <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
                            <path d="M64 112c-8.8 0-16 7.2-16 16l0 22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1l0-22.1c0-8.8-7.2-16-16-16L64 112zM48 212.2L48 384c0 8.8 7.2 16 16 16l384 0c8.8 0 16-7.2 16-16l0-171.8L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64l384 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128z" />
                        </svg>
                    </div>
                </DrawerTrigger>
                <DrawerContent >
                    <DrawerHeader className="flex flex-col items-center">
                        <DrawerTitle>Try to contact this guy with email?</DrawerTitle>
                        <DrawerDescription className="text-center mt-2">
                            let's pray he will check his email🫠
                        </DrawerDescription>
                    </DrawerHeader>
                    <div className="h-full flex flex-col justify-start items-center space-y-4 my-8">
                        <div className="flex items-center gap-4">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-6 w-6 fill-neutral-200">
                                {/* <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
                                <path d="M433.8 420.4c-11.5 1.4-44.9-52.7-44.9-52.7 0 31.3-16.1 72.2-51.1 101.8 16.8 5.2 54.8 19.2 45.8 34.4-7.3 12.3-125.5 7.9-159.6 4-34.1 3.8-152.3 8.3-159.6-4-9-15.3 28.9-29.2 45.8-34.4-34.9-29.5-51.1-70.4-51.1-101.8 0 0-33.3 54.1-44.9 52.7-5.4-.7-12.4-29.6 9.3-99.7 10.3-33 22-60.5 40.1-105.8C60.7 98.1 109 0 224 0c113.7 0 163.2 96.1 160.3 215 18.1 45.2 29.9 72.9 40.1 105.8 21.8 70.1 14.7 99.1 9.3 99.7z" />
                            </svg>
                            <a href="mailto:418070092@qq.com">418070092@qq.com</a>
                            <Button
                                className="cursor-pointer"
                                variant="outline"
                                size="icon"
                                onClick={() => {
                                    toast('The QQ email address has been copied')
                                    navigator.clipboard.writeText('418070092@qq.com')
                                }}
                            >
                                <Copy className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="flex items-center gap-4">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48" className="w-6 h-6">
                                <path fill="#4caf50" d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z"></path><path fill="#1e88e5" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"></path><polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"></polygon><path fill="#c62828" d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z"></path><path fill="#fbc02d" d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z"></path>
                            </svg>
                            <a href="mailto:1790414525klz@gmail.com">1790414525klz@gmail.com</a>
                            <Button
                                className="cursor-pointer"
                                variant="outline"
                                size="icon"
                                onClick={() => {
                                    toast('The gmail address has been copied')
                                    navigator.clipboard.writeText('1790414525klz@gmail.com')
                                }}
                            >
                                <Copy className="w-4 h-4" />
                            </Button>
                        </div>

                    </div>
                    <DrawerFooter>
                        {/* <DrawerClose>
                            <Button className="w-full">Close</Button>
                        </DrawerClose> */}
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

            {/* wechat */}
            <Drawer>
                <DrawerTrigger asChild>
                    <div className=" rounded-full p-1 hover:scale-125 transition-all duration-300 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className={snsSvgClassName}>
                            {/* <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
                            <path d="M385.2 167.6c6.4 0 12.6 .3 18.8 1.1C387.4 90.3 303.3 32 207.7 32 100.5 32 13 104.8 13 197.4c0 53.4 29.3 97.5 77.9 131.6l-19.3 58.6 68-34.1c24.4 4.8 43.8 9.7 68.2 9.7 6.2 0 12.1-.3 18.3-.8-4-12.9-6.2-26.6-6.2-40.8-.1-84.9 72.9-154 165.3-154zm-104.5-52.9c14.5 0 24.2 9.7 24.2 24.4 0 14.5-9.7 24.2-24.2 24.2-14.8 0-29.3-9.7-29.3-24.2 .1-14.7 14.6-24.4 29.3-24.4zm-136.4 48.6c-14.5 0-29.3-9.7-29.3-24.2 0-14.8 14.8-24.4 29.3-24.4 14.8 0 24.4 9.7 24.4 24.4 0 14.6-9.6 24.2-24.4 24.2zM563 319.4c0-77.9-77.9-141.3-165.4-141.3-92.7 0-165.4 63.4-165.4 141.3S305 460.7 397.6 460.7c19.3 0 38.9-5.1 58.6-9.9l53.4 29.3-14.8-48.6C534 402.1 563 363.2 563 319.4zm-219.1-24.5c-9.7 0-19.3-9.7-19.3-19.6 0-9.7 9.7-19.3 19.3-19.3 14.8 0 24.4 9.7 24.4 19.3 0 10-9.7 19.6-24.4 19.6zm107.1 0c-9.7 0-19.3-9.7-19.3-19.6 0-9.7 9.7-19.3 19.3-19.3 14.5 0 24.4 9.7 24.4 19.3 .1 10-9.9 19.6-24.4 19.6z" />
                        </svg>
                    </div>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader className="flex flex-col items-center">
                        <DrawerTitle>Contact via WeChat</DrawerTitle>
                        <DrawerDescription className="text-center mt-2">Scan the QR code to add him</DrawerDescription>
                    </DrawerHeader>
                    <div className="w-full h-full flex justify-center items-center my-8">
                        {weChatImgLoading ?
                            <Skeleton className="w-[300px] h-[400px] rounded-lg" />
                            :
                            <img className="h-[400px]" src={weChatImg} alt="wechat QR code" />
                        }
                    </div>
                    <DrawerFooter>
                        {/* <DrawerClose>
                            <Button className="w-full">Close</Button>
                        </DrawerClose> */}
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

            {/* steam */}
            <Drawer>
                <DrawerTrigger asChild>
                    <div className=" rounded-full p-1 hover:scale-125 transition-all duration-300 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" className={snsSvgClassName}>
                            {/* <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
                            <path d="M496 256c0 137-111.2 248-248.4 248-113.8 0-209.6-76.3-239-180.4l95.2 39.3c6.4 32.1 34.9 56.4 68.9 56.4 39.2 0 71.9-32.4 70.2-73.5l84.5-60.2c52.1 1.3 95.8-40.9 95.8-93.5 0-51.6-42-93.5-93.7-93.5s-93.7 42-93.7 93.5v1.2L176.6 279c-15.5-.9-30.7 3.4-43.5 12.1L0 236.1C10.2 108.4 117.1 8 247.6 8 384.8 8 496 119 496 256zM155.7 384.3l-30.5-12.6a52.8 52.8 0 0 0 27.2 25.8c26.9 11.2 57.8-1.6 69-28.4 5.4-13 5.5-27.3 .1-40.3-5.4-13-15.5-23.2-28.5-28.6-12.9-5.4-26.7-5.2-38.9-.6l31.5 13c19.8 8.2 29.2 30.9 20.9 50.7-8.3 19.9-31 29.2-50.8 21zm173.8-129.9c-34.4 0-62.4-28-62.4-62.3s28-62.3 62.4-62.3 62.4 28 62.4 62.3-27.9 62.3-62.4 62.3zm.1-15.6c25.9 0 46.9-21 46.9-46.8 0-25.9-21-46.8-46.9-46.8s-46.9 21-46.9 46.8c.1 25.8 21.1 46.8 46.9 46.8z" />
                        </svg>
                    </div>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader className="flex flex-col items-center">
                        <DrawerTitle>Steam Profile</DrawerTitle>
                        <DrawerDescription className="text-center mt-2">
                            Do you have any idea why he played so much FPS game?
                        </DrawerDescription>
                    </DrawerHeader>

                    <div className="w-full h-full flex flex-col justify-center items-center text-center my-8">
                        {isLoading ?
                            <Skeleton className="w-[400px] h-[140px] rounded-lg" />
                            :
                            <img
                                width="400"
                                height="140"
                                src={steamImg}
                                onClick={() => window.open('https://steamcommunity.com/profiles/76561198188223899/', '_blank', 'noopener,noreferrer')}
                                role="button"
                                aria-label="access steam profile"
                            />
                        }
                        <p className="text-sm text-neutral-500 mt-4">powered by <a href="https://steamcard.vercel.app/" target="_blank" rel="noopener noreferrer">https://steamcard.vercel.app/</a></p>
                    </div>

                    <DrawerFooter>
                        {/* <DrawerClose>
                            <Button className="w-full">Close</Button>
                        </DrawerClose> */}
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

            {/* discord */}
            <Drawer>
                <DrawerTrigger asChild>
                    <div className=" rounded-full p-1 hover:scale-125 transition-all duration-300 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className={snsSvgClassName}>
                            {/* <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
                            <path d="M524.5 69.8a1.5 1.5 0 0 0 -.8-.7A485.1 485.1 0 0 0 404.1 32a1.8 1.8 0 0 0 -1.9 .9 337.5 337.5 0 0 0 -14.9 30.6 447.8 447.8 0 0 0 -134.4 0 309.5 309.5 0 0 0 -15.1-30.6 1.9 1.9 0 0 0 -1.9-.9A483.7 483.7 0 0 0 116.1 69.1a1.7 1.7 0 0 0 -.8 .7C39.1 183.7 18.2 294.7 28.4 404.4a2 2 0 0 0 .8 1.4A487.7 487.7 0 0 0 176 479.9a1.9 1.9 0 0 0 2.1-.7A348.2 348.2 0 0 0 208.1 430.4a1.9 1.9 0 0 0 -1-2.6 321.2 321.2 0 0 1 -45.9-21.9 1.9 1.9 0 0 1 -.2-3.1c3.1-2.3 6.2-4.7 9.1-7.1a1.8 1.8 0 0 1 1.9-.3c96.2 43.9 200.4 43.9 295.5 0a1.8 1.8 0 0 1 1.9 .2c2.9 2.4 6 4.9 9.1 7.2a1.9 1.9 0 0 1 -.2 3.1 301.4 301.4 0 0 1 -45.9 21.8 1.9 1.9 0 0 0 -1 2.6 391.1 391.1 0 0 0 30 48.8 1.9 1.9 0 0 0 2.1 .7A486 486 0 0 0 610.7 405.7a1.9 1.9 0 0 0 .8-1.4C623.7 277.6 590.9 167.5 524.5 69.8zM222.5 337.6c-29 0-52.8-26.6-52.8-59.2S193.1 219.1 222.5 219.1c29.7 0 53.3 26.8 52.8 59.2C275.3 311 251.9 337.6 222.5 337.6zm195.4 0c-29 0-52.8-26.6-52.8-59.2S388.4 219.1 417.9 219.1c29.7 0 53.3 26.8 52.8 59.2C470.7 311 447.5 337.6 417.9 337.6z" />
                        </svg>
                    </div>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader className="flex flex-col items-center">
                        <DrawerTitle>Discord? Seriously?</DrawerTitle>
                        <DrawerDescription className="text-center mt-2">Trust me, you won't find him there</DrawerDescription>
                    </DrawerHeader>
                    <div className="w-full h-full flex flex-col justify-center items-center my-8">
                        if you insist, try to add him with this user name:
                        <div className="flex items-center gap-2">
                            need_an_awp
                            <Button variant="outline" size="icon" onClick={() => navigator.clipboard.writeText('need_an_awp')}><Copy className="w-4 h-4" /></Button>
                        </div>
                    </div>
                    <DrawerFooter>
                        {/* <DrawerClose>
                            <Button className="w-full">Close</Button>
                        </DrawerClose> */}
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

            {/* x */}
            <Drawer>
                <DrawerTrigger asChild>
                    <div className=" rounded-full p-1 hover:scale-125 transition-all duration-300 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" className={snsSvgClassName}>
                            {/* <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
                            <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                        </svg>
                    </div>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader className="flex flex-col items-center">
                        <DrawerTitle>X</DrawerTitle>
                        <DrawerDescription className="text-center mt-2">
                            This guy looks like hate using social media<br />
                            as far as I know, he doesn't post anything on any social media platform<br />
                            such as X, Instagram, Wechat<br />
                            but you can still dm him with the link below<br />

                        </DrawerDescription>
                    </DrawerHeader>
                    <div className="w-full h-full flex flex-col justify-center items-center text-center my-8">
                        <a href="https://x.com/FPS_deformity" target="_blank" rel="noopener noreferrer" className="underline">https://x.com/FPS_deformity</a>
                    </div>
                    <DrawerFooter>
                        {/* <DrawerClose>
                            <Button className="w-full">Close</Button>
                        </DrawerClose> */}
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>


        </div>
    )
}