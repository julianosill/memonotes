export function getExcerpt(text: string, length: number = 120) {
  if (text.length <= length) return text
  return text.substring(0, length).concat('...')
}
