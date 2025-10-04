"use client"

import { motion } from "framer-motion"
import { Github, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl mb-8 text-[var(--theme-accent)] font-heading">about</h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6 text-center max-w-[680px] mx-auto"
          >
            <h3 className="font-bodoni text-2xl font-heading" style={{ color: "#00053a" }}>
              Kuroneko
            </h3>
            <div className="space-y-4 leading-relaxed text-lg" style={{ color: "#00053a" }}>
              <p>
                北海道出身のエンジニア。高校では理系の物理選択クラスと美術部に在籍し、筑波大学の芸術専門学群に進学。
              </p>
              <p>
                大学で芸術を学んだのちに、ファーストキャリアは得意の理系分野を活かすためサーバサイドエンジニアを選択。
              </p>
              <p>
                その後フロントエンドエンジニアの経験も経て（サーバとフロント合わせて5年ほど経験しています）現在はコーポレートエンジニアとして従事しつつ、副業でWeb作成（デザイン/コーディング）に取り組んでおります。AIも積極的に活用しております。
              </p>
            </div>

            <div className="flex justify-center gap-4 pt-4">
              <Button
                variant="outline"
                size="sm"
                className="hover:bg-[var(--theme-accent)] hover:text-white hover:border-[var(--theme-accent)] bg-transparent border-white/20"
                style={{ color: "#00053a" }}
                asChild
              >
                <a href="https://www.wantedly.com/id/risa_tsujimura" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Wantedly
                </a>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="hover:bg-[var(--theme-accent)] hover:text-white hover:border-[var(--theme-accent)] bg-transparent border-white/20"
                style={{ color: "#00053a" }}
              >
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
