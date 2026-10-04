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
          initial={{ opacity: 0, y: 16, filter: 'blur(7px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-16% 0px -16% 0px' }}
          transition={{
            duration: 0.68,
            delay: delay + index * 0.48,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {line}
        </motion.p>
      ))}
    </div>
  );
}
