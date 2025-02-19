import {motion} from 'framer-motion'

const ButtonLoader = () => {
    return (
        <motion.div
            className="flex items-center justify-center space-x-2 px-4 py-2 rounded-lg"
            initial={{scale: 1}}
            animate={{
                scale: [1, 0.95, 1],
                transition: {repeat: Infinity, duration: 1.5}
            }}
        >
            {/* Barre de progression "arcade" */}
            <div className="relative h-4 w-20 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                    className="absolute left-0 h-full bg-gradient-to-r from-[#5f3a9a]/80 to-[#5f3a9a]"
                    initial={{width: 0}}
                    animate={{
                        width: '100%',
                        transition: {
                            duration: 2,
                            repeat: Infinity,
                            ease: 'linear'
                        }
                    }}
                />

                {/* Effet de balayage */}
                <motion.div
                    className="absolute top-0 h-full w-1 bg-white/50"
                    initial={{left: 0}}
                    animate={{
                        left: '100%',
                        transition: {
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }
                    }}
                />
            </div>

            {/* Emoji animé */}
            <motion.span
                className="text-xl"
                animate={{
                    rotate: [0, 15, -15, 0],
                    y: [0, -15, 0],
                    scale: [1, 1.2, 1]
                }}
                transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    times: [0, 0.3, 0.6, 1]
                }}
            >
                🕹️
            </motion.span>

            {/* Particules flottantes */}
            <div className="absolute -top-2 -right-2">
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="w-1 h-1 bg-yellow-400 rounded-full absolute"
                        initial={{y: 0, opacity: 0}}
                        animate={{
                            y: -20,
                            opacity: [0, 1, 0],
                            x: Math.random() * 20 - 10
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.3
                        }}
                    />
                ))}
            </div>
        </motion.div>
    )
}

export default ButtonLoader