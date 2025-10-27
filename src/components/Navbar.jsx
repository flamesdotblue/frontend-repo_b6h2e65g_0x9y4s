import { useState } from 'react'
import { BookOpen, Settings } from 'lucide-react'

export default function Navbar({ onToggleCMS, showCMS }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 grid place-items-center text-white">
              <BookOpen size={18} />
            </div>
            <span className="font-semibold text-slate-800 text-lg">ProBlog</span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-slate-600">
            <a className="hover:text-slate-900" href="#featured">Featured</a>
            <a className="hover:text-slate-900" href="#posts">Latest</a>
            <button
              onClick={onToggleCMS}
              className={`inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm transition-colors ${
                showCMS
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              <Settings size={16} />
              {showCMS ? 'Close CMS' : 'Open CMS'}
            </button>
          </nav>

          <button
            className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-md border border-slate-300"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle Menu"
          >
            <span className="sr-only">Menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4 flex flex-col gap-2 text-slate-700">
            <a className="py-2" href="#featured" onClick={() => setOpen(false)}>
              Featured
            </a>
            <a className="py-2" href="#posts" onClick={() => setOpen(false)}>
              Latest
            </a>
            <button
              onClick={() => {
                onToggleCMS();
                setOpen(false);
              }}
              className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm bg-white text-slate-700 border-slate-300"
            >
              <Settings size={16} />
              {showCMS ? 'Close CMS' : 'Open CMS'}
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
