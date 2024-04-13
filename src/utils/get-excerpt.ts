export function getExcerpt(text: string, length: number = 120) {
  const textWithoutTags = text.replace(/<[^>]*>/g, '')

  if (textWithoutTags.length <= length) return textWithoutTags

  return textWithoutTags.substring(0, length).concat('...')
}
