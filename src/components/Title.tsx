import { useTypingText } from "@/components/useTypingText";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { motion } from "framer-motion";
import Sns from "@/components/Sns";


const Title = () => {
    const { word } = useTypingText(
        ["Hi🤗", "泥嚎😆", "こんにちは😇"],
        130, //keyspeed
        20 //maxPauseAmount
    );

    return (
        <div>
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
                className="text-2xl mt-12 px-4 md:text-4xl lg:text-5xl font-bold max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
            >
                <p>{word}</p>
                <br />
                This is
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
                className="text-sm mt-8 px-4 md:text-xs lg:text-sm text-muted-foreground
                max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
            >
                There should be some self-introduction here.<br />
                But I have no idea what to write
            </motion.h1>

            <Sns className="mt-8 z-99" />
        </div>
    )
}

export default Title;
