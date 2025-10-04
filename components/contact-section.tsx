"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || "Failed to send")
      }

      toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. I'll get back to you soon.",
      })

      setFormData({ name: "", email: "", comment: "" })
    } catch (error) {
      toast({
        title: "Error sending message",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl mb-8 text-[var(--theme-accent)] font-heading">Contact</h2>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="space-y-6 max-w-[680px] mx-auto bg-card/20 backdrop-blur-sm border border-foreground/10 rounded-2xl p-6"
          >
            {/* Changed from grid layout to vertical stacking for Name and Email fields */}
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm mb-2" style={{ color: "#00053a" }}>
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="border-[var(--theme-accent)] focus:ring-[var(--theme-accent)] focus:border-[var(--theme-accent)]"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm mb-2" style={{ color: "#00053a" }}>
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="border-[var(--theme-accent)] focus:ring-[var(--theme-accent)] focus:border-[var(--theme-accent)]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="comment" className="block text-sm mb-2" style={{ color: "#00053a" }}>
                Comment
              </label>
              <Textarea
                id="comment"
                name="comment"
                rows={6}
                required
                value={formData.comment}
                onChange={handleChange}
                className="border-[var(--theme-accent)] focus:ring-[var(--theme-accent)] focus:border-[var(--theme-accent)]"
                placeholder="Tell me about your project or just say hello!"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[var(--theme-accent)] hover:bg-[var(--theme-accent)]/90 text-white"
            >
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                />
              ) : (
                <Send className="w-4 h-4 mr-2" />
              )}
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <h3 className="text-lg text-[var(--theme-accent)] mb-2 font-heading">Thank you for coming!</h3>
            <p style={{ color: "#00053a" }}>
              I'm always excited to connect with fellow developers and potential collaborators.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
