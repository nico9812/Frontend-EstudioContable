import { React } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login/Login';

import Layout from './components/layouts/Layout';
import LoginLayout from './components/layouts/LoginLayout';

import { Error_404 } from './pages/Errors/404';
import { ListarCategorias } from './pages/documentos/categorias';

import { Logout } from './pages/users/logout';

import { Clientes } from './pages/users/clientes';

import {
  ListarVencimientosconta,
  ListarVencimientosclien,
} from './pages/vencimientos/listarvencimientos';

import {
  ListarDocumentosconta,
  ListarDocumentosclien,
} from './pages/documentos/documentosconta';

import { Sidebar } from './components/SideBar';
import {
  ListarProgramasClien,
  ListarProgramasConta,
} from './pages/programas/programas';

import RequireAuth from '@/routes/PrivateRoutes';

function App() {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/404" />} />
      <Route path="/404/" element={<Error_404 />} />

      <Route path="/" element={<LoginLayout />}>
        <Route index element={<Login />} />

        <Route path="main" element={<RequireAuth />}>
          <Route index element={<h1>HGola</h1>} />
        </Route>

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
