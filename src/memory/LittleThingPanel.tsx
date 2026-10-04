import { motion, AnimatePresence } from 'framer-motion';
import { littleThingsStars, type LittleThingId } from '../data/apologyContent';

interface LittleThingPanelProps {
  highlightedStar: LittleThingId | null;
  activatedCount: number;
}

export function LittleThingPanel({ highlightedStar, activatedCount }: LittleThingPanelProps) {
  const star = littleThingsStars.find((item) => item.id === highlightedStar);

  return (
    <AnimatePresence mode="wait">
      {star ? (
        <motion.aside
          key={star.id}
          className="little-thing-panel"
          initial={{ opacity: 0, y: 10, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.99 }}
          transition={{ duration: 0.28 }}
          aria-live="polite"
        >
          <span>{star.label}</span>
          <small>
            {activatedCount >= 4
              ? 'A few ordinary things have connected.'
              : 'Tap the brighter stars gently. No rush.'}
          </small>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
