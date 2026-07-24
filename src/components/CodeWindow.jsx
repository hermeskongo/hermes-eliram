import { motion } from 'framer-motion'

// The signature dark code-editor window: title bar with traffic-lights + a
// filename, a line-number gutter, and syntax-highlighted lines. `lines` is an
// array of React nodes (one per code line); they stagger in on view.
export default function CodeWindow({ filename = 'file.ts', badge, lines = [] }) {
  return (
    <div className="w-full max-w-full overflow-hidden rounded-xl bg-code-bg font-mono text-[12.5px] leading-[1.9] shadow-[0_30px_80px_-30px_rgba(23,21,15,0.5)] ring-1 ring-ink/10 sm:text-[14px]">
      {/* title bar */}
      <div className="flex items-center gap-2 border-b border-white/[0.06] bg-code-bar px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-[12px] text-code-comment">{filename}</span>
        {badge && (
          <span className="ml-auto rounded-md bg-white/[0.06] px-2 py-0.5 text-[11px] text-code-gutter">
            {badge}
          </span>
        )}
      </div>

      {/* body */}
      <div className="flex overflow-x-auto px-2 py-5 sm:px-4">
        <div className="select-none pr-4 text-right text-code-gutter sm:pr-6">
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <div className="min-w-0 text-code-text">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              className="whitespace-pre"
              initial={{ opacity: 0, x: -6 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.3, delay: i * 0.05, ease: 'easeOut' }}
            >
              {line || ' '}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
