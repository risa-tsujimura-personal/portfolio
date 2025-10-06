"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

export function HeroSection() {
  const scrollToAbout = () => {
    const element = document.getElementById("about")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="top" className="min-h-screen flex flex-col relative -mt-20 pt-24">
      

      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-left mt-3 ml-3"
            >
              <motion.h1
                className="text-6xl md:text-7xl lg:text-8xl mb-4 font-heading"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
              >
                <span className="font-bodoni text-[var(--theme-accent)]">Kuroneko</span>
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl uppercase tracking-wider"
                style={{ color: "#00053a" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <span className="md:hidden">
                  Web App Developer<br />UI Designer
                </span>
                <span className="hidden md:inline">
                  Web App Developer / UI Designer
                </span>
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center lg:justify-end"
            >
              <div className="w-80">
                <img
                  src="/blackcat_6.png"        // ← 置いたファイル名に合わせて
                  alt="Black cat portrait"
                  className="w-full h-auto object-contain"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-foreground/60 hover:text-[var(--theme-accent)] transition-colors"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <ChevronDown className="w-6 h-6" />
      </motion.button>
    </section>
  )
}
