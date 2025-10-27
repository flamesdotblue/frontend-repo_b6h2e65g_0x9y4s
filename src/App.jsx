import { useState } from 'react'
import Navbar from './components/Navbar'
import FeaturedHero from './components/FeaturedHero'
import PostList from './components/PostList'
import CMSDashboard from './components/CMSDashboard'

function App() {
  const [showCMS, setShowCMS] = useState(false)

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar onToggleCMS={() => setShowCMS((v) => !v)} showCMS={showCMS} />
      <main>
        <FeaturedHero />
        <PostList />
        {showCMS && <CMSDashboard />}
      </main>
      <footer className="border-t border-slate-200 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-600">
          <p>© {new Date().getFullYear()} ProBlog. All rights reserved.</p>
          <p>
            Built with ♥ using a modern stack.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
