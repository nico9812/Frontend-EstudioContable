
import axiosService from "../services/axiosService";

export const ListarDoc = (id) => {
  return axiosService.get(`/documentoscli/${id}/`);
};

export const ListarCat = () => {
  return axiosService.get('/categorias/');
};

export const GuardarCat = (cat) => {
  return axiosService.post('/categorias/', cat);
};

export const ModificarCat = (id, cat) => {
  return axiosService.patch(`/categorias/${id}/`, cat);
};

export const DeleteCat = (id) => {
  return axiosService.delete(`/categorias/${id}/`);
};

export const AbrirDocumento = (id) => {
  return axiosService.get(`/media/${id}/`, {
    responseType: 'arraybuffer'
  });
};

export const DeleteDoc = (id) => {
  return axiosService.delete(`/documentos/${id}/`);
};

export const FiltrarDoc = (categoria, id) => {
  return axiosService.get(`/documentosFiltrar/${categoria}/${id}/`);
};

export const GuardarDocumento = (doc) => {
  return axiosService.post('/documentos/', doc, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
