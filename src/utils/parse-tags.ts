export function parseTags(str: string) {
  const filteredTags = str.split(',').reduce((acc: string[], tag: string) => {
    const trimmedTag = tag.trim()

    if (trimmedTag !== '') {
      const normalizedTag = trimmedTag
        .normalize('NFKD')
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/_/g, '-')
        .replace(/--+/g, '-')
        .replace(/-$/g, '')
      acc.push(normalizedTag)
    }

    return acc
  }, [])

  const tags = Array.from(new Set(filteredTags))

  return tags
}
