import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useDeleteCategoriaMutation } from '@/redux/api/categoriasApiSlice';
import { toast } from 'react-toastify';
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '../ui/dialog';
import { Button } from '../ui/button';

const ModalBorradoCategorias = ({ location, navigateBack, navigate }) => {
  const { categoriaId } = useParams();

  const titulo = 'Borrar Categoria';

  const [deleteCategoria] = useDeleteCategoriaMutation();

  const onBorrarClick = async () => {
    try {
      await deleteCategoria(categoriaId).unwrap();
      navigate(location.state.backgroundLocation.pathname);
      toast.success('La categoria fue borrada exitosamente.');
    } catch (err) {
      navigate(location.state.backgroundLocation.pathname);
      toast.success('Hubo un error a la hora de borrar la categoria.');
    }
  };

  return (
    <DialogContent closeAction={navigateBack}>
      <DialogHeader>
        <DialogTitle>{titulo}</DialogTitle>
      </DialogHeader>
      <span>
        Estas apunto de borrar esta Categoria. ¿Estas seguro de querer borrarlo?
      </span>
      <DialogFooter className="sm:justify-between">
        <Button variant="secondary" onClick={navigateBack}>
          Cerrar
        </Button>
        <Button variant="destructive" onClick={onBorrarClick}>
          Borrar
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

ModalBorradoCategorias.propTypes = {
  location: PropTypes.object,
  navigate: PropTypes.any,
  navigateBack: PropTypes.func
};

export default ModalBorradoCategorias;
