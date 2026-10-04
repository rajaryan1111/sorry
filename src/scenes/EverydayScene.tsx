import { motion } from 'framer-motion';
import { everydayMemories, everydayScene, type EverydayMemoryId } from '../data/apologyContent';

interface EverydaySceneProps {
  onMemorySelect: (memory: EverydayMemoryId) => void;
}

export function EverydayScene({ onMemorySelect }: EverydaySceneProps) {
  return (
    <section className="scene-section scene-section--everyday" data-scene-index="1" aria-labelledby="everyday-title">
      <div className="scene-copy scene-copy--left">
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 0.75, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.55 }}
        >
          {everydayScene.eyebrow}
        </motion.span>
        <motion.h2
          id="everyday-title"
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.72, delay: 0.08 }}
        >
          {everydayScene.title}
        </motion.h2>
        {everydayScene.body.map((paragraph, index) => (
          <motion.p
            key={paragraph}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 0.86, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.65, delay: 0.2 + index * 0.12 }}
          >
            {paragraph}
          </motion.p>
        ))}
        <motion.div
          className="memory-actions"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.55, delay: 0.42 }}
          aria-label={everydayScene.actionAriaLabel}
        >
          {everydayMemories.map((memory) => (
            <button key={memory.id} type="button" onClick={() => onMemorySelect(memory.id)}>
              {memory.title}
            </button>
          ))}
        </motion.div>
      </div>
      <div className="scroll-hint" aria-hidden="true">
        {everydayScene.scrollHint}
      </div>
    </section>
  );
}
