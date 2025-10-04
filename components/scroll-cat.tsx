"use client"

import { motion } from "framer-motion"
import { useScrollPosition } from "@/hooks/use-scroll-position"

export function ScrollCat() {
  const { scrollProgress } = useScrollPosition()

  // Calculate cat position based on scroll progress
  const catPosition = scrollProgress * 85 // Move across 85% of screen width

  // Determine if cat should be running (when scrolling)
  const isRunning = scrollProgress > 0 && scrollProgress < 1

  return (
    <>
      {/* Cat */}
      <motion.div
        className="fixed bottom-4 z-50 pointer-events-none"
        style={{
          left: `${catPosition}%`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          animate={
            isRunning
              ? {
                  scaleX: [1, 1.1, 1],
                  y: [0, -4, 0],
                }
              : {}
          }
          transition={{
            duration: 0.3,
            repeat: isRunning ? Number.POSITIVE_INFINITY : 0,
            ease: "easeInOut",
          }}
          className="relative"
        >
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT_Image_2025%E5%B9%B49%E6%9C%887%E6%97%A5_18_17_05-removebg-preview-BCb7AduyWf4ZN3ubMs35kRYVGghY4V.png"
            alt="Cat"
            width="96"
            height="96"
            className="drop-shadow-lg"
          />

          {/* Dust clouds when running */}
          {isRunning && (
            <motion.div
              className="absolute -bottom-2 -left-2"
              animate={{
                opacity: [0, 0.6, 0],
                scale: [0.5, 1, 1.5],
              }}
              transition={{
                duration: 0.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeOut",
              }}
            >
              <div className="w-6 h-3 bg-gray-400/40 rounded-full blur-sm" />
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </>
  )
}
