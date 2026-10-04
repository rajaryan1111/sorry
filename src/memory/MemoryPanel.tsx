import { motion, AnimatePresence } from 'framer-motion';
import { everydayMemories, type EverydayMemoryId } from '../data/apologyContent';

interface MemoryPanelProps {
  selectedMemory: EverydayMemoryId | null;
  onClose: () => void;
}

export function MemoryPanel({ selectedMemory, onClose }: MemoryPanelProps) {
  const memory = everydayMemories.find((item) => item.id === selectedMemory);

  return (
    <AnimatePresence>
      {memory ? (
        <motion.aside
          className="memory-panel"
          initial={{ opacity: 0, y: 20, filter: 'blur(12px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: 16, filter: 'blur(10px)' }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          aria-live="polite"
        >
          <span className="eyebrow">{memory.title}</span>
          <p>{memory.line}</p>
          <button type="button" onClick={onClose}>
            let it stay quiet
          </button>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
