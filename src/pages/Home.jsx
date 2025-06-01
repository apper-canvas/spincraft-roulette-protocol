import { useState } from 'react'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'
import { motion } from 'framer-motion'

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 px-4 py-6 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <motion.div 
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.6 }}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center shadow-casino"
              >
                <ApperIcon name="Target" className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </motion.div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-accent to-primary-light bg-clip-text text-transparent">
                  SpinCraft
                </h1>
                <p className="text-surface-400 text-sm sm:text-base">Premium Roulette Experience</p>
              </div>
            </div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="hidden sm:flex items-center space-x-2 bg-surface-800/50 backdrop-blur-sm rounded-xl px-4 py-2 border border-accent/20"
            >
              <ApperIcon name="Crown" className="w-5 h-5 text-accent" />
              <span className="text-surface-300 text-sm">Live Casino</span>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Main Game Area */}
      <main className="px-4 pb-8 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <MainFeature />
        </div>
      </main>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="relative z-10 border-t border-surface-700/50 bg-surface-900/80 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <ApperIcon name="Shield" className="w-4 h-4 text-accent" />
                <span className="text-surface-400 text-sm">Secure Gaming</span>
              </div>
              <div className="flex items-center space-x-2">
                <ApperIcon name="Zap" className="w-4 h-4 text-accent" />
                <span className="text-surface-400 text-sm">Instant Play</span>
              </div>
            </div>
            
            <div className="text-surface-500 text-sm">
              © 2024 SpinCraft. Gamble responsibly.
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}