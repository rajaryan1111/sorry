import { motion } from 'framer-motion';

interface StaggeredTextProps {
  lines: readonly string[];
  className?: string;
  delay?: number;
  largeFinalLine?: boolean;
}

export function StaggeredText({
  lines,
  className,
  delay = 0,
  largeFinalLine = false,
}: StaggeredTextProps) {
  return (
    <div className={className}>
      {lines.map((line, index) => (
        <motion.p
          key={`${line}-${index}`}
          className={largeFinalLine && index === lines.length - 1 ? 'final-line' : undefined}
          initial={{ opacity: 0, y: 24, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-18% 0px -18% 0px' }}
          transition={{
            duration: 0.95,
            delay: delay + index * 0.82,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {line}
        </motion.p>
      ))}
    </div>
  );
}
