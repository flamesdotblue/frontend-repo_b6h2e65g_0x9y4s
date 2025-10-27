export default function FeaturedHero() {
  return (
    <section id="featured" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-rose-50 pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center rounded-full bg-indigo-50 text-indigo-700 px-3 py-1 text-xs font-medium ring-1 ring-inset ring-indigo-200">
              Editorial
            </span>
            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900">
              Insights, stories, and ideas for modern creators
            </h1>
            <p className="mt-4 text-slate-600 text-base sm:text-lg">
              A clean and professional blog experience with a built-in CMS to publish articles in seconds.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#posts" className="inline-flex items-center rounded-md bg-slate-900 px-4 py-2 text-white text-sm font-medium shadow-sm hover:bg-slate-800">
                Read latest posts
              </a>
              <a href="#cms" className="inline-flex items-center rounded-md bg-white px-4 py-2 text-slate-800 text-sm font-medium ring-1 ring-slate-200 hover:bg-slate-50">
                Open dashboard
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] w-full rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg">
              <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
                <div className="bg-white/90 backdrop-blur rounded-lg p-4">
                  <h3 className="font-semibold text-slate-900">A thoughtful space for your ideas</h3>
                  <p className="text-sm text-slate-600">
                    Built with performance in mind, so your words take center stage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
