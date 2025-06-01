import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center mb-8 shadow-casino"
        >
          <ApperIcon name="Target" className="w-12 h-12 text-white" />
        </motion.div>
        
        <h1 className="text-6xl sm:text-7xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-surface-400 mb-8 max-w-md mx-auto">
          Looks like this page went off the table! Let's get you back to the game.
        </p>
        
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary text-white font-semibold px-8 py-3 rounded-xl shadow-casino transition-all duration-300"
          >
            <ApperIcon name="Home" className="w-5 h-5" />
            <span>Back to Casino</span>
          </motion.button>
        </Link>
      </motion.div>
    </div>
  )
}