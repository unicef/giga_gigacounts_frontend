export const download = async (url: string, name?: string) => {
  fetch(url, {
    mode: 'no-cors',
  })
    .then((response) => response.blob())
    .then((blob) => {
      let blobUrl = window.URL.createObjectURL(blob)

      const link = document.createElement('a')

      link.href = blobUrl

      if (name) {
        link.download = name
      }
      link.click()

      link.remove()
    })
}
