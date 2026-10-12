import { experiments, type Experiment } from '../data/experiments'

function Scribble() {
  return <svg className="scribble" viewBox="0 0 160 90" aria-hidden="true"><path d="M8 68C91 4 126 91 47 71S21-8 105 27 92 97 45 49 117 0 133 65 39 65 13 43 85-2 111 19 79 99 31 64 18 17 92 13 137 49 59 96 19 78 99 11 143 34 55 51 31 79 55 23 151 23" /></svg>
}

function ExperimentRow({ experiment }: { experiment: Experiment }) {
  return <li className="experiment-row">
    <span className="experiment-id">{experiment.id}</span>
    <h3><a href={`/experiments/${experiment.slug}/`}>{['001', '002'].includes(experiment.id) ? <><span className="title-prefix">The </span>{experiment.title.slice(4)}</> : experiment.title}</a></h3>
    <div className="experiment-copy"><p className="topics">{experiment.topics}</p><p>{experiment.description}</p></div>
    {experiment.id === '004' && <Scribble />}
  </li>
}

export function ExperimentIndex() {
  return <section className="experiments" aria-labelledby="experiments-title">
    <div className="experiment-heading">
      <div><p className="eyebrow">01 / Current experiments</p><h2 id="experiments-title" className="display">Experiments</h2></div>
      <div className="section-intro"><p>Interactive things with<br />technical Whippers.</p><p>Some make sense.<br />Most don’t have to.</p></div>
    </div>
    <ol className="experiment-list">{experiments.map(experiment => <ExperimentRow key={experiment.id} experiment={experiment} />)}</ol>
  </section>
}
