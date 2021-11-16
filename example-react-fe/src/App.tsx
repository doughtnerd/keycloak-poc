import { Provider, withInjector } from '@doughtnerd/wrangler-di'
import { KeycloakInstance } from 'keycloak-js';
import keycloak from './keycloak'
import { AppRouter } from './routes';
import { AxiosHttpClient } from './services/AxiosHttpClient';

const providers: Provider[] = [
  {
    provide: 'KEYCLOAK',
    useValue: keycloak,
  },
  {
    provide: 'HTTP_CLIENT',
    useFactory: (authService: KeycloakInstance) => {
      return new AxiosHttpClient('http://localhost:3001', authService)
    },
    deps: ['KEYCLOAK'],
  }
]

export default withInjector(AppRouter, providers);
