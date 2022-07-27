import { FileContainer } from './styles'

interface FileProps {
  type?: string
  url?: string
  name?: string
  allowDelete?: boolean
}

const File: React.FC<FileProps> = ({ type = 'TYPE', url, name, allowDelete = true }: FileProps): JSX.Element => {
  return (
    <FileContainer>
      <span className="icon icon-24 icon-file icon-light-blue"></span>
      <small className="file-type">
        <b>{type}</b>
      </small>
      <a href={url} className="file-link ellipsis" download>
        {name}
      </a>

      {allowDelete && <span className="icon icon-24 icon-trash icon-red"></span>}
    </FileContainer>
  )
}

export default File
