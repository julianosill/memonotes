export function getExcerpt(text: string, length: number = 120) {
  const textWithoutTags = text.replace(/<\/(strong|em)>|<[^>]*>/g, (match) => {
    if (match === '</strong>' || match === '</em>') {
      return ''
    } else {
      return ' '
    }
  })

  if (textWithoutTags.length <= length) return textWithoutTags

  return textWithoutTags.substring(0, length).concat('...')
}
