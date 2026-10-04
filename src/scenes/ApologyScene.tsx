import { apologyLines, apologyScene } from '../data/apologyContent';
import { StaggeredText } from '../ui/StaggeredText';

export function ApologyScene() {
  return (
    <section className="scene-section scene-section--apology" data-scene-index="3" aria-labelledby="apology-title">
      <div className="scene-copy scene-copy--center scene-copy--wide">
        <span className="eyebrow">{apologyScene.eyebrow}</span>
        <h2 id="apology-title" className="sr-only">
          {apologyScene.title}
        </h2>
        <StaggeredText lines={apologyLines} className="apology-lines" largeFinalLine />
      </div>
    </section>
  );
}
