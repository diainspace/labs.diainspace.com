import { SiteHeader } from './components/SiteHeader'
import { SiteFooter } from './components/SiteFooter'
import { HomePage } from './pages/HomePage'
import { AboutPage, ExperimentPage, ExperimentsPage, NotFoundPage, WhippersPage } from './pages/ContentPages'

export function App() {
  const path = window.location.pathname.replace(/\/+$/, '') + '/'
  const slug = path.match(/^\/experiments\/([a-z0-9-]+)\/$/)?.[1]
  const page = path === '/' ? <HomePage /> : path === '/experiments/' ? <ExperimentsPage /> : slug ? <ExperimentPage slug={slug} /> : path === '/whippers/' ? <WhippersPage /> : path === '/about/' ? <AboutPage /> : <NotFoundPage />
  return <div className="site-wrap"><a className="skip-link" href="#main">Skip to content</a><SiteHeader path={path} /><main id="main">{page}</main><SiteFooter /></div>
}
