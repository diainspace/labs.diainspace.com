import { ExperimentIndex } from '../components/ExperimentIndex'
import { StrayThoughtPlaceholder } from '../components/StrayThoughtPlaceholder'

export function HomePage() {
  return <>
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-main"><p className="hero-kicker">Unnecessary inventions.<br />Necessary engineering.</p>
        <h1 id="hero-title" className="hero-title">LAB<span className="pink-square" aria-hidden="true" /></h1>
        <p className="hero-description">A playground for curious ideas,<br className="desktop-break" /> questionable solutions, and<br className="desktop-break" /> delightfully serious engineering.</p>
      </div>
      <StrayThoughtPlaceholder />
    </section>
    <ExperimentIndex />
    <section className="bottom-split" aria-label="Explore the lab">
      <article className="whippers-panel"><p className="eyebrow">02 / Whippers</p><h2 className="display">Whippers.</h2><p>Technical documentation<br />for questionable inventions.</p><a href="/whippers/">Read the Whippers</a></article>
      <article className="about-panel"><p className="eyebrow">03 / About</p><h2 className="display">Why<br />this lab?</h2><p>A place for the ideas that don’t<br className="desktop-break" /> fit anywhere else.</p><a href="/about/">More about the lab</a></article>
    </section>
  </>
}
