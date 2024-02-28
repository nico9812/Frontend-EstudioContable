import { Input } from 'reactstrap';
import Flex from '../common/Flex';
import BtnAccion from '../common/BtnAction';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

export const Filters = () => {
  return (
    <Flex
      direction="row"
      alignItems="center"
      justifyContent="end"
      className="gap-3"
    >
      <Input
        className="w-lg-25"
        placeholder="Buscar"
        aria-label="Buscador"
        aria-describedby="basic-addon2"
        required
      />
      <BtnAccion
        variant="primary h3 m-0"
        title="Agregar"
        ruta="add"
        icon={faPlusCircle}
      />
    </Flex>
  );
};
