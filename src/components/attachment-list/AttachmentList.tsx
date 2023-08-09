import { FileUploaderItem } from '@carbon/react'
import { useTheme } from 'src/theme'
import { divideIntoChunks } from 'src/utils/arrays'
import { Stack } from '../stack'

const AttachmentList = ({
  attachments,
  status,
  onDelete
}: {
  attachments: { name: string }[]
  status?: 'uploading' | 'edit' | 'complete'
  onDelete?: (name: string) => void
}) => {
  const { spacing } = useTheme()

  const dividedAttachments = divideIntoChunks(attachments, 3)

  return (
    <>
      {attachments.length > 0 && (
        <Stack orientation="vertical" gap={spacing.sm}>
          {dividedAttachments.map((attachmentArray) => (
            <Stack orientation="horizontal" gap={spacing.sm}>
              {attachmentArray.map((file) => (
                <FileUploaderItem
                  uuid={file.name}
                  style={{ maxWidth: '100%' }}
                  key={file.name}
                  name={file.name}
                  status={status}
                  onDelete={(_: any, { uuid }: { uuid: string }) => {
                    if (onDelete) onDelete(uuid)
                  }}
                />
              ))}
            </Stack>
          ))}
        </Stack>
      )}
    </>
  )
}

export default AttachmentList
