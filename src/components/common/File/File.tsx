import { FileContainer } from './styles'

interface FileProps {
  fileType?: string
  fileLink?: string
  fileName?: string
  allowDelete?: boolean
}

const File: React.FC<FileProps> = ({
  fileType = 'TYPE',
  fileLink,
  fileName,
  allowDelete = true,
}: FileProps): JSX.Element => {
  return (
    <FileContainer>
      <span className="icon icon-24 icon-file icon-light-blue"></span>
      <small className="file-type">
        <b>{fileType}</b>
      </small>
      <a href={fileLink} className="file-link ellipsis" download>
        {fileName}
      </a>

      {allowDelete && <span className="icon icon-24 icon-trash icon-red"></span>}
    </FileContainer>
  )
}

export default File
