"use client"
import { motion } from "framer-motion"
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from "chart.js"
import { Radar } from "react-chartjs-2"

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

const skillsData = {
  frontend: {
    label: "Front-end",
    data: {
      labels: ["HTML/CSS", "JavaScript", "TypeScript", "Vue.js", "React.js", "WordPress"],
      datasets: [
        {
          label: "Skill Level",
          data: [4, 4, 3, 3, 3, 2],
          backgroundColor: "rgba(255, 255, 255, 0.28)",
          borderColor: "#fff",
          borderWidth: 1,
          pointBackgroundColor: "#fff",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "#fff",
        },
      ],
    },
  },
  backend: {
    label: "Back-end",
    data: {
      labels: ["Java", "Python", "TypeScript", "MySQL", "Jest", ["Spring    ", "Framework"]],
      datasets: [
        {
          label: "Skill Level",
          data: [3, 3, 3, 3, 2, 2],
          backgroundColor: "rgba(255, 255, 255, 0.28)",
          borderColor: "#fff",
          borderWidth: 1,
          pointBackgroundColor: "#fff",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "#fff",
        },
      ],
    },
  },
  devops: {
    label: "DevOps",
    data: {
      labels: ["Git", "AWS", "Docker", "MySQL", "Linux", "Vim"],
      datasets: [
        {
          label: "Skill Level",
          data: [4, 3, 3, 3, 2, 3],
          backgroundColor: "rgba(255, 255, 255, 0.28)",
          borderColor: "#fff",
          borderWidth: 1,
          pointBackgroundColor: "#fff",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "#fff",
        },
      ],
    },
  },
}

const skillLevels = [
  { level: 5, label: "Expert", description: "Deep expertise and teaching ability" },
  { level: 4, label: "Advanced", description: "Highly proficient with complex projects" },
  { level: 3, label: "Proficient", description: "Comfortable with most tasks" },
  { level: 2, label: "Basic", description: "Can handle simple tasks" },
  { level: 1, label: "Beginner", description: "Learning the fundamentals" },
]

export function SkillsSection() {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1,
    scales: {
      r: {
        beginAtZero: true,
        max: 5,
        min: 0,
        ticks: {
          stepSize: 1,
          display: true,
          color: "#fff",
          showLabelBackdrop: false,
        },
        grid: {
          color: "rgba(255, 255, 255, 0.25)",
        },
        angleLines: {
          color: "rgba(255, 255, 255, 0.25)",
        },
        pointLabels: {
          font: {
            size: 12,
          },
          color: "#fff",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const level = context.parsed.r
            const levelInfo = skillLevels.find((s) => s.level === level)
            return `${context.label}: ${levelInfo?.label || level}/5`
          },
        },
      },
    },
  }

  return (
    <section id="skills" className="py-24 md:py-32">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl mb-8 text-[var(--theme-accent)] font-heading">Skills</h2>
        </motion.div>

        {/* Skill Level Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-lg mb-4 text-center font-heading text-[var(--theme-accent)]">
            Skill Level Guide
          </h3>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {skillLevels.map((skill) => (
              <div key={skill.level} className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-[var(--theme-accent)] flex items-center justify-center text-white text-xs">
                  {skill.level}
                </div>
                <span className="text-[var(--theme-accent)]">{skill.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.entries(skillsData).map(([key, skill], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-slate-800/50 rounded-2xl p-6 shadow-lg border border-slate-700/30 flex flex-col"
            >
              <h3 className="text-xl text-center mb-6 font-heading text-white">{skill.label}</h3>
              <div className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-xs mx-auto aspect-square">
                  <Radar data={skill.data} options={chartOptions} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
