import axiosService from "../services/axiosService";

export const ListarPro = (id) => {
  return axiosService.get(`/programa/${id}/`);
};

export const BuscarPro = (search, id) => {
  return axiosService.get(`/ProSearch/${search}/${id}/`);
};

export const GuardarProgramas = (Programas) => {
  return axiosService.post('/programas/', Programas);
};

export const EditarProgramas = (id, Programa) => {
  return axiosService.patch(`/programas/${id}/`, Programa);
};

export const DeletePrograma = (id) => {
  return axiosService.delete(`/programas/${id}/`);
};


