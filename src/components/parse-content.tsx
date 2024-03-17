interface ParsedContentProps {
  text: string
}

export function ParsedContent({ text }: ParsedContentProps) {
  return text.split('\n').map((line, i) => (
    <p key={i} className="pb-4">
      {line}
    </p>
  ))
}
