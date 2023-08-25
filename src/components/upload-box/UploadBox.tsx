import { FileUploaderDropContainer } from '@carbon/react'
import { CSSProperties } from 'react'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'
import { capitalizeFirstLetter } from 'src/utils/strings'
import { AttachmentsList } from '../attachment-list'
import { Typography } from '../typography'

type Props = {
  showList?: boolean
  multiple?: boolean
  handleUpload: (files: File[]) => void
  handleDelete?: (name: string) => void
  labelText?: string
  accept: `.${string}`[]
  attachments?: { name: string; status: 'edit' | 'complete' | 'uploading' }[]
  maxSizeMb?: number
  style?: CSSProperties
  onSizeError?: (filesWithSizeError: File[]) => void
}

export default function UploadBox({
  showList = true,
  multiple = false,
  handleUpload,
  labelText,
  accept,
  handleDelete,
  attachments,
  maxSizeMb,
  style,
  onSizeError
}: Props) {
  const { spacing } = useTheme()
  const { translate } = useLocales()

  const getLabel = () => {
    const isSingular = accept.length === 1
    const replaceAccept = (value: string) =>
      !isSingular
        ? value.replace(
            '{{accept}}',
            `${accept.slice(0, -1).join(' ')} ${translate('and')} ${accept.at(-1)}`
          )
        : value.replace('{{accept}}', accept[0])

    if (maxSizeMb && accept)
      return `${replaceAccept(translate('file_container_label_accept'))}${' '}${translate(
        'file_container_label_size'
      ).replace('{{size}}', String(maxSizeMb))}`

    if (accept) return replaceAccept(translate('file_container_label_accept'))

    if (maxSizeMb)
      return translate('file_container_label_size').replace('{{size}}', String(maxSizeMb))

    return ''
  }

  return (
    <>
      {(maxSizeMb || accept) && (
        <Typography variant="disabled">{capitalizeFirstLetter(getLabel())}</Typography>
      )}
      <FileUploaderDropContainer
        style={{
          ...style,
          marginInline: 'auto',
          marginBlock: spacing.md,
          maxWidth: '100%'
        }}
        multiple={multiple}
        onAddFiles={(e: any) => {
          if (!maxSizeMb) return handleUpload([...e.target.files])
          const filesWithSizeError = [...e.target.files].filter(
            (f: File) => f.size > maxSizeMb * 1000000
          )
          if (filesWithSizeError.length <= 0) return handleUpload([...e.target.files])
          return onSizeError ? onSizeError(filesWithSizeError) : null
        }}
        labelText={labelText}
        accept={accept}
      />
      {showList && <AttachmentsList attachments={attachments || []} onDelete={handleDelete} />}
    </>
  )
}
