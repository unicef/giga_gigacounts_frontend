import { AttachmentsList } from 'src/components/attachment-list'
// @ts-ignore
import { FileUploaderDropContainer } from '@carbon/react'
import { useTheme } from 'src/theme'

type Props = {
  showList?: boolean
  status?: 'edit' | 'complete' | 'uploading'
  multiple?: boolean
  handleUpload: (files: File[]) => void
  handleDelete?: (name: string) => void
  labelText?: string
  accept: `.${string}`[]
  attachments?: { name: string }[]
}

export default function UploadBox({
  showList = true,
  multiple = true,
  handleUpload,
  labelText,
  accept,
  status,
  handleDelete,
  attachments
}: Props) {
  const { spacing } = useTheme()

  return (
    <>
      {showList && (
        <AttachmentsList status={status} attachments={attachments || []} onDelete={handleDelete} />
      )}
      <FileUploaderDropContainer
        style={{
          marginInline: 'auto',
          marginBlock: spacing.md,
          maxWidth: '100%'
        }}
        multiple={multiple}
        onAddFiles={(e: any) => handleUpload(e.target.files)}
        labelText={labelText}
        accept={accept}
      />
    </>
  )
}
