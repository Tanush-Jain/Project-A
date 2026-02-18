import { motion } from 'framer-motion'
import { CheckCircle, Code } from 'lucide-react'
import { Layout } from '@/components/Layout'

const timeline = [
  {
    step: '01',
    title: 'Input Your Scenario',
    description: 'Provide your team, opponent, and map selection to the AI engine.',
  },
  {
    step: '02',
    title: 'AI Analysis',
    description: 'Our machine learning models analyze thousands of pro gameplay patterns.',
  },
  {
    step: '03',
    title: 'Get Your Strategy',
    description: 'Receive detailed tactical breakdowns, agent picks, and round timelines.',
  },
]

const techStack = [
  { name: 'React 18', icon: '⚛️' },
  { name: 'TypeScript', icon: '📘' },
  { name: 'Tailwind CSS', icon: '🎨' },
  { name: 'Framer Motion', icon: '✨' },
  { name: 'Vite', icon: '⚡' },
  { name: 'PyTorch ML', icon: '🧠' },
]

export default function AboutPage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-12 mb-20 text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            About VALORANT<span className="text-[#FF4655]">.ai</span>
          </h1>
          <p className="text-xl text-[#A8B2C1] max-w-2xl mx-auto">
            Powered by advanced AI and machine learning, VALORANT.ai brings professional-grade tactical analysis to every team level.
          </p>
        </motion.section>

        {/* How It Works */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-white mb-12 text-center">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {timeline.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="relative"
              >
                {/* Connector line */}
                {idx < timeline.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-[#FF4655] to-transparent" />
                )}

                <div className="relative z-10 bg-[#1C2B3A]/30 border border-[#2B3E50] rounded-xl p-8 text-center">
                  <div className="w-16 h-16 rounded-lg bg-[#FF4655] text-white font-bold text-2xl flex items-center justify-center mx-auto mb-4 font-mono">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-[#A8B2C1]">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Tech Stack */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 py-12 bg-[#1C2B3A]/30 border border-[#2B3E50] rounded-xl p-12"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center gap-2">
            <Code className="text-[#FF4655]" />
            Powered By
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {techStack.map((tech, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="flex flex-col items-center justify-center p-6 bg-[#0F1923] border border-[#2B3E50] rounded-lg hover:border-[#FF4655] transition-colors"
              >
                <div className="text-4xl mb-2">{tech.icon}</div>
                <p className="text-sm font-semibold text-[#ECE8E1] text-center">{tech.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Features */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Why Choose VALORANT.ai?</h2>
          
          <div className="space-y-4">
            {[
              'Advanced machine learning trained on 10,000+ pro matches',
              'Real-time strategy adaptation based on meta shifts',
              'Detailed agent synergy analysis and counter-pick recommendations',
              'Economy-focused round planning and buy strategy optimization',
              'Map control heat maps and positioning suggestions',
              'Integration with team management and scrim scheduling',
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="flex items-center gap-4 p-4 bg-[#1C2B3A]/30 border border-[#2B3E50] rounded-lg hover:border-[#FF4655]/50 transition-colors group"
              >
                <CheckCircle className="w-6 h-6 text-[#FF4655] flex-shrink-0 group-hover:scale-110 transition-transform" />
                <p className="text-[#A8B2C1] group-hover:text-white transition-colors">{feature}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-3 gap-8"
        >
          <div className="text-center p-8 bg-[#1C2B3A]/30 border border-[#2B3E50] rounded-xl">
            <div className="text-5xl font-bold font-mono text-[#FF4655] mb-2">500+</div>
            <p className="text-[#A8B2C1]">Pro Teams Using VALORANT.ai</p>
          </div>
          <div className="text-center p-8 bg-[#1C2B3A]/30 border border-[#2B3E50] rounded-xl">
            <div className="text-5xl font-bold font-mono text-[#FF4655] mb-2">10,000+</div>
            <p className="text-[#A8B2C1]">Strategies Generated</p>
          </div>
          <div className="text-center p-8 bg-[#1C2B3A]/30 border border-[#2B3E50] rounded-xl">
            <div className="text-5xl font-bold font-mono text-[#FF4655] mb-2">99.2%</div>
            <p className="text-[#A8B2C1]">Recommendation Accuracy</p>
          </div>
        </motion.div>
      </div>
    </Layout>
  )
}
