import { ChangeEvent, useRef, useState } from 'react'

import { IFileUpload } from 'src/types/general'
import { Button, UploadButtonWrapper } from './styles'

interface UploadButtonProps {
  disabled?: boolean
  onUpload?: (file: IFileUpload) => Promise<void> | void
  onError?: (error: Error) => void
  typeId: string | null
  type: string
}

const UploadButton = ({ onUpload, onError, type, typeId = null, disabled = false }: UploadButtonProps) => {
  const [loading, setLoading] = useState(false)
  const inputFileRef = useRef<HTMLInputElement>(null)

  const onButtonClick = () => {
    inputFileRef.current?.click()
  }

  const onFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onUpload) {
      try {
        const files = e.currentTarget.files

        if (files) {
          const reader = new FileReader()
          reader.readAsDataURL(files[0])

          reader.onload = async () => {
            const fileUpload: IFileUpload = {
              name: files[0].name,
              typeId,
              type,
              file: reader.result,
            }

            setLoading(true)

            await onUpload(fileUpload)

            setLoading(false)

            if (inputFileRef.current) {
              inputFileRef.current.value = ''
            }
          }

          reader.onerror = () => {
            onError?.(new Error("can't read the file"))
          }
        }
      } catch (error) {
        onError?.(error as Error)
      }
    }
  }

  return (
    <UploadButtonWrapper>
      <input
        ref={inputFileRef}
        id="fileUpload"
        type="file"
        accept="application/pdf"
        onChange={onFileInputChange}
        disabled={disabled}
      />
      <Button onClick={onButtonClick} disabled={disabled || loading}>
        Upload Files{loading && '…'}
      </Button>
    </UploadButtonWrapper>
  )
}

export default UploadButton
