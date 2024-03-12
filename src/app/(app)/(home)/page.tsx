import { NoteCard } from '@/components/note-card'

const cards = [1, 2, 3, 4]

export default function Home() {
  return (
    <main>
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((note) => (
          <NoteCard key={note} />
        ))}
      </section>
    </main>
  )
}
