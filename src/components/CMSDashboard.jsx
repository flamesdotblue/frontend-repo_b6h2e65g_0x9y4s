import { useEffect, useMemo, useState } from 'react'
import { Trash2, Upload } from 'lucide-react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

export default function CMSDashboard() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: 'Admin',
    cover_image_url: '',
    tags: '',
    published: true,
  })

  const load = async () => {
    const res = await fetch(`${API_BASE}/api/posts?published=`)
    const data = await res.json()
    setPosts(Array.isArray(data) ? data : [])
  }

  useEffect(() => {
    load()
  }, [])

  const canSubmit = useMemo(() => {
    return form.title.trim().length > 2 && form.slug.trim().length > 2 && form.content.trim().length > 10
  }, [form])

  const createPost = async (e) => {
    e.preventDefault()
    if (!canSubmit) return
    setLoading(true)
    try {
      const payload = {
        ...form,
        tags: form.tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
      }
      const res = await fetch(`${API_BASE}/api/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Failed to create')
      setForm({ title: '', slug: '', excerpt: '', content: '', author: 'Admin', cover_image_url: '', tags: '', published: true })
      await load()
    } catch (e) {
      alert('Error creating post')
    } finally {
      setLoading(false)
    }
  }

  const deletePost = async (id) => {
    if (!confirm('Delete this post?')) return
    try {
      await fetch(`${API_BASE}/api/posts/${id}`, { method: 'DELETE' })
      await load()
    } catch (e) {
      alert('Failed to delete')
    }
  }

  return (
    <section id="cms" className="py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">Dashboard CMS</h2>
        </div>

        <div className="mt-8 grid lg:grid-cols-2 gap-8">
          <form onSubmit={createPost} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-4">Create new post</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700">Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="mt-1 w-full rounded-md border-slate-300 focus:border-slate-500 focus:ring-slate-500"
                  placeholder="A great article title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Slug</label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className="mt-1 w-full rounded-md border-slate-300 focus:border-slate-500 focus:ring-slate-500"
                  placeholder="great-article-title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Author</label>
                <input
                  type="text"
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                  className="mt-1 w-full rounded-md border-slate-300 focus:border-slate-500 focus:ring-slate-500"
                  placeholder="Your name"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700">Excerpt</label>
                <textarea
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  className="mt-1 w-full rounded-md border-slate-300 focus:border-slate-500 focus:ring-slate-500"
                  rows={2}
                  placeholder="One or two sentences summary"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700">Content</label>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="mt-1 w-full rounded-md border-slate-300 focus:border-slate-500 focus:ring-slate-500"
                  rows={6}
                  placeholder="Write your article content here..."
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700">Cover image URL</label>
                <input
                  type="url"
                  value={form.cover_image_url}
                  onChange={(e) => setForm({ ...form, cover_image_url: e.target.value })}
                  className="mt-1 w-full rounded-md border-slate-300 focus:border-slate-500 focus:ring-slate-500"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Tags</label>
                <input
                  type="text"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  className="mt-1 w-full rounded-md border-slate-300 focus:border-slate-500 focus:ring-slate-500"
                  placeholder="design, ux, engineering"
                />
              </div>
              <div className="flex items-center gap-2 mt-6">
                <input
                  id="published"
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => setForm({ ...form, published: e.target.checked })}
                  className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-600"
                />
                <label htmlFor="published" className="text-sm text-slate-700">
                  Publish immediately
                </label>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button
                type="submit"
                disabled={!canSubmit || loading}
                className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-4 py-2 text-white text-sm font-medium shadow-sm hover:bg-slate-800 disabled:opacity-60"
              >
                <Upload size={16} />
                Publish post
              </button>
              <button
                type="button"
                onClick={() =>
                  setForm({ title: '', slug: '', excerpt: '', content: '', author: 'Admin', cover_image_url: '', tags: '', published: true })
                }
                className="inline-flex items-center rounded-md bg-white px-4 py-2 text-slate-800 text-sm font-medium ring-1 ring-slate-200 hover:bg-slate-50"
              >
                Reset
              </button>
            </div>
          </form>

          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-4">All posts</h3>
            <div className="space-y-3 max-h-[560px] overflow-auto pr-1">
              {posts.map((p) => (
                <div key={p.id} className="flex items-start gap-4 p-3 rounded-lg border border-slate-200">
                  {p.cover_image_url && (
                    <img src={p.cover_image_url} alt="" className="h-16 w-16 object-cover rounded-md" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-medium text-slate-900 truncate">{p.title}</p>
                      <button
                        onClick={() => deletePost(p.id)}
                        className="text-rose-600 hover:text-rose-700"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 truncate">/{p.slug}</p>
                    <p className="text-sm text-slate-600 mt-1 line-clamp-2">{p.excerpt}</p>
                  </div>
                </div>
              ))}
              {posts.length === 0 && (
                <p className="text-slate-600">No posts created yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
