import { IndecisionEngine } from './IndecisionEngine'
import { ExperimentIndex } from '../components/ExperimentIndex'
import { experiments } from '../data/experiments'

export function ExperimentsPage() {
  return <div className="index-page"><p className="page-intro">Questionable inventions. Room to explore.</p><ExperimentIndex /></div>
}
export function ExperimentPage({ slug }: { slug: string }) {
  if (slug === 'the-indecision-engine') return <IndecisionEngine />
  const experiment = experiments.find(item => item.slug === slug)
  if (!experiment) return <NotFoundPage />
  return <section className="content-page"><p className="eyebrow">Experiment {experiment.id} / {experiment.status === 'planned' ? 'Planned' : 'In progress'}</p>
    <h1 className="display">{experiment.title}</h1><p className="topics">{experiment.topics}</p><p className="page-lead">{experiment.description}</p>
    <div className="content-note"><h2>The work begins here.</h2><p>This experiment is not available yet. Its interactive build and technical Whipper will follow.</p></div>
    <a className="text-link" href="/experiments/">Back to experiments</a></section>
}
export function WhippersPage() {
  return <section className="content-page"><p className="eyebrow">02 / Technical papers</p><h1 className="display">Whippers.</h1><p className="page-lead">Technical documentation for questionable inventions.</p>
    <div className="content-note"><h2>Serious engineering. Written down.</h2><p>A Whipper is the technical white paper behind an experiment: its purpose, React concepts, component architecture, state and data flow, implementation decisions, testing, limitations, and lessons learned.</p><p>The first Whipper will arrive with The Indecision Engine. No papers have been published yet.</p></div><a className="text-link" href="/experiments/the-indecision-engine/">Meet experiment 001</a></section>
}
export function AboutPage() {
  return <section className="content-page"><p className="eyebrow">03 / About</p><h1 className="display">Why this lab?</h1><p className="page-lead">A place for the ideas that don’t fit anywhere else.</p><div className="content-note"><h2>Unnecessary inventions. Necessary engineering.</h2><p>This is a playground for curious ideas, questionable solutions, and delightfully serious engineering. Each experiment makes room to learn React by building something a little absurd.</p><p>The inventions are playful. Their Whippers document the actual engineering and what the work teaches.</p></div><a className="text-link" href="/experiments/">Explore the experiments</a></section>
}
export function NotFoundPage() {
  return <section className="content-page"><p className="eyebrow">404 / Outside the lab</p><h1 className="display">Nothing here. Yet.</h1><p className="page-lead">This page could not be found.</p><a className="text-link" href="/">Back to the lab</a></section>
}
