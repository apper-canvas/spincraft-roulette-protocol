import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'

const ROULETTE_NUMBERS = [
  { number: 0, color: 'green' },
  { number: 32, color: 'red' }, { number: 15, color: 'black' }, { number: 19, color: 'red' },
  { number: 4, color: 'black' }, { number: 21, color: 'red' }, { number: 2, color: 'black' },
  { number: 25, color: 'red' }, { number: 17, color: 'black' }, { number: 34, color: 'red' },
  { number: 6, color: 'black' }, { number: 27, color: 'red' }, { number: 13, color: 'black' },
  { number: 36, color: 'red' }, { number: 11, color: 'black' }, { number: 30, color: 'red' },
  { number: 8, color: 'black' }, { number: 23, color: 'red' }, { number: 10, color: 'black' },
  { number: 5, color: 'red' }, { number: 24, color: 'black' }, { number: 16, color: 'red' },
  { number: 33, color: 'black' }, { number: 1, color: 'red' }, { number: 20, color: 'black' },
  { number: 14, color: 'red' }, { number: 31, color: 'black' }, { number: 9, color: 'red' },
  { number: 22, color: 'black' }, { number: 18, color: 'red' }, { number: 29, color: 'black' },
  { number: 7, color: 'red' }, { number: 28, color: 'black' }, { number: 12, color: 'red' },
  { number: 35, color: 'black' }, { number: 3, color: 'red' }, { number: 26, color: 'black' }
]

const CHIP_VALUES = [1, 5, 10, 25, 100]

