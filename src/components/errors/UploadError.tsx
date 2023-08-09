import { Translation } from 'src/@types'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'

export default function UploadError({ message }: { message: Translation | '' }) {
  const { translate } = useLocales()
  const { palette } = useTheme()
  return (
    <h5 style={{ color: palette.error.main }}>
      {message !== '' && `${translate('upload_error')}: ${translate(message)}`}
    </h5>
  )
}
