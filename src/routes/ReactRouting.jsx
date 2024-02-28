import { useSelector } from 'react-redux';
import { selectCurrentGroup } from '@/redux/reducer/authReducerSlice';

import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import RequireAuth from '@/routes/PrivateRoutes';

import LoginLayout from '@/layouts/LoginLayout';
import ContadorLayout from '@/layouts/ContadorLayout';
import ClienteLayout from '@/layouts/ClienteLayout';

import Error404 from '@/pages/Errors/404';

import { Login } from '@/pages/auth/Login';
import { Logout } from '@/pages/auth/Logout';
import { Clientes } from '@/pages/users/Clientes';
import DashboardLayout from '@/layouts/DashboardLayout';
import ErrorLayout from '@/layouts/ErrorLayout';
import { ModalUsable } from '@/components/common/ModalUsable';
import ModalFormUser from '@/components/users/ModalFormUser';
/* import { ListarCategorias } from '@/pages/documentos/categorias'; */

/* import {
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
} from '@/pages/programas/programas'; */

function ReactRouting() {
  const location = useLocation();
  const background = location.state && location.state.backgroundLocation;

  const currentGroup = useSelector(selectCurrentGroup);

  function Redireccion() {
    if (currentGroup === 1) {
      return <Navigate to="contador" replace />;
    } else if (currentGroup === 2) {
      return <Navigate to="cliente" replace />;
    }
  }

  return (
    <>
      <Routes location={background || location}>
        <Route path="/*" element={<Navigate to="/404" replace />} />
        {/* Rutas de Errores */}
        <Route element={<ErrorLayout />}>
          <Route path="/404/" element={<Error404 />} />
        </Route>

        <Route exact path="/" element={<Navigate to="login" replace />} />

        {/* Rutas de login */}
        <Route path="login" element={<LoginLayout />}>
          <Route index element={<Login />} />
        </Route>
        <Route path="logout" element={<RequireAuth />}>
          <Route index element={<Logout />} />
        </Route>

        {/* Rutas protegidas */}
        <Route path="dashboard" element={<RequireAuth />}>
          <Route element={<DashboardLayout />}>
            {/* Redirección para usuarios */}
            <Route index element={<Redireccion />} />
            {/* Contador */}
            <Route
              path="contador"
              element={<ContadorLayout grupo={currentGroup} />}
            >
              <Route index element={<Clientes />} />
            </Route>
            {/* Cliente */}
            <Route
              path="cliente"
              element={<ClienteLayout grupo={currentGroup} />}
            >
              <Route index element={<>Hola</>} />
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
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route
            path="/dashboard/contador/add"
            element={
              <ModalUsable>
                <ModalFormUser />
              </ModalUsable>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default ReactRouting;
