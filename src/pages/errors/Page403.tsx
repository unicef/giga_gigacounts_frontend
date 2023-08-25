import ErrorPage from './ErrorPage'

export default function Page403() {
  return (
    <ErrorPage
      title="page_error.403.title"
      code={403}
      content="page_error.403.content"
      helmet="403 Forbidden"
    />
  )
}
