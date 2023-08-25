import ErrorPage from './ErrorPage'

export default function Page500() {
  return (
    <ErrorPage
      title="page_error.500.title"
      code={500}
      content="page_error.500.content"
      helmet="500 Internal Server Error"
    />
  )
}
