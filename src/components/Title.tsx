import { useTypingText } from "@/components/useTypingText";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { motion } from "framer-motion";
import Sns from "@/components/Sns";


const Title = ({ className, horizontalCentering = true }: { className?: string, horizontalCentering?: boolean }) => {
    const { word } = useTypingText(
        ["Hi🤗", "泥嚎😆", "こんにちは😇"],
        130, //keyspeed
        20 //maxPauseAmount
    );

    return (
        <div className={`${className}`}>
            <motion.h1
                initial={{
                    opacity: 0,
                    y: 20,
                }}
                animate={{
                    opacity: 1,
                    y: [20, -5, 0],
                }}
                transition={{
                    duration: 0.5,
                    ease: [0.4, 0.0, 0.2, 1],
                }}
                className={`text-2xl mt-12 px-4 md:text-4xl lg:text-5xl font-bold max-w-4xl leading-relaxed lg:leading-snug 
                    ${horizontalCentering ? 'text-center mx-auto' : 'text-left'} `}
            >
                <p>{word}</p>
                <br />
                I'm
                <Highlight className="ml-3">
                    KLZ
                </Highlight>
            </motion.h1>

            <motion.h1
                initial={{
                    opacity: 0,
                    y: 20,
                }}
                animate={{
                    opacity: 1,
                    y: [20, -5, 0],
                }}
                transition={{
                    duration: 0.5,
                    ease: [0.4, 0.0, 0.2, 1],
                }}
                className={`text-lg mt-2 text-white/50 px-4 md:text-2xl lg:text-3xl max-w-4xl leading-relaxed lg:leading-snug 
                    ${horizontalCentering ? 'text-center mx-auto' : 'text-left'} `}
            >
                <p>glad you're here</p>
            </motion.h1>

            <motion.h1
                initial={{
                    opacity: 0,
                    y: 20,
                }}
                animate={{
                    opacity: 1,
                    y: [20, -5, 0],
                }}
                transition={{
                    duration: 0.5,
                    ease: [0.4, 0.0, 0.2, 1],
                }}
                className={`text-sm mt-8 px-4 md:text-xs lg:text-sm text-muted-foreground
                max-w-4xl leading-relaxed lg:leading-snug 
                ${horizontalCentering ? 'text-center mx-auto' : 'text-left'} `}
            >
                There should be some self-introduction here.<br />
                But I have no idea what to write<br />
                <strong>Scroll down to check this tiny keyboard</strong>
            </motion.h1>

            <Sns className={`mt-8 z-99 ${horizontalCentering ? 'mx-auto' : 'mx-2'}`} />
        </div>
    )
}

export default Title;
