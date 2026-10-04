import { motion } from 'framer-motion';
import { introButtonLabel, introLines, siteTitle } from '../data/apologyContent';

interface IntroSceneProps {
  onStart: () => void;
}

export function IntroScene({ onStart }: IntroSceneProps) {
  return (
    <section className="scene-section scene-section--intro" data-scene-index="0" aria-labelledby="intro-title">
      <div className="scene-copy scene-copy--center intro-copy">
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.62 }}
          transition={{ duration: 0.9, delay: 0.15 }}
        >
          {siteTitle}
        </motion.span>
        <h1 id="intro-title" className="sr-only">
          {siteTitle}
        </h1>
        {introLines.map((line, index) => (
          <motion.p
            key={line}
            className={index === 0 ? 'intro-copy__name' : 'intro-copy__line'}
            initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.78, delay: 0.55 + index * 0.82, ease: [0.22, 1, 0.36, 1] }}
          >
            {line}
          </motion.p>
        ))}
        <motion.button
          className="ghost-button intro-copy__button"
          type="button"
          onClick={onStart}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 4.15 }}
        >
          {introButtonLabel}
        </motion.button>
      </div>
    </section>
  );
}
