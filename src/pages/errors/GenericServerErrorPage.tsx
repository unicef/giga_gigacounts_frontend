import ErrorPage from './ErrorPage'

export default function GenericServerErrorPage() {
  return (
    <ErrorPage
      title="page_error.generic.title"
      code="constant_status.web_transaction.ERROR"
      content="page_error.generic.content"
      helmet="Error"
    />
  )
}
