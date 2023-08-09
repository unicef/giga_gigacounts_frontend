import { Button, Link } from '@carbon/react'
import { ICONS } from 'src/constants'

type Props<T extends Record<string, string | number>> = {
  type: 'button' | 'link'
  data: T[]
  fileName: string
  label: string
  order?: string[]
}

export default function DownloadCsv<T extends Record<string, string | number>>({
  type,
  data,
  fileName,
  label,
  order
}: Props<T>) {
  const download = () => {
    if (data.length === 0) return
    const keys = order || Object.keys(data[0])
    let fileString = `${keys.join(';')}\n`
    data.forEach((item) => {
      let itemString = `${item[keys[0]]}`
      keys.forEach((key, i) => {
        if (i === 0) return
        itemString = `${itemString};${item[key]}`
      })
      fileString = `${fileString}${itemString}\n`
    })
    const template = new File(
      [fileString],
      `${fileName}_${new Date().toISOString().slice(0, 10).replace(/-/g, '_')}.csv`
    )
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = URL.createObjectURL(template)
    link.download = template.name
    document.body.appendChild(link)
    link.click()
    setTimeout(() => {
      URL.revokeObjectURL(link.href)
      link.parentNode?.removeChild(link)
    }, 0)
  }

  const types: { [K in typeof type]: JSX.Element } = {
    button: (
      <Button renderIcon={ICONS.Download} onClick={download}>
        {label}
      </Button>
    ),
    link: <Link onClick={download}>{label}</Link>
  }

  return types[type]
}
