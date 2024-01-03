export const textWithoutHTML = (text: string) => {
  return text.replace(/<[^>]*>/g, '')
}