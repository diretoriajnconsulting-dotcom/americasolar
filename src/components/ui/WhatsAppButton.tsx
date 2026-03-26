'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const WA_NUMBER = '5583993061388' // Comercial
const WA_MESSAGE = encodeURIComponent(
  'Olá! Gostaria de solicitar um orçamento para transformadores elétricos.'
)
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`

export function WhatsAppButton() {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 z-[9999] flex items-center gap-3"
        >
          {/* Tooltip */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="bg-[#0A1628] text-white text-xs font-heading font-semibold px-4 py-2.5 rounded-xl shadow-xl whitespace-nowrap"
              >
                Fale pelo WhatsApp
                <span className="block text-white/50 font-normal text-[10px] mt-0.5">(83) 99306-1388 — Comercial</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Botão */}
          <motion.a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar pelo WhatsApp"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            animate={{
              scale: hovered ? 1.1 : [1, 1.06, 1],
              boxShadow: hovered
                ? '0 0 0 8px rgba(37,211,102,0.2)'
                : '0 0 0 0px rgba(37,211,102,0)',
            }}
            transition={{
              scale: hovered
                ? { duration: 0.2 }
                : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' },
              boxShadow: { duration: 0.3 },
            }}
            className="w-[56px] h-[56px] rounded-full bg-[#25D366] flex items-center justify-center shadow-lg cursor-pointer"
          >
            {/* WhatsApp SVG oficial */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-7 h-7"
              fill="white"
            >
              <path d="M16 .04C7.176.04.04 7.176.04 16c0 2.82.736 5.47 2.02 7.773L.04 31.96l8.397-2.003A15.93 15.93 0 0016 31.96C24.824 31.96 31.96 24.824 31.96 16S24.824.04 16 .04zm0 29.12a13.13 13.13 0 01-6.717-1.843l-.482-.286-4.986 1.188 1.23-4.846-.314-.498A13.12 13.12 0 012.84 16c0-7.264 5.896-13.12 13.16-13.12S29.12 8.736 29.12 16 23.264 29.16 16 29.16zm7.213-9.825c-.395-.197-2.337-1.15-2.698-1.282-.362-.132-.625-.197-.887.198-.263.394-.99 1.282-1.214 1.544-.224.263-.449.296-.843.099-.395-.198-1.667-.614-3.177-1.955-1.173-1.044-1.965-2.333-2.196-2.726-.23-.395-.024-.607.173-.803.178-.177.395-.46.592-.69.198-.23.263-.395.395-.658.132-.263.066-.494-.033-.692-.099-.198-.887-2.135-1.214-2.922-.32-.767-.644-.662-.888-.674-.23-.012-.494-.015-.757-.015-.263 0-.69.1-.1052.494-.362.395-1.38 1.348-1.38 3.285 0 1.937 1.413 3.812 1.61 4.074.198.263 2.78 4.246 6.73 5.946.94.405 1.676.647 2.249.83.946.3 1.806.258 2.488.156.758-.114 2.337-.954 2.667-1.876.33-.921.33-1.712.23-1.876-.099-.163-.362-.263-.757-.46z" />
            </svg>
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
