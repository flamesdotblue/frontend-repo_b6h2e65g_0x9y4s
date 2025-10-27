export default function PostCard({ post, onClick }) {
  const date = post.published_at ? new Date(post.published_at) : null
  return (
    <article
      onClick={onClick}
      className="group cursor-pointer rounded-xl border border-slate-200 bg-white p-5 hover:shadow-md transition-shadow"
    >
      {post.cover_image_url && (
        <div className="mb-4 overflow-hidden rounded-lg">
          <img
            src={post.cover_image_url}
            alt={post.title}
            className="h-48 w-full object-cover group-hover:scale-[1.02] transition-transform"
          />
        </div>
      )}
      <div className="flex items-center gap-2 mb-2">
        {post.tags?.slice(0, 3).map((t) => (
          <span key={t} className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
            {t}
          </span>
        ))}
      </div>
      <h3 className="text-lg font-semibold text-slate-900 line-clamp-2">{post.title}</h3>
      {post.excerpt && (
        <p className="mt-2 text-sm text-slate-600 line-clamp-3">{post.excerpt}</p>
      )}
      <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
        <span>By {post.author}</span>
        {date && <time dateTime={date.toISOString()}>{date.toLocaleDateString()}</time>}
      </div>
    </article>
  )
}
