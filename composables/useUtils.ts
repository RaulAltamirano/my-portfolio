export const useUtils = () => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString()
  }

  const scrollToElement = (elementId: string) => {
    if (!process.client) return
    
    const element = document.getElementById(elementId)
    if (element) {
      try {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
      } catch (error) {
        console.error('Error scrolling to element:', error)
        // Fallback to instant scroll if smooth scroll fails
        element.scrollIntoView()
      }
    }
  }

  return {
    formatDate,
    scrollToElement
  }
}
