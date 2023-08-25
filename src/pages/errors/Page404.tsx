import ErrorPage from './ErrorPage'

export default function Page404() {
  return (
    <ErrorPage
      title="page_error.404.title"
      code={404}
      content="page_error.404.content"
      helmet="404 Page Not Found"
    />
  )
}
