import {
  // @ts-ignore
  FileUploaderItem
} from '@carbon/react'

const AttachmentList = ({
  attachments,
  status,
  onDelete
}: {
  attachments: { name: string }[]
  status?: 'uploading' | 'edit' | 'complete'
  onDelete?: (name: string) => void
}) => (
  <>
    {attachments.length > 0 &&
      attachments.map((file) => (
        <FileUploaderItem
          style={{ maxWidth: '100%' }}
          key={file.name}
          name={file.name}
          status={status}
          onDelete={() => {
            if (onDelete) onDelete(file.name)
          }}
        />
      ))}
  </>
)

export default AttachmentList
