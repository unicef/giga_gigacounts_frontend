import { Suspense } from 'react';

import { RouterWrapper } from '../../routes/RouterWrapper';
import { routes } from '../../routes/routes';

export const AppWrapper: React.FC = (): JSX.Element => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <RouterWrapper routes={routes} />
    </Suspense>
  );
};
