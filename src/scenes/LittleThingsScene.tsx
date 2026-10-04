import { AnimatePresence, motion } from 'framer-motion';
import {
  littleThingsReveal,
  littleThingsScene,
  littleThingsStars,
  type LittleThingId,
} from '../data/apologyContent';
import { StaggeredText } from '../ui/StaggeredText';

interface LittleThingsSceneProps {
  activatedCount: number;
  onActivateStar: (star: LittleThingId) => void;
}

export function LittleThingsScene({ activatedCount, onActivateStar }: LittleThingsSceneProps) {
  const hasConstellation = activatedCount >= littleThingsScene.revealThreshold;

  return (
    <section className="scene-section scene-section--little-things" data-scene-index="2" aria-labelledby="little-things-title">
      <div className="scene-copy scene-copy--center scene-copy--narrow">
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 0.75, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.55 }}
        >
          {littleThingsScene.eyebrow}
        </motion.span>
        <motion.h2
          id="little-things-title"
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.72, delay: 0.08 }}
        >
          {littleThingsScene.title}
        </motion.h2>
        <AnimatePresence mode="wait">
          {hasConstellation ? (
            <motion.div
              key="reveal"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.45 }}
            >
              <StaggeredText lines={littleThingsReveal} className="constellation-reveal" />
            </motion.div>
          ) : (
            <motion.div
              key="prompt"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.65, delay: 0.18 }}
            >
              <p className="constellation-prompt">{littleThingsScene.prompt}</p>
              <div className="star-actions" aria-label={littleThingsScene.actionAriaLabel}>
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
