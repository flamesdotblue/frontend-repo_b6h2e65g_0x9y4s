import { useEffect, useState } from 'react'
import PostCard from './PostCard'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

export default function PostList() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const res = await fetch(`${API_BASE}/api/posts?published=true`)
        const data = await res.json()
        setPosts(Array.isArray(data) ? data : [])
      } catch (e) {
        setError('Failed to load posts')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <section id="posts" className="py-12 sm:py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">Latest Articles</h2>
          <button
            className="text-sm text-slate-600 hover:text-slate-900"
            onClick={() => window.location.reload()}
          >
            Refresh
          </button>
        </div>

        {loading && (
          <p className="mt-6 text-slate-600">Loading posts...</p>
        )}
        {error && (
          <p className="mt-6 text-rose-600">{error}</p>
        )}

        {!loading && !error && (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <PostCard key={p.id} post={p} onClick={() => {}} />
            ))}
            {posts.length === 0 && (
              <div className="col-span-full text-slate-600">
                No posts yet. Create one in the dashboard below.
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
