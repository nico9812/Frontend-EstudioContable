import axiosService from "../services/axiosService";

export const LogearUsuario = (user) => axiosService.post('/userLogin/', user);

export const LogoutUser = () => {
  return axiosService.get('/logout/');
};

export const RegistrarUsuario = (user) => {
  return axiosService.post('/userRegister/', user);
};

export const ModificarUsuario = (id, user) => {
  return axiosService.patch(`/users/${id}/`, user);
};

export const DeleteUsuario = (id) => {
  return axiosService.delete(`/users/${id}/`);
};

export const ObtenerUsuario = (id) => {
  return axiosService.get(`/users/${id}/`);
};

export const BuscarUsuario = (search) => {
  return axiosService.get(`/UserSearch/${search}/`);
};

export const ObtenerToken = (user) => axiosService.post('/loginApiToken/', user);

export const ListarUsuarios = () => {
  return axiosService.get('/users/');
};

