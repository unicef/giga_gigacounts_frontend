import { FileUploaderItem } from '@carbon/react'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'
import { List } from '../list'
import { Typography } from '../typography'

const AttachmentList = ({
  attachments,
  onDelete
}: {
  attachments: { name: string; status: 'uploading' | 'edit' | 'complete' }[]
  onDelete?: (name: string) => void
}) => {
  const { spacing } = useTheme()
  const { translate } = useLocales()

  return (
    <List
      ItemComponent={FileUploaderItem as (props: JSX.IntrinsicAttributes) => JSX.Element}
      getItemComponentProps={(item) => ({
        uuid: item.name,
        style: { maxWidth: '100%' },
        key: item.name,
        name: item.name,
        status: item.status,
        onDelete: (_: any, { uuid }: { uuid: string }) => {
          if (onDelete) onDelete(uuid)
        }
      })}
      items={attachments}
      itemsPerRow={3}
      columnGap={spacing.sm}
      rowGap={spacing.sm}
      noItemsComponent={
        <Typography as="span" variant="disabled">
          {translate('no_attachments_added')}
        </Typography>
      }
    />
  )
}

export default AttachmentList
