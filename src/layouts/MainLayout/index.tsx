import { Outlet } from "react-router-dom";
import { AuthProvider } from "../../contexts/authContext";
import Header from "../../components/Header";
// import Header from "../../components/Header/header";

function MainLayout() {
  return (
    <AuthProvider>
      <Header />
      <Outlet />
    </AuthProvider>
  )
}

export default MainLayout