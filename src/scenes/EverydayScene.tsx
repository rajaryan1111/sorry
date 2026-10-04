import { motion } from 'framer-motion';
import { everydayMemories, type EverydayMemoryId } from '../data/apologyContent';

interface EverydaySceneProps {
  onMemorySelect: (memory: EverydayMemoryId) => void;
}

export function EverydayScene({ onMemorySelect }: EverydaySceneProps) {
  return (
    <section className="scene-section scene-section--everyday" data-scene-index="1" aria-labelledby="everyday-title">
      <div className="scene-copy scene-copy--left">
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 0.75, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.7 }}
        >
          02 / Our little everyday world
        </motion.span>
        <motion.h2
          id="everyday-title"
          initial={{ opacity: 0, y: 28, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.9, delay: 0.1 }}
        >
          It was never meant to be complicated.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 0.86, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.85, delay: 0.28 }}
        >
          Same class, food, gym, random jokes, and a lot of ordinary time together. Tap the small objects in this little world — they are only symbols of a friendship I value.
        </motion.p>
        <motion.div
          className="memory-actions"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.7, delay: 0.46 }}
          aria-label="Open small friendship memories"
        >
          {everydayMemories.map((memory) => (
            <button key={memory.id} type="button" onClick={() => onMemorySelect(memory.id)}>
              {memory.title}
            </button>
          ))}
        </motion.div>
      </div>
      <div className="scroll-hint" aria-hidden="true">
        explore gently · then scroll
      </div>
    </section>
  );
}
