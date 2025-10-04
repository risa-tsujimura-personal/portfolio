"use client"

import { motion } from "framer-motion"

const timeline = [
  {
    year: "1994〜",
    title: "北海道北広島市に生まれる。",
    description: "カードキャプターさくらとセーラームーンに陶酔していた。",
  },
  {
    year: "2010〜",
    title: "札幌東高校に進学。",
    description:
      "美術部に加入し油絵を描く。北海道高文連優秀賞をGET。数学と物理に熱中し、それ以外は捨てていたので受験生になってから非常に困る。大学進学では親の期待もあり北大理系に行こうと思っていたが、筑波大学の芸術学部の存在を知り、親の期待も裏切らないで済む（快く許可が降りたので）方向転換する。",
  },
  {
    year: "2013〜",
    title: "筑波大学 芸術専門学群に進学",
    description:
      "油絵、建築デザイン、webデザイン（Illustrator、Photoshop）、陶芸、ガラス、彫刻など幅広く学ぶ。就職活動では、エンジニアに向いていると言ってもらい、芸術方面に行くか迷いつつも、エンジニアに挑戦したくなり挑戦する。",
  },
  {
    year: "2017〜",
    title: "サーバサイドエンジニアとして従事する。",
    description: "客先常駐を3年半ほど経験した。",
  },
  {
    year: "2020〜",
    title: "フロントエンドエンジニアとしても従事する。",
    description:
      "最初はサーバとの二刀流でやっていましたが、そのうちフロント選任のエンジニアとして動くようになりました。サーバよりフロントの方が楽しいな〜と思っていた。芸術の経験があるからか、見た目を整えるというのが好きだったし、丁寧さを評価してもらえていた。",
  },
  {
    year: "2023〜",
    title: "コーポレートエンジニアとして従事する。",
    description:
      "人の役に立っている感を感じながら仕事をしたい、という欲求を満たしたかった。どうしてもエンジニア仕事は「パズルや問題を解くような楽しさ」に偏ってしまい、自分の中のもう一つの欲求「人の役に立っている感」を満たしたいというフラストレーションが地味に蓄積されていた。コーポレートエンジニアに従事してからも、業務自動化の際にJavascriptやPythonなどを利用していました。",
  },
  {
    year: "2024〜",
    title: "黒猫を飼い始める。",
    description: "",
  },
  {
    year: "2025〜",
    title: "副業でWeb制作をスタート。",
    description: "フロントエンジニアや芸術の経験を活かしていきたいです。",
  },
]

export function ProfileSection() {
  return (
    <section id="profile" className="py-24 md:py-32 bg-muted/30">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl mb-8 text-[var(--theme-accent)] font-heading">Profile</h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[var(--theme-accent)]/30"></div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.08,
                  },
                },
              }}
              className="space-y-8"
            >
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.6 }}
                  className="relative flex items-start space-x-8"
                >
                  {/* Timeline dot */}
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-[var(--theme-accent)] rounded-full border-4 border-background shadow-lg"></div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-8">
                    <div className="bg-card rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                        <h3 className="text-lg">{item.title}</h3>
                        <span className="text-[var(--theme-accent)] font-semibold text-sm">{item.year}</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