export default function MainFeature() {
  const [balance, setBalance] = useState(1000)
  const [selectedChip, setSelectedChip] = useState(5)
  const [bets, setBets] = useState({})
  const [isSpinning, setIsSpinning] = useState(false)
  const [winningNumber, setWinningNumber] = useState(null)
  const [gameHistory, setGameHistory] = useState([])
  const [wheelRotation, setWheelRotation] = useState(0)

  const placeBet = (betType, value) => {
    if (isSpinning) return
    if (balance < selectedChip) {
      toast.error('Insufficient balance!')
      return
    }

    const betKey = `${betType}-${Array.isArray(value) ? value.join(',') : value}`
    const currentBet = bets[betKey]?.amount || 0
    
    setBets(prev => ({
      ...prev,
      [betKey]: {
        type: betType,
        value: value,
        amount: currentBet + selectedChip
      }
    }))
    
    setBalance(prev => prev - selectedChip)
    toast.success(`Bet placed: $${selectedChip}`)
  }

  const clearBets = () => {
    if (isSpinning) return
    
    // Return all bet amounts to balance
    const totalBets = Object.values(bets).reduce((sum, bet) => sum + bet.amount, 0)
    setBalance(prev => prev + totalBets)
    setBets({})
    toast.info('All bets cleared')
  }

  const spinWheel = () => {
    if (Object.keys(bets).length === 0) {
      toast.error('Place at least one bet!')
      return
    }

    setIsSpinning(true)
    setWinningNumber(null)
    
    // Random winning number
    const randomIndex = Math.floor(Math.random() * ROULETTE_NUMBERS.length)
    const winner = ROULETTE_NUMBERS[randomIndex]
    
    // Calculate wheel rotation
    const anglePerNumber = 360 / ROULETTE_NUMBERS.length
    const targetAngle = randomIndex * anglePerNumber
    const spins = 5 + Math.random() * 3 // 5-8 full rotations
    const finalRotation = wheelRotation + (spins * 360) + targetAngle
    
    setWheelRotation(finalRotation)
    
    setTimeout(() => {
      setWinningNumber(winner)
      calculateWinnings(winner)
      setIsSpinning(false)
    }, 4000)
  }

  const calculateWinnings = (winner) => {
    let totalWinnings = 0
    const totalBet = Object.values(bets).reduce((sum, bet) => sum + bet.amount, 0)

    Object.values(bets).forEach(bet => {
      let isWinning = false
      let payout = 0

      switch (bet.type) {
        case 'number':
          if (bet.value === winner.number) {
            isWinning = true
            payout = bet.amount * 36 // 35:1 plus original bet
          }
          break
        case 'color':
          if (bet.value === winner.color) {
            isWinning = true
            payout = bet.amount * 2 // 1:1 plus original bet
          }
          break
        case 'even':
          if (winner.number !== 0 && winner.number % 2 === 0) {
            isWinning = true
            payout = bet.amount * 2
          }
          break
        case 'odd':
          if (winner.number !== 0 && winner.number % 2 === 1) {
            isWinning = true
            payout = bet.amount * 2
          }
          break
        case 'low':
          if (winner.number >= 1 && winner.number <= 18) {
            isWinning = true
            payout = bet.amount * 2
          }
          break
        case 'high':
          if (winner.number >= 19 && winner.number <= 36) {
            isWinning = true
            payout = bet.amount * 2
          }
          break
      }

      if (isWinning) {
        totalWinnings += payout
      }
    })

    setBalance(prev => prev + totalWinnings)
    
    // Add to history
    setGameHistory(prev => [...prev.slice(-9), {
      id: Date.now(),
      winningNumber: winner.number,
      color: winner.color,
      totalBet,
      totalWon: totalWinnings,
      timestamp: new Date()
    }])

    // Clear bets
    setBets({})

    if (totalWinnings > 0) {
      toast.success(`🎉 You won $${totalWinnings}!`)
    } else {
      toast.error('No winning bets this round')
    }
  }

  const getBettingBoardNumbers = () => {
    const numbers = []
    for (let i = 1; i <= 36; i++) {
      const rouletteNum = ROULETTE_NUMBERS.find(num => num.number === i)
      numbers.push(rouletteNum)
    }
    return numbers
  }

  return (
    <div className="space-y-6">
      {/* Game Stats Bar */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-accent/20"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-accent">${balance}</div>
              <div className="text-sm text-surface-400">Balance</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">
                {Object.values(bets).reduce((sum, bet) => sum + bet.amount, 0)}
              </div>
              <div className="text-sm text-surface-400">Total Bet</div>
            </div>
          </div>
          
          {winningNumber !== null && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center space-x-3"
            >
              <span className="text-surface-400">Last Winner:</span>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
                winningNumber.color === 'red' ? 'bg-casino-red' : 
                winningNumber.color === 'black' ? 'bg-casino-black' : 'bg-casino-green'
              } animate-winner-glow`}>
                {winningNumber.number}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Roulette Wheel */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-surface-800/50 backdrop-blur-sm rounded-2xl p-6 border border-accent/20"
        >
          <div className="relative flex items-center justify-center">
            <motion.div 
              className="wheel-container w-80 h-80 sm:w-96 sm:h-96 border-8 border-accent shadow-wheel"
              style={{ rotate: wheelRotation }}
              transition={{ duration: 4, ease: "cubicBezier(0.17, 0.67, 0.12, 0.99)" }}
            >
              {/* Wheel numbers positioned around the circumference */}
              {ROULETTE_NUMBERS.map((num, index) => {
                const angle = (index * 360) / ROULETTE_NUMBERS.length
                return (
                  <div
                    key={num.number}
                    className="absolute w-8 h-8 flex items-center justify-center text-xs font-bold text-white"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-150px) rotate(-${angle}deg)`,
                    }}
                  >
                    {num.number}
                  </div>
                )
              })}
            </motion.div>
            
            {/* Ball */}
            <motion.div 
              className="absolute w-4 h-4 bg-white rounded-full shadow-lg"
              style={{ 
                top: '20px', 
                left: '50%', 
                marginLeft: '-8px',
                rotate: isSpinning ? wheelRotation * -1.5 : 0
              }}
              transition={{ duration: 4, ease: "cubicBezier(0.17, 0.67, 0.12, 0.99)" }}
            />
            
            {/* Center hub */}
            <div className="absolute w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center">
              <ApperIcon name="Target" className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <div className="mt-6 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isSpinning || Object.keys(bets).length === 0}
              onClick={spinWheel}
              className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary disabled:from-surface-600 disabled:to-surface-700 text-white font-bold py-4 px-8 rounded-xl shadow-casino transition-all duration-300 disabled:cursor-not-allowed"
            >
              {isSpinning ? (
                <div className="flex items-center space-x-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <ApperIcon name="Loader" className="w-5 h-5" />
                  </motion.div>
                  <span>Spinning...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <ApperIcon name="Play" className="w-5 h-5" />
                  <span>SPIN</span>
                </div>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Betting Interface */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {/* Chip Selector */}
          <div className="bg-surface-800/50 backdrop-blur-sm rounded-2xl p-6 border border-accent/20">
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <ApperIcon name="Coins" className="w-5 h-5 text-accent" />
              <span>Select Chip Value</span>
            </h3>
            <div className="flex flex-wrap gap-3">
              {CHIP_VALUES.map(value => (
                <motion.button
                  key={value}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedChip(value)}
                  className={`w-16 h-16 rounded-full font-bold text-white chip-shadow transition-all duration-200 ${
                    selectedChip === value ? 'ring-4 ring-accent' : ''
                  } ${
                    value <= 5 ? 'bg-gradient-to-br from-red-500 to-red-700' :
                    value <= 25 ? 'bg-gradient-to-br from-blue-500 to-blue-700' :
                    'bg-gradient-to-br from-purple-500 to-purple-700'
                  }`}
                >
                  ${value}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Betting Board */}
          <div className="bg-surface-800/50 backdrop-blur-sm rounded-2xl p-6 border border-accent/20 casino-felt">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center space-x-2">
                <ApperIcon name="Grid3X3" className="w-5 h-5 text-accent" />
                <span>Place Your Bets</span>
              </h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={clearBets}
                disabled={isSpinning}
                className="text-sm text-surface-400 hover:text-white transition-colors disabled:cursor-not-allowed"
              >
                Clear All
              </motion.button>
            </div>

            {/* Numbers Grid */}
            <div className="grid grid-cols-3 gap-1 mb-4">
              {getBettingBoardNumbers().map(num => {
                const betKey = `number-${num.number}`
                const hasBet = bets[betKey]
                return (
                  <motion.button
                    key={num.number}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => placeBet('number', num.number)}
                    disabled={isSpinning}
                    className={`roulette-number ${num.color} border-2 relative`}
                  >
                    {num.number}
                    <AnimatePresence>
                      {hasBet && (
                        <motion.div
                          initial={{ scale: 0, rotate: 180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: -180 }}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-accent text-black text-xs font-bold rounded-full flex items-center justify-center"
                        >
                          ${hasBet.amount}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                )
              })}
            </div>

            {/* Zero */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => placeBet('number', 0)}
              disabled={isSpinning}
              className="roulette-number green border-2 w-full mb-4 relative"
            >
              0
              <AnimatePresence>
                {bets['number-0'] && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-accent text-black text-xs font-bold rounded-full flex items-center justify-center"
                  >
                    ${bets['number-0'].amount}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Outside Bets */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { type: 'color', value: 'red', label: 'Red', color: 'bg-casino-red' },
                { type: 'color', value: 'black', label: 'Black', color: 'bg-casino-black' },
                { type: 'even', value: 'even', label: 'Even', color: 'bg-surface-600' },
                { type: 'odd', value: 'odd', label: 'Odd', color: 'bg-surface-600' },
                { type: 'low', value: 'low', label: '1-18', color: 'bg-surface-600' },
                { type: 'high', value: 'high', label: '19-36', color: 'bg-surface-600' }
              ].map(bet => {
                const betKey = `${bet.type}-${bet.value}`
                const hasBet = bets[betKey]
                return (
                  <motion.button
                    key={betKey}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => placeBet(bet.type, bet.value)}
                    disabled={isSpinning}
                    className={`${bet.color} text-white font-semibold py-3 px-4 rounded-lg border-2 border-transparent hover:border-accent transition-all duration-200 relative`}
                  >
                    {bet.label}
                    <AnimatePresence>
{hasBet && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-accent text-black text-xs font-bold rounded-full flex items-center justify-center animate-chip-stack"
                        >
                          ${hasBet.amount}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                )
              })}
            </div>
          </div>

          {/* Game History */}
          {gameHistory.length > 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-surface-800/50 backdrop-blur-sm rounded-2xl p-6 border border-accent/20"
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                <ApperIcon name="History" className="w-5 h-5 text-accent" />
                <span>Recent Results</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {gameHistory.slice(-10).map(game => (
                  <div
                    key={game.id}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                      game.color === 'red' ? 'bg-casino-red' :
                      game.color === 'black' ? 'bg-casino-black' : 'bg-casino-green'
                    }`}
                  >
                    {game.winningNumber}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}