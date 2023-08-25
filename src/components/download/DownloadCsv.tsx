import { Button, ButtonKind, Link } from '@carbon/react'
import { ICONS } from 'src/constants'
import { useSnackbar } from 'src/hooks/useSnackbar'
import { useLocales } from 'src/locales'
import { capitalizeFirstLetter } from 'src/utils/strings'

type Props<T extends Record<string, string | number>> = {
  type: 'button' | 'link'
  buttonKind?: ButtonKind
  data: T[]
  fileName: string
  label?: string
  order?: string[]
}

export default function DownloadCsv<T extends Record<string, string | number>>({
  type,
  data,
  fileName,
  label,
  buttonKind,
  order
}: Props<T>) {
  const { pushInfo } = useSnackbar()
  const { translate } = useLocales()
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
    pushInfo('the_file_is_downloading')
  }

  const types: { [K in typeof type]: JSX.Element } = {
    button: (
      <Button
        kind={buttonKind}
        hasIconOnly={!label}
        iconDescription={!label ? capitalizeFirstLetter(translate('download')) : ''}
        renderIcon={ICONS.Download}
        onClick={download}
      >
        {label}
      </Button>
    ),
    link: <Link onClick={download}>{label}</Link>
  }

  return types[type]
}
