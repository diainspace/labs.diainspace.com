export function SiteHeader({ path }: { path: string }) {
  const links = [['/', 'Lab'], ['/experiments/', 'Experiments'], ['/whippers/', 'Whippers'], ['/about/', 'About']]
  return <header className="site-header">
    <a className="wordmark" href="/" aria-label="DIA Lab home">DIA</a>
    <nav aria-label="Main navigation">{links.map(([href, label]) => {
      const active = href === '/' ? path === '/' : path.startsWith(href)
      return <a key={href} href={href} aria-current={active ? 'page' : undefined}>{label}</a>
    })}</nav>
    <a className="parent-site" href="https://diainspace.com">diainspace.com</a>
  </header>
}
