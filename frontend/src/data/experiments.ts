export interface Experiment {
  id: string
  slug: string
  title: string
  topics: string
  description: string
  status: 'planned' | 'in-progress'
  whipper: { slug: string; title: string } | null
}

export const experiments: Experiment[] = [
  { id: '001', slug: 'the-indecision-engine', title: 'The Indecision Engine', topics: 'Probabilities. State. Chaos.', description: 'A deeply overengineered system for making the smallest decisions.', status: 'in-progress', whipper: null },
  { id: '002', slug: 'the-infinite-canvas', title: 'The Infinite Canvas', topics: 'Paint. Parameters. Surprise.', description: 'A generative playground for artistic accidents and happy mistakes.', status: 'planned', whipper: null },
  { id: '003', slug: 'the-bureau-of-lost-buttons', title: 'The Bureau of Lost Buttons', topics: 'Components. Animation. Persistence.', description: 'A user interface whose controls refuse to cooperate.', status: 'planned', whipper: null },
  { id: '004', slug: 'in-progress', title: '???', topics: 'In progress.', description: 'Every lab needs something strange brewing in the background.', status: 'in-progress', whipper: null },
]
