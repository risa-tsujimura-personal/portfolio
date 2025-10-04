"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ExternalLink, Github, ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"

const works = [
  {
    id: 1,
    title: "レバテックカレッジ",
    description:
      "在籍時にフロントエンドを担当しました。私の実装後、まだ何も変更が加えられていないWebサイトです。",
    tech: ["Vue.js", "Nuxt.js", "TypeScript", "HTML", "Cass"],
    demo: "#",
    github: "#",
    images: ["/lev-image.png", "/ecommerce-product-page.png", "/ecommerce-checkout.png"],
  },
  {
    id: 2,
    title: "レバテックキャリア",
    description:
      "在籍時にフロントエンド全般を担当しました。退職後にデザインの変更が見られますが基本的な構成に変更はありません。",
    tech: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Resend"],
    demo: "#",
    github: "#",
    images: ["/levtech-career-image.png", "/portfolio-gallery.png", "/portfolio-contact.jpg"],
  },
  {
    id: 3,
    title: "レバテックフリーランス",
    description:
      "在籍時にフロントエンド全般を担当しました。退職後にデザインの変更が見られますが基本的な構成に変更はありません。",
    tech: ["React.js", "Next.js", "TypeScript", "HTML", "Cass"],
    demo: "#",
    github: "#",
    images: ["/levtech-freelance-image.png", "/ecommerce-product-page.png", "/ecommerce-checkout.png"],
  },
  {
    id: 4,
    title: "ポートフォリオサイト",
    description:
      "デザインからコーディング、公開まで自身で行いました。",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Resend"],
    demo: "#",
    github: "#",
    images: ["/my-portfolio.png", "/portfolio-gallery.png", "/portfolio-contact.jpg"],
  },
]

export function WorksSection() {
  const [selectedWork, setSelectedWork] = useState<(typeof works)[0] | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    if (selectedWork) {
      setCurrentImageIndex((prev) => (prev === selectedWork.images.length - 1 ? 0 : prev + 1))
    }
  }

  const prevImage = () => {
    if (selectedWork) {
      setCurrentImageIndex((prev) => (prev === 0 ? selectedWork.images.length - 1 : prev - 1))
    }
  }

  const openModal = (work: (typeof works)[0]) => {
    // レバテックカレッジの場合は外部リンクに遷移
    if (work.id === 1) {
      window.open('https://rookie.levtech.jp/college/', '_blank')
      return
    }
    // レバテックキャリアの場合は外部リンクに遷移
    if (work.id === 2) {
      window.open('https://career.levtech.jp/', '_blank')
      return
    }
    // レバテックフリーランスの場合は外部リンクに遷移
    if (work.id === 3) {
      window.open('https://freelance.levtech.jp/', '_blank')
      return
    }
    // ポートフォリオサイトの場合は現在のサイトに遷移
    if (work.id === 4) {
      window.open(window.location.href, '_blank')
      return
    }
    setSelectedWork(work)
    setCurrentImageIndex(0)
  }

  const closeModal = () => {
    setSelectedWork(null)
    setCurrentImageIndex(0)
  }

  return (
    <section id="works" className="py-24 md:py-32 bg-muted/30">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl mb-8 text-[var(--theme-accent)]">work</h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[680px] mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {works.map((work) => (
            <motion.div
              key={work.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6 }}
              className="h-full w-full"
            >
              <Card
                className="h-full w-full cursor-pointer hover:shadow-xl transition-all duration-300 group bg-card/50 backdrop-blur-sm border-foreground/10 flex flex-col"
                onClick={() => openModal(work)}
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={work.images[0] || "/placeholder.svg"}
                      alt={work.title}
                      className="w-full h-41 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-[var(--theme-accent)]/0 group-hover:bg-[var(--theme-accent)]/10 transition-colors duration-300" />
                  </div>
                  <div className="px-4 pt-4 pb-4 flex flex-col overflow-hidden">
                    <h3 className="text-lg mb-2 group-hover:text-[var(--theme-accent)] transition-colors text-foreground">
                      {work.title}
                    </h3>
                    <p className="text-muted-foreground mb-3 text-sm overflow-hidden" style={{ 
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical'
                    }}>{work.description}</p>
                    <div className="flex flex-wrap gap-1 mt-5 mb-0">
                      {work.tech.map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-white/20 text-foreground text-xs rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Modal */}
        <Dialog open={!!selectedWork} onOpenChange={closeModal}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedWork && (
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl mb-2">{selectedWork.title}</h3>
                    <p className="text-muted-foreground">{selectedWork.description}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={closeModal}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* Image Slider */}
                <div className="relative">
                  <div className="relative h-80 rounded-lg overflow-hidden">
                    <img
                      src={selectedWork.images[currentImageIndex] || "/placeholder.svg"}
                      alt={`${selectedWork.title} screenshot ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {selectedWork.images.length > 1 && (
                      <>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="absolute left-4 top-1/2 transform -translate-y-1/2"
                          onClick={prevImage}
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="absolute right-4 top-1/2 transform -translate-y-1/2"
                          onClick={nextImage}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                  </div>
                  {selectedWork.images.length > 1 && (
                    <div className="flex justify-center mt-4 space-x-2">
                      {selectedWork.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentImageIndex ? "bg-[var(--theme-accent)]" : "bg-muted"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Tech Stack */}
                <div>
                  <h4 className="font-semibold mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedWork.tech.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-white/20 text-white text-sm rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button className="bg-[var(--theme-accent)] hover:bg-[var(--theme-accent)]/90">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </Button>
                  <Button
                    variant="outline"
                    className="hover:bg-[var(--theme-accent)] hover:text-white hover:border-[var(--theme-accent)] bg-transparent"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
