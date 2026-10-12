export function StrayThoughtPlaceholder() {
  return <aside className="stray-thought" aria-labelledby="thought-title">
    <div className="art-placeholder" aria-label="Original character artwork forthcoming"><span>Character<br />forthcoming.</span></div>
    <div className="thought-copy">
      <h2 id="thought-title">Stray Thought</h2>
      <p className="demo-label">Design preview / sample text</p>
      <blockquote>“The component was functioning as designed. Unfortunately, the design was incorrect.”</blockquote>
      <button type="button" disabled aria-describedby="thought-status">Another thought</button>
      <p className="thought-source">Source: undisclosed</p>
      <p id="thought-status" className="placeholder-note">Waiting for real Whippers.</p>
    </div>
  </aside>
}
