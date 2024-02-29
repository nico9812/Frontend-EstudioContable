import { Input } from 'reactstrap';
import Flex from '../common/Flex';
import BtnAccion from '../common/BtnAction';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

export const TableHeader = ({ columnFilters, setColumnFilters, location }) => {
  const taksName = columnFilters.find(f => f.id === 'username')?.value || '';

  const onFilterChange = (id, value) => {
    setColumnFilters(prev =>
      prev
        .filter(f => f.id !== id)
        .concat({
          id,
          value
        })
    );
  };
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
        value={taksName}
        onChange={e => onFilterChange('username', e.target.value)}
      />
      <BtnAccion
        variant="primary h3 m-0"
        title="Agregar"
        ruta="add"
        state={{
          backgroundLocation: location
        }}
        icon={faPlusCircle}
      />
    </Flex>
  );
};

TableHeader.propTypes = {
  columnFilters: PropTypes.array,
  setColumnFilters: PropTypes.func,
  location: PropTypes.object
};
