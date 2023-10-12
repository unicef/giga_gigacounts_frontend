export const downloadFile = (fileOrUrl: File | string, fileName: string) => {
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = typeof fileOrUrl === 'string' ? fileOrUrl : URL.createObjectURL(fileOrUrl)
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  setTimeout(() => {
    URL.revokeObjectURL(link.href)
    link.parentNode?.removeChild(link)
  }, 0)
}
