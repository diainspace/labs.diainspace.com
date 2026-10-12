import { useEffect, useRef, useState } from 'react'

type AdviceEntry = { id: string; advice: string }
type Finding = { id: string; results: AdviceEntry[]; message?: string }
const remarks = ['I’ll work with this. Somehow.', 'Certainly. Until reality agrees with you.', 'So we’re asking the same question again. Excellent.', 'Your commitment to avoiding a decision has been noted.', 'I have filed your previous answers under “Apparently Not.”']

export function IndecisionEngine() {
  const [question, setQuestion] = useState('')
  const [result, setResult] = useState<Finding | null>(null)
  const [attempts, setAttempts] = useState(0)
  const [comment, setComment] = useState('What do you want now?')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [reaction, setReaction] = useState<'accepted' | 'rejected' | null>(null)
  const controller = useRef<AbortController | null>(null)
  const lastId = useRef<string | null>(null)
  const lastQuestion = useRef('')
  useEffect(() => () => controller.current?.abort(), [])

  async function decide(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (busy) return
    const text = question.trim()
    if (!text) { setError('A question would help. I’m not doing both parts.'); return }
    setError(''); setBusy(true); setReaction(null); setResult(null)
    setComment(attempts ? 'Again? Fine. Let me consult the files.' : 'Hold. I’m consulting departmental guidance.')
    const request = new AbortController(); controller.current = request
    const timeout = setTimeout(() => request.abort(), 10000)
    try {
      const response = await fetch('/api/advice', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({question:text, previous:lastQuestion.current === text ? lastId.current : null}), signal:request.signal })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'The department is unavailable. Try again.')
      if (typeof data.id !== 'string' || !Array.isArray(data.results) || data.results.some((item: AdviceEntry) => !item || typeof item.id !== 'string' || typeof item.advice !== 'string')) throw new Error('The paperwork arrived incomplete. Try again.')
      setResult(data); lastId.current = data.id; lastQuestion.current = text
      setComment(remarks[Math.min(attempts, remarks.length - 1)]); setAttempts(value => value + 1)
    } catch (cause) {
      if (controller.current !== request) return
      setError(cause instanceof Error && cause.name !== 'AbortError' ? cause.message : 'The department has put you on hold. Try again.')
      setComment('An administrative inconvenience. Naturally.')
    } finally {
      clearTimeout(timeout)
      if (controller.current === request) { controller.current = null; setBusy(false) }
    }
  }
  function reset() {
    controller.current?.abort(); controller.current = null
    setQuestion(''); setResult(null); setAttempts(0); setError(''); setBusy(false); setReaction(null)
    setComment('What do you want now?'); lastId.current = null; lastQuestion.current = ''
  }
  return <section className="content-page engine-page">
    <p className="eyebrow">Experiment 001 / Open for unnecessary business</p>
    <h1 className="display">The Indecision Engine</h1>
    <p className="page-lead">Department of Decisions Too Small to Require a Department.</p>
    <div className="engine-layout">
      <aside className="receptionist-terminal" aria-label="The Receptionist" aria-live="polite" aria-atomic="true">
        <p><em>The Receptionist:</em> {comment}</p>
        <span className="terminal-cursor" aria-hidden="true">▍</span>
      </aside>
      <div className="engine-workspace">
        <form onSubmit={decide} noValidate aria-busy={busy}>
          <label className="field-label" htmlFor="decision-question">What is the alleged dilemma?</label>
          <textarea id="decision-question" value={question} maxLength={240} rows={3} disabled={busy} aria-invalid={!!error} aria-describedby={error ? 'decision-error' : undefined} placeholder="Should I buy another notebook?" onChange={event => { setQuestion(event.target.value); setResult(null); setReaction(null); setError('') }} />
          {error && <p id="decision-error" className="engine-error" role="alert">{error}</p>}
          <button className="decide-button" type="submit" disabled={busy}>{busy ? 'Consulting the files…' : 'I dunno. You decide.'}</button>
        </form>
        <div className="verdict-region" aria-live="polite" aria-atomic="true">
          {result && <section className="verdict" aria-labelledby="verdict-title">
            <p className="eyebrow">Finding {String(attempts).padStart(3, '0')} / {reaction === 'accepted' ? 'Filed' : reaction === 'rejected' ? 'Objection noted' : 'Issued reluctantly'}</p>
            <h2 id="verdict-title" className="finding-heading">{result.results.length ? 'From the files' : 'Nothing in the files'}</h2>
            {result.results.map(item => <p className="local-advice" key={item.id}>{item.advice}</p>)}
            {result.message && <p>{result.message}</p>}
          </section>}
        </div>
        {result && result.results.length > 0 && <div className="verdict-actions">
          <button type="button" disabled={!!reaction} onClick={() => { setReaction('accepted'); setComment('Wonderful. We can both move on with our lives.') }}>Unfortunately, yes.</button>
          <button type="button" disabled={!!reaction} onClick={() => { setReaction('rejected'); setComment('So you did have a preference. Fascinating.') }}>Absolutely not.</button>
        </div>}
        <button className="start-over" type="button" onClick={reset}>Start a new dilemma</button>
      </div>
    </div>
    <a className="text-link" href="/experiments/">Back to experiments</a>
  </section>
}
