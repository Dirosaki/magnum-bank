import { CircleAlert } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

export function ErrorMessage({ children }: { children: string | undefined }) {
  if (!children) return null

  return (
    <AnimatePresence>
      <motion.p
        animate={{ height: 'auto', opacity: 1 }}
        aria-live="polite"
        className="mt-2 inline-flex items-center text-sm text-red-500"
        exit={{ height: 0, opacity: 0 }}
        initial={{ height: 0, opacity: 0 }}
        role="alert"
        transition={{
          duration: 0.2,
          ease: 'linear',
        }}
      >
        <CircleAlert className="mr-1" size={14} strokeWidth={2} /> {children}
      </motion.p>
    </AnimatePresence>
  )
}
