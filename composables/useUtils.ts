export const useUtils = () => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString()
  }

  const scrollToElement = (elementId: string) => {
    const element = document.getElementById(elementId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return {
    formatDate,
    scrollToElement
  }
}
