import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, User, Building2, Send } from 'lucide-react'
import { GlowButton } from '@/components/GlowButton'
import { Layout } from '@/components/Layout'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({ name: '', email: '', organization: '', message: '' })
      }, 3000)
    }, 1000)
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-12 mb-16 text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-[#A8B2C1] max-w-2xl mx-auto">
            Have questions about VALORANT.ai? Our team is here to help.
          </p>
        </motion.section>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-[#1C2B3A]/50 border border-[#2B3E50] rounded-xl p-8 md:p-12">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="w-20 h-20 rounded-full bg-[#FF4655]/20 border border-[#FF4655] flex items-center justify-center mx-auto mb-6"
                >
                  <Send className="w-10 h-10 text-[#FF4655]" />
                </motion.div>
                <h2 className="text-2xl font-bold text-white mb-2">Message Sent!</h2>
                <p className="text-[#A8B2C1]">
                  Thank you for reaching out. Our team will get back to you shortly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-[#ECE8E1] mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-[#A8B2C1]" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full pl-10 pr-4 py-3 bg-[#0F1923] border border-[#2B3E50] rounded-lg text-white placeholder-[#A8B2C1] focus:outline-none focus:border-[#FF4655] transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-[#ECE8E1] mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-[#A8B2C1]" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full pl-10 pr-4 py-3 bg-[#0F1923] border border-[#2B3E50] rounded-lg text-white placeholder-[#A8B2C1] focus:outline-none focus:border-[#FF4655] transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Organization */}
                <div>
                  <label className="block text-sm font-medium text-[#ECE8E1] mb-2">
                    Team/Organization
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3 w-5 h-5 text-[#A8B2C1]" />
                    <input
                      type="text"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      placeholder="Your team or organization"
                      className="w-full pl-10 pr-4 py-3 bg-[#0F1923] border border-[#2B3E50] rounded-lg text-white placeholder-[#A8B2C1] focus:outline-none focus:border-[#FF4655] transition-colors"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-[#ECE8E1] mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help..."
                    rows={6}
                    className="w-full px-4 py-3 bg-[#0F1923] border border-[#2B3E50] rounded-lg text-white placeholder-[#A8B2C1] focus:outline-none focus:border-[#FF4655] transition-colors resize-none"
                    required
                  />
                </div>

                {/* Submit */}
                <GlowButton
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="inline-block w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="inline-block mr-2 w-5 h-5" />
                      Send Message
                    </>
                  )}
                </GlowButton>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 grid md:grid-cols-2 gap-8"
          >
            <div className="text-center p-6 bg-[#1C2B3A]/30 border border-[#2B3E50] rounded-xl">
              <Mail className="w-10 h-10 text-[#FF4655] mx-auto mb-4" />
              <h3 className="font-semibold text-white mb-2">Email</h3>
              <p className="text-[#A8B2C1]">support@valorant.ai</p>
            </div>
            <div className="text-center p-6 bg-[#1C2B3A]/30 border border-[#2B3E50] rounded-xl">
              <Building2 className="w-10 h-10 text-[#FF4655] mx-auto mb-4" />
              <h3 className="font-semibold text-white mb-2">Sales Inquiry</h3>
              <p className="text-[#A8B2C1]">sales@valorant.ai</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  )
}
