import { Login } from '@/pages/login/Login';
import { Navigate, Route, Routes } from 'react-router-dom';

import LoginLayout from '@/layouts/LoginLayout';

import { Home } from '@/pages/home/Home';
import RequireAuth from '@/routes/PrivateRoutes';

import { Error_404 } from '@/pages/Errors/404';
import { ListarCategorias } from '@/pages/documentos/categorias';
import { Logout } from '@/pages/users/Logout';

import { Clientes } from '@/pages/users/clientes';

import {
  ListarVencimientosclien,
  ListarVencimientosconta
} from '@/pages/vencimientos/listarvencimientos';

import {
  ListarDocumentosclien,
  ListarDocumentosconta
} from '@/pages/documentos/documentosconta';

import {
  ListarProgramasClien,
  ListarProgramasConta
} from '@/pages/programas/programas';

function App() {
  return (
    <Routes>
      <Route path="/*" element={<Navigate to="/404" />} />
      <Route path="/404/" element={<Error_404 />} />

      <Route exact path="/" element={<Navigate to="login" replace />} />

      <Route path="login" element={<LoginLayout />}>
        <Route index element={<Login />} />
      </Route>
      <Route path="logout" element={<Logout />} />
      <Route path="dashboard" element={<RequireAuth />}>
        <Route index element={<Home />} />
        {/* <Route path="main" element={<RequireAuth />}>
          <Route path="contador/clientes" element={<ContadorLayout />}>
            <Route index element={<Clientes />} />
            <Route
              path="clientes/vencimientos/:id"
              element={<ListarVencimientosconta />}
            />
            <Route
              path="clientes/documentos/:id"
              element={<ListarDocumentosconta />}
            />
            <Route
              path="clientes/documentos/:id/categorias/"
              element={<ListarCategorias />}
            />
            <Route
              path="clientes/programas/:id"
              element={<ListarProgramasConta />}
            />
          </Route>

          <Route
            path="/vencimientos/"
            element={
              <PrivateRouteClient>
                <ListarVencimientosclien />
              </PrivateRouteClient>
            }
          />
          <Route
            path="/documentos/"
            element={
              <PrivateRouteClient>
                <ListarDocumentosclien />
              </PrivateRouteClient>
            }
          />
          <Route
            path="/programas/"
            element={
              <PrivateRouteClient>
                <ListarProgramasClien />
              </PrivateRouteClient>
            }
          />

          <Route
            path="logout/"
            element={
              <PrivateRoute>
                <Logout />
              </PrivateRoute>
            }
          />
        </Route> */}
      </Route>
    </Routes>
  );
}

export default App;
