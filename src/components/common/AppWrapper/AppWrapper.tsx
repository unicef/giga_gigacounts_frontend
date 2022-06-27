import { Suspense } from 'react'

import { RouterWrapper } from 'src/routes/RouterWrapper'
import { routes } from 'src/routes/routes'

export const AppWrapper: React.FC = (): JSX.Element => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <RouterWrapper routes={routes} />
    </Suspense>
  )
}
