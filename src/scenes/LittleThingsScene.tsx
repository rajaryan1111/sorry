import { AnimatePresence, motion } from 'framer-motion';
import {
  littleThingsReveal,
  littleThingsStars,
  type LittleThingId,
} from '../data/apologyContent';
import { StaggeredText } from '../ui/StaggeredText';

interface LittleThingsSceneProps {
  activatedCount: number;
  onActivateStar: (star: LittleThingId) => void;
}

export function LittleThingsScene({ activatedCount, onActivateStar }: LittleThingsSceneProps) {
  const hasConstellation = activatedCount >= 4;

  return (
    <section className="scene-section scene-section--little-things" data-scene-index="2" aria-labelledby="little-things-title">
      <div className="scene-copy scene-copy--center scene-copy--narrow">
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 0.75, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.7 }}
        >
          03 / The Little Things
        </motion.span>
        <motion.h2
          id="little-things-title"
          initial={{ opacity: 0, y: 28, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.9, delay: 0.1 }}
        >
          Not photographs. Not big moments. Just small lights.
        </motion.h2>
        <AnimatePresence mode="wait">
          {hasConstellation ? (
            <motion.div
              key="reveal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <StaggeredText lines={littleThingsReveal} className="constellation-reveal" />
            </motion.div>
          ) : (
            <motion.div
              key="prompt"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.85, delay: 0.28 }}
            >
              <p className="constellation-prompt">
                Move around the night sky and tap a few brighter stars. Each one is an ordinary part of the friendship — nothing invented, nothing exaggerated.
              </p>
              <div className="star-actions" aria-label="Activate little things in the constellation">
                {littleThingsStars.map((star) => (
                  <button key={star.id} type="button" onClick={() => onActivateStar(star.id)}>
                    {star.label.replace('.', '')}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
