import { AnimatePresence, motion } from 'framer-motion';
import { letterParagraphs, letterScene } from '../data/apologyContent';

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
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 0.75, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55 }}
        >
          {letterScene.eyebrow}
        </motion.span>
        <motion.h2
          id="letter-title"
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.72, delay: 0.08 }}
        >
          {letterScene.title}
        </motion.h2>

        <AnimatePresence mode="wait">
          {!letterOpen ? (
            <motion.div
              key="closed-letter"
              className="letter-intro"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
            >
              <p>{letterScene.intro}</p>
              <button className="ghost-button" type="button" onClick={onOpenLetter}>
                {letterScene.openButton}
              </button>
              {letterCompleted ? <small>{letterScene.completedHint}</small> : null}
            </motion.div>
          ) : (
            <motion.article
              key="open-letter"
              className="letter-paper"
              initial={{ opacity: 0, y: 24, rotateX: -4, filter: 'blur(7px)' }}
              animate={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -14, filter: 'blur(6px)' }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
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
                {letterScene.closeButton}
              </button>
            </motion.article>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
