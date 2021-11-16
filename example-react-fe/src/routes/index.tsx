import { useKeycloak } from '@react-keycloak/web'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import { RequireAuth } from '../components/RequireAuth'
import CustomerDashboardPage from '../pages/CustomerDashboard'
import FraudDashboard from '../pages/FraudDashboard'
import HomePage from '../pages/Home'
import LoginPage from '../pages/Login'

export const AppRouter = () => {
  const { initialized } = useKeycloak()
  
  if (!initialized) {
    return <div>Loading...</div>
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" state={{from:'/'}}/>} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/dashboard" element={
          <RequireAuth>
            <CustomerDashboardPage />
          </RequireAuth>
        } />
        <Route path="/fraud">
          <Route path="dashboard" element={
            <FraudDashboard />
          } />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  )
}
