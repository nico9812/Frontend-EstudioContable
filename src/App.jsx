import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/home";
import { Login } from "./pages/users/login";
import { AuthContextProvider } from "./utils/authContext";
import {PublicRoute} from "./utils/PublicRoutes";
import {PrivateRouteClient, PrivateRouteConta, PrivateRoute} from "./utils/privateRoutes";
import { Logout } from "./pages/users/logout";
import { Clientes } from "./pages/users/clientes";
import { ListarVencimientosconta, ListarVencimientosclien } from "./pages/vencimientos/listarvencimientos";
import { ListarDocumentosconta, ListarDocumentosclien } from "./pages/documentos/documentosconta";
import { Sidebar } from './components/sidebar'
import { ListarProgramasClien,ListarProgramasConta } from "./pages/programas/programas";
import { Error_404 } from "./pages/Errors/404";
import { ListarCategorias } from "./pages/documentos/categorias";

function App() {

  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Sidebar />
        <Routes>
          
          <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="Clientes/" element={<PrivateRouteConta><Clientes /></PrivateRouteConta>} />
          <Route path="Clientes/Vencimientos/:id" element={<PrivateRouteConta><ListarVencimientosconta /></PrivateRouteConta>} />
          <Route path="Clientes/Documentos/:id" element={<PrivateRouteConta><ListarDocumentosconta /></PrivateRouteConta>} />
          <Route path="Clientes/Documentos/:id/categorias/" element={<PrivateRouteConta><ListarCategorias /></PrivateRouteConta>} />
          <Route path="Clientes/Programas/:id" element={<PrivateRouteConta><ListarProgramasConta /></PrivateRouteConta>} />

          <Route path="/Vencimientos/" element={<PrivateRouteClient><ListarVencimientosclien /></PrivateRouteClient>} />
          <Route path="/Documentos/" element={<PrivateRouteClient><ListarDocumentosclien /></PrivateRouteClient>} />
          <Route path="/Programas/" element={<PrivateRouteClient><ListarProgramasClien /></PrivateRouteClient>} />

          <Route path="logout/" element={<PrivateRoute><Logout /></PrivateRoute>} /> 

          <Route path="*" element={<Navigate to="/404" />} />
          <Route path="/404/" element={<Error_404/>} />
        {/* <Route path="/" element={<Navigate to="/" />} /> */}

        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
    
  )
}

export default App
