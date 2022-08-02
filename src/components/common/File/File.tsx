import { useMemo, useState } from 'react'
import { deleteAttachment, getAttachment } from 'src/api/attachments'
import { download } from 'src/utils/download'
import { DeleteButton, DownloadButton, FileContainer } from './styles'

interface FileProps {
  id?: string
  type?: string
  url?: string
  name?: string
  allowDelete?: boolean
  onDelete?: () => Promise<void> | void
}

const findType = (url?: string) => {
  const type = url?.split('.').pop()

  if (type) {
    return type
  }

  return 'FILE'
}

const File: React.FC<FileProps> = ({ id, type, url, name, onDelete, allowDelete }: FileProps): JSX.Element => {
  const realType = useMemo(() => type ?? findType(url ?? name), [name, type, url])

  const [loading, setLoading] = useState(false)

  const onDeleteClick = async () => {
    if (id) {
      setLoading(true)
      await deleteAttachment(id)
      await onDelete?.()
      setLoading(false)
    }
  }

  const onDownloadClick = async () => {
    if (id) {
      setLoading(true)
      try {
        const attachment = await getAttachment(id)
        download(attachment.url, attachment.name)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <FileContainer>
      <span className="icon icon-24 icon-file icon-light-blue"></span>
      <small className="file-type">
        <b>{realType}</b>
      </small>
      <DownloadButton className="file-link ellipsis" onClick={onDownloadClick} disabled={loading || id === undefined}>
        {name}
      </DownloadButton>

      {allowDelete && (
        <DeleteButton title="delete" onClick={onDeleteClick} disabled={loading || id === undefined}>
          <span className="icon icon-24 icon-trash icon-red"></span>
        </DeleteButton>
      )}
    </FileContainer>
  )
}

export default File
