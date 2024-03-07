import { Input } from 'reactstrap';
import Flex from '../common/Flex';
import ButtonAction from '../common/ButtonAction';
import PropTypes from 'prop-types';
import { FaPlusCircle } from "react-icons/fa";

export const Filters = ({
  globalFilter,
  setGlobalFilter,
  location,
  group
}) => {
  return (
    <Flex
      direction="row"
      alignItems="center"
      justifyContent="end"
      className="gap-3"
    >
      <Input
        type="text"
        className="w-lg-25"
        placeholder="Buscar"
        aria-label="Buscador"
        aria-describedby="basic-addon2"
        required
        value={globalFilter}
        onChange={e => setGlobalFilter(e.target.value)}
      />
      {group === 1 && (
        <ButtonAction
          className="text-primary h3 m-0"
          title="Agregar"
          ruta="agregar"
          state={{
            backgroundLocation: location
          }}
          icon={FaPlusCircle}
        />
      )}
    </Flex>
  );
};

Filters.propTypes = {
  globalFilter: PropTypes.string,
  group: PropTypes.any,
  location: PropTypes.object,
  setGlobalFilter: PropTypes.func
};
