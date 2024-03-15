interface ParsedContentProps {
  text: string
}

export function ParsedContent({ text }: ParsedContentProps) {
  return text.split('\n').map((line, i) => <p key={i}>{line}</p>)
}
