import { AnimatePresence, motion } from 'framer-motion';
import { letterParagraphs } from '../data/apologyContent';

interface LetterSceneProps {
  letterOpen: boolean;
  letterCompleted: boolean;
  onOpenLetter: () => void;
  onCloseLetter: () => void;
}

export function LetterScene({
  letterOpen,
  letterCompleted,
  onOpenLetter,
  onCloseLetter,
}: LetterSceneProps) {
  return (
    <section className="scene-section scene-section--letter" data-scene-index="4" aria-labelledby="letter-title">
      <div className="scene-copy scene-copy--center scene-copy--letter">
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 0.75, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7 }}
        >
          05 / The 3D Letter
        </motion.span>
        <motion.h2
          id="letter-title"
          initial={{ opacity: 0, y: 28, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.9, delay: 0.1 }}
        >
          One thing, properly.
        </motion.h2>

        <AnimatePresence mode="wait">
          {!letterOpen ? (
            <motion.div
              key="closed-letter"
              className="letter-intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45 }}
            >
              <p>
                A quiet letter — no pressure attached, no expectation hidden inside it.
              </p>
              <button className="ghost-button" type="button" onClick={onOpenLetter}>
                Open it.
              </button>
              {letterCompleted ? (
                <small>When you are ready, there is one last quiet thing below.</small>
              ) : null}
            </motion.div>
          ) : (
            <motion.article
              key="open-letter"
              className="letter-paper"
              initial={{ opacity: 0, y: 34, rotateX: -6, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              {letterParagraphs.map((paragraph, index) => {
                const isSignature = 'signature' in paragraph && paragraph.signature;
                return (
                  <p
                    key={`${paragraph.text}-${index}`}
                    className={`${paragraph.emphasis ? 'letter-paper__emphasis' : ''} ${
                      isSignature ? 'letter-paper__signature' : ''
                    }`}
                  >
                    {paragraph.text}
                  </p>
                );
              })}
              <button className="letter-paper__close" type="button" onClick={onCloseLetter}>
                Close this letter
              </button>
            </motion.article>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
