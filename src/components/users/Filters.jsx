import { Input } from 'reactstrap';
import Flex from '../common/Flex';
import IconAction from '../common/IconAction';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

export const TableHeader = ({ globalFilters, setGlobalFilters, location }) => {
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
        value={globalFilters}
        onChange={e => setGlobalFilters(e.target.value)}
      />
      <IconAction
        className="text-primary h3 m-0"
        title="Agregar"
        ruta="agregar"
        state={{
          backgroundLocation: location
        }}
        icon={faPlusCircle}
      />
    </Flex>
  );
};

TableHeader.propTypes = {
  globalFilters: PropTypes.string,
  setGlobalFilters: PropTypes.func,
  location: PropTypes.object
};
