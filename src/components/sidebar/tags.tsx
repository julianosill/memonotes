const tags = ['Typescript', 'Next.js', 'Node.js']

export function Tags() {
  return (
    <section>
      <span className="text-memonotes-300 dark:text-memonotes-400 text-sm font-semibold">
        Tags
      </span>

      <div className="mt-6 flex flex-col items-start gap-4">
        {tags.map((tag) => (
          <button
            key={tag}
            className="text-sm font-medium text-zinc-200 hover:text-white dark:text-zinc-300 dark:hover:text-white"
          >
            {tag}
          </button>
        ))}
      </div>
    </section>
  )
}
