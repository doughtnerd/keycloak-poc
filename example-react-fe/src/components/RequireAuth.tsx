import { useKeycloak } from "@react-keycloak/web";
import { Navigate } from "react-router-dom";

export const RequireAuth = ({ children }: any) => {
  const {keycloak} = useKeycloak();
  
  if(keycloak && keycloak.authenticated) {
    return children
  }

  return <Navigate to="/" />
}