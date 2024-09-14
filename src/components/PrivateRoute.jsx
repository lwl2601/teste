import { Route, Navigate } from "react-router-dom";

// Componente de rota privada
function PrivateRoute({ element: Element, ...rest }) {
  const isAuthenticated = !!localStorage.getItem("authToken"); // Substitua isso pela sua lógica de autenticação

  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Element /> : <Navigate to="/login" />}
    />
  );
}

export default PrivateRoute;
