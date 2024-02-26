import axiosService from '../services/axiosService';

const vencimientosApi = axiosService;

export const ListarVen = (id) => {
  return vencimientosApi.get(`/vencimiento/${id}/`);
};

export const GuardarVencimiento = (vencimiento) => {
  return vencimientosApi.post('/vencimientos/', vencimiento);
};
export const ModificarVencimiento = (id, vencimiento) => {
  return vencimientosApi.patch(`/vencimientos/${id}/`, vencimiento);
};

export const DeleteVencimiento = (id) => {
  return vencimientosApi.delete(`/vencimientos/${id}/`);
};


