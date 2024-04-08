interface ParsedContentProps {
  text: string
}

export function ParsedContent({ text }: ParsedContentProps) {
  return text.split('\n').map((line, i) => (
    <p key={i} className="py-1.5">
      {line}
    </p>
  ))
}
