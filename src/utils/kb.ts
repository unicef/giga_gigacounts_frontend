import { KNOWLEDGE_BASE_MAP, KNOWLEDGE_BASE_URL } from 'src/constants'

export const redirectToKnowledgeBase = (pathname?: string) => {
  let link = KNOWLEDGE_BASE_URL
  if (pathname) {
    Object.keys(KNOWLEDGE_BASE_MAP).forEach((key) => {
      if (pathname.includes(key)) {
        link = KNOWLEDGE_BASE_MAP[key]
      }
    })
  }
  window.open(link, '_blank')
}
