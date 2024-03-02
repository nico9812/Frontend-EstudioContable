import { useSelector } from 'react-redux';
import { selectCurrentGroup } from '@/redux/reducer/authReducerSlice';

import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import RequireAuth from '@/routes/PrivateRoutes';

import LoginLayout from '@/layouts/LoginLayout';
import ContadorLayout from '@/layouts/ContadorLayout';
import ClienteLayout from '@/layouts/ClienteLayout';

import Error404 from '@/pages/errors/404';

import { Login } from '@/pages/auth/Login';
import { Logout } from '@/pages/auth/Logout';
import { Clientes } from '@/pages/users/Clientes';
import DashboardLayout from '@/layouts/DashboardLayout';
import ErrorLayout from '@/layouts/ErrorLayout';
import { ModalUsable } from '@/components/common/ModalUsable';
import ModalFormUser from '@/components/users/ModalFormUser';
import { Vencimientos } from '@/pages/vencimientos/Vencimientos';
import ModalFormVencimiento from '@/components/vencimientos/ModalFormVencimiento';
import VerMasVencimientos from '@/components/vencimientos/VerMasVencimientos';
import ModalBorradoVencimiento from '@/components/vencimientos/ModalBorradoVencimiento';
import { Documentos } from '@/pages/documentos/Documentos';
import ModalFormDocumentos from '@/components/documentos/ModalFormDocumentos';
import ModalBorradoDocumentos from '@/components/documentos/ModalBorradoDocumentos';
import { Categorias } from '@/pages/categorias/Categorias';
import ModalFormCategorias from '@/components/categorias/ModalFormCategorias';
import ModalBorradoCategorias from '@/components/categorias/ModalBorradoCategorias';
import { Programas } from '@/pages/programas/Programas';
import ModalFormProgramas from '@/components/programas/ModalFormProgramas';
import ModalBorradoProgramas from '@/components/programas/ModalBorradoProgramas';

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
        {/* <Route path="/*" element={<Navigate to="/404" replace />} /> */}
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
              <Route path="clientes" element={<Clientes />} />
              <Route path="documentos/:userId" element={<Documentos />} />
              <Route path="vencimientos/:userId" element={<Vencimientos />} />
              <Route path="programas/:userId" element={<Programas />} />
              <Route path="categorias" element={<Categorias />} />
            </Route>
            {/* Cliente */}
            <Route
              path="cliente"
              element={<ClienteLayout grupo={currentGroup} />}
            >
              <Route index element={<Vencimientos />} />
              <Route path="vencimientos" element={<Vencimientos />} />
              <Route path="documentos" element={<Documentos />} />
              <Route path="programas" element={<Programas />} />
            </Route>
          </Route>
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route
            path="/dashboard/contador/agregar"
            element={
              <ModalUsable>
                <ModalFormUser />
              </ModalUsable>
            }
          />
          <Route
            path="/dashboard/contador/clientes/editar/:userId"
            element={
              <ModalUsable>
                <ModalFormUser />
              </ModalUsable>
            }
          />
          <Route
            path="/dashboard/contador/vencimientos/:userId/agregar"
            element={
              <ModalUsable>
                <ModalFormVencimiento />
              </ModalUsable>
            }
          />
          <Route
            path="/dashboard/contador/vencimientos/:userId/editar/:vencimientoId"
            element={
              <ModalUsable>
                <ModalFormVencimiento />
              </ModalUsable>
            }
          />
          <Route
            path="/dashboard/contador/vencimientos/:userId/borrar/:vencimientoId"
            element={
              <ModalUsable>
                <ModalBorradoVencimiento />
              </ModalUsable>
            }
          />
          <Route
            path="/dashboard/contador/vencimientos/:userId/mostrar-mas"
            element={
              <ModalUsable>
                <VerMasVencimientos />
              </ModalUsable>
            }
          />
          <Route
            path="/dashboard/contador/documentos/:userId/agregar"
            element={
              <ModalUsable>
                <ModalFormDocumentos />
              </ModalUsable>
            }
          />
          <Route
            path="/dashboard/contador/documentos/:userId/borrar/:documentoId"
            element={
              <ModalUsable>
                <ModalBorradoDocumentos />
              </ModalUsable>
            }
          />
          <Route
            path="/dashboard/contador/categorias/agregar"
            element={
              <ModalUsable>
                <ModalFormCategorias />
              </ModalUsable>
            }
          />
          <Route
            path="/dashboard/contador/categorias/:categoriaId/editar"
            element={
              <ModalUsable>
                <ModalFormCategorias />
              </ModalUsable>
            }
          />
          <Route
            path="/dashboard/contador/categorias/:categoriaId/borrar"
            element={
              <ModalUsable>
                <ModalBorradoCategorias />
              </ModalUsable>
            }
          />
          <Route
            path="/dashboard/contador/programas/:userId/agregar"
            element={
              <ModalUsable>
                <ModalFormProgramas />
              </ModalUsable>
            }
          />
          <Route
            path="/dashboard/contador/programas/:userId/editar/:programaId"
            element={
              <ModalUsable>
                <ModalFormProgramas />
              </ModalUsable>
            }
          />
          <Route
            path="/dashboard/contador/programas/:userId/borrar/:programaId"
            element={
              <ModalUsable>
                <ModalBorradoProgramas />
              </ModalUsable>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default ReactRouting;
