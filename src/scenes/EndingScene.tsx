import { AnimatePresence, motion } from 'framer-motion';
import { finalEndingLines, oneLastThingLines, seedEndingLines } from '../data/apologyContent';

interface EndingSceneProps {
  lastThingOpen: boolean;
  onOpenLastThing: () => void;
}

export function EndingScene({ lastThingOpen, onOpenLastThing }: EndingSceneProps) {
  return (
    <section className="scene-section scene-section--ending" data-scene-index="5" aria-labelledby="ending-title">
      <div className="scene-copy scene-copy--center scene-copy--ending">
        <h2 id="ending-title" className="sr-only">
          One last thing
        </h2>
        <AnimatePresence mode="wait">
          {!lastThingOpen ? (
            <motion.div
              key="one-last-button"
              className="ending-start"
              initial={{ opacity: 0, y: 22, filter: 'blur(12px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -18, filter: 'blur(8px)' }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.85 }}
            >
              <button className="ghost-button" type="button" onClick={onOpenLastThing}>
                One last thing…
              </button>
              <p>Only if you want to read it.</p>
            </motion.div>
          ) : (
            <motion.div
              key="ending-copy"
              className="ending-lines"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {oneLastThingLines.map((line, index) => (
                <motion.p
                  key={line}
                  initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.9, delay: index * 1.15, ease: [0.22, 1, 0.36, 1] }}
                >
                  {line}
                </motion.p>
              ))}

              <div className="ending-lines__seed">
                {seedEndingLines.map((line, index) => (
                  <motion.p
                    key={line}
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.86,
                      delay: oneLastThingLines.length * 1.15 + 1.2 + index * 0.9,
                    }}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>

              <motion.div
                className="ending-lines__final"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  delay: oneLastThingLines.length * 1.15 + 1.2 + seedEndingLines.length * 0.9 + 0.6,
                }}
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
