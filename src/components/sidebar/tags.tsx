const tags = ['Typescript', 'Next.js', 'Node.js']

export function Tags() {
  return (
    <section>
      <span className="text-sm font-semibold text-secondary">Tags</span>

      <div className="mt-6 flex flex-col items-start gap-4">
        {tags.map((tag) => (
          <button key={tag} className="text-sm text-accent hover:text-white">
            {tag}
          </button>
        ))}
      </div>
    </section>
  )
}
