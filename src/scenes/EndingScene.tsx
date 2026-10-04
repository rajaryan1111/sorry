import { AnimatePresence, motion } from 'framer-motion';
import { endingLines, endingScene, finalEndingLines } from '../data/apologyContent';

interface EndingSceneProps {
  lastThingOpen: boolean;
  onOpenLastThing: () => void;
}

export function EndingScene({ lastThingOpen, onOpenLastThing }: EndingSceneProps) {
  return (
    <section className="scene-section scene-section--ending" data-scene-index="5" aria-labelledby="ending-title">
      <div className="scene-copy scene-copy--center scene-copy--ending">
        <h2 id="ending-title" className="sr-only">
          {endingScene.title}
        </h2>
        <AnimatePresence mode="wait">
          {!lastThingOpen ? (
            <motion.div
              key="one-last-button"
              className="ending-start"
              initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.65 }}
            >
              <button className="ghost-button" type="button" onClick={onOpenLastThing}>
                {endingScene.button}
              </button>
              <p>{endingScene.intro}</p>
            </motion.div>
          ) : (
            <motion.div
              key="ending-copy"
              className="ending-lines"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {endingLines.map((line, index) => (
                <motion.p
                  key={line}
                  initial={{ opacity: 0, y: 18, filter: 'blur(7px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.68, delay: index * 0.72, ease: [0.22, 1, 0.36, 1] }}
                >
                  {line}
                </motion.p>
              ))}

              <motion.div
                className="ending-lines__final"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: endingLines.length * 0.72 + 0.45 }}
              >
                <p>{finalEndingLines[0]}</p>
                <span>{finalEndingLines[1]}</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
