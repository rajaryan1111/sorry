import { apologyLines } from '../data/apologyContent';
import { StaggeredText } from '../ui/StaggeredText';

export function ApologyScene() {
  return (
    <section className="scene-section scene-section--apology" data-scene-index="3" aria-labelledby="apology-title">
      <div className="scene-copy scene-copy--center scene-copy--wide">
        <span className="eyebrow">04 / Where I went wrong</span>
        <h2 id="apology-title" className="sr-only">
          Where I went wrong
        </h2>
        <StaggeredText lines={apologyLines} className="apology-lines" largeFinalLine />
      </div>
    </section>
  );
}
