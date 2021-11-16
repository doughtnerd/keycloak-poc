import { withProviders } from '@doughtnerd/wrangler-di'
import { KeycloakInstance } from 'keycloak-js'
import { useEffect, useState } from 'react'
import { Card } from '../components/Card'
import { FlexRow } from '../components/FlexRow'
import { Header } from '../components/Header'
import { MainBackground } from '../components/MainBackground'
import { TextButton } from '../components/TextButton'
import { TransactionList } from '../components/TransactionList'
import { IHttpClient } from '../services/http-client.interface'

type DashboardPageProps = {
  deps: [IHttpClient, KeycloakInstance]
}

const CustomerDashboardPage = ({deps: [httpService, keycloak]}: DashboardPageProps) => {
  const [transactions, setTransactions] = useState<any[]>([])

  useEffect(() => {
    httpService.get<any[]>('/transactions').then((response: any[]) => {
      setTransactions(response)
    })
  }, [httpService])

  return (
    <>
      <MainBackground />
      <Header actionButton={<TextButton color="#34D632" onClick={() => keycloak.logout()}>Logout</TextButton>} />
      <div style={{width: "66%", margin:'auto', paddingTop: 64, color: 'white', fontSize: '1.25rem'}}>
        <Card>
          <FlexRow justify="space-between">
            <h2>Your Transactions</h2>
            <h4>Balance: 3.2M</h4>
          </FlexRow>
          <TransactionList transactions={transactions} />
        </Card>
      </div>
    </>
  )
}


export default withProviders(CustomerDashboardPage, ['HTTP_CLIENT', 'KEYCLOAK'])