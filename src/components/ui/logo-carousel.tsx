"use client"

import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type SVGProps,
} from "react"
import { AnimatePresence, motion } from "framer-motion"

interface Logo {
  name: string
  id: number
  img: React.ComponentType<SVGProps<SVGSVGElement>> | React.ComponentType<React.ImgHTMLAttributes<HTMLImageElement>>
}

interface LogoColumnProps {
  logos: Logo[]
  index: number
  currentTime: number
}

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const distributeLogos = (allLogos: Logo[], columnCount: number): Logo[][] => {
  const columns: Logo[][] = Array.from({ length: columnCount }, () => [])

  // Give every column ALL logos (shuffled differently) so there's always something to cycle
  for (let c = 0; c < columnCount; c++) {
    columns[c] = shuffleArray(allLogos)
  }

  return columns
}

const LogoColumn: React.FC<LogoColumnProps> = React.memo(
  ({ logos, index, currentTime }) => {
    const cycleInterval = 3000
    const columnDelay = index * 500
    const adjustedTime =
      (currentTime + columnDelay) % (cycleInterval * logos.length)
    const currentIndex = Math.floor(adjustedTime / cycleInterval)
    const CurrentLogo = useMemo(
      () => logos[currentIndex].img,
      [logos, currentIndex]
    )

    // Each card gets a unique subtle float offset
    const floatY = Math.sin((currentTime / 1500) + index * 1.2) * 4

    return (
      <motion.div
        className="relative h-24 w-36 md:h-28 md:w-44 overflow-hidden rounded-xl border border-border bg-card/60 backdrop-blur-sm p-3 ai-border-glow transition-shadow duration-300 hover:shadow-lg hover:shadow-primary/10"
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{
          opacity: 1,
          y: floatY,
          scale: 1,
        }}
        transition={{
          delay: index * 0.1,
          duration: 0.6,
          ease: "easeOut",
          y: { duration: 0.8, ease: "easeInOut" },
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${logos[currentIndex].id}-${currentIndex}`}
            className="absolute inset-0 flex items-center justify-center p-3"
            initial={{ y: 25, opacity: 0, scale: 0.85, filter: "blur(6px)" }}
            animate={{ y: 0, opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ y: -25, opacity: 0, scale: 0.85, filter: "blur(6px)" }}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <CurrentLogo className="h-full w-full max-h-[80%] max-w-[80%] object-contain" />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    )
  }
)

LogoColumn.displayName = "LogoColumn"

interface LogoCarouselProps {
  columnCount?: number
  logos: Logo[]
}

export function LogoCarousel({ columnCount = 2, logos }: LogoCarouselProps) {
  const [logoSets, setLogoSets] = useState<Logo[][]>([])
  const [currentTime, setCurrentTime] = useState(0)

  const updateTime = useCallback(() => {
    setCurrentTime((prevTime) => prevTime + 100)
  }, [])

  useEffect(() => {
    const intervalId = setInterval(updateTime, 100)
    return () => clearInterval(intervalId)
  }, [updateTime])

  useEffect(() => {
    const distributedLogos = distributeLogos(logos, columnCount)
    setLogoSets(distributedLogos)
  }, [logos, columnCount])

  return (
    <div className="flex gap-4 md:gap-6 justify-center items-center flex-wrap">
      {logoSets.map((logos, index) => (
        <LogoColumn
          key={index}
          logos={logos}
          index={index}
          currentTime={currentTime}
        />
      ))}
    </div>
  )
}

export { LogoColumn }
export type { Logo }
