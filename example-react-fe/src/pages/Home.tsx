import { withProviders } from '@doughtnerd/wrangler-di';
import { Navigate } from 'react-router';
import { Header } from '../components/Header';
import { MainBackground } from '../components/MainBackground';
import { TextButton } from '../components/TextButton';

const HomePage = ({ deps: [keycloak]}: any) => {
  if(keycloak.authenticated) {
    return <Navigate to="/dashboard" />
  }

  return (
    <>
      <MainBackground />
      <Header actionButton={<TextButton color="#34D632" onClick={() => keycloak.login()}>Login</TextButton>}/>
      <div style={{width: "33%", margin:'auto', paddingTop: 64, color: 'white', fontSize: '1.25rem', textAlign: 'center'}}>
        <h1>Welcome to Wealth Bank</h1>
        <p>Click login to continue to your account</p>
      </div>

    </>
    
  )
}

export default withProviders(HomePage, ['KEYCLOAK'])