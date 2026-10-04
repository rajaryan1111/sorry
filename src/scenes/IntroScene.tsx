import { motion } from 'framer-motion';
import { introLines } from '../data/apologyContent';

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
          transition={{ duration: 1.4, delay: 0.2 }}
        >
          For Tushi — Just One Thing
        </motion.span>
        <h1 id="intro-title" className="sr-only">
          For Tushi — Just One Thing
        </h1>
        {introLines.map((line, index) => (
          <motion.p
            key={line}
            className={index === 0 ? 'intro-copy__name' : 'intro-copy__line'}
            initial={{ opacity: 0, y: 18, filter: 'blur(12px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.08, delay: 0.9 + index * 1.28, ease: [0.22, 1, 0.36, 1] }}
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
          transition={{ duration: 0.8, delay: 6.0 }}
        >
          Can I say it?
        </motion.button>
      </div>
    </section>
  );
}
