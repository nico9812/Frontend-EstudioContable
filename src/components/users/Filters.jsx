import ButtonAction from '../common/ButtonAction';
import PropTypes from 'prop-types';
import { FaPlusCircle } from 'react-icons/fa';
import { Input } from '../ui/input';

export const TableHeader = ({ globalFilters, setGlobalFilters, location }) => {
  return (
    <div className="flex flex-row items-center justify-end gap-3">
      <Input
        type="text"
        className="w-lg-25"
        placeholder="Buscar"
        aria-label="Buscador"
        required
        value={globalFilters}
        onChange={e => setGlobalFilters(e.target.value)}
      />
      <ButtonAction
        className="h3 m-0"
        title="Agregar"
        ruta="agregar"
        state={{
          backgroundLocation: location
        }}
        icon={<FaPlusCircle />}
      />
    </div>
  );
};

TableHeader.propTypes = {
  globalFilters: PropTypes.string,
  setGlobalFilters: PropTypes.func,
  location: PropTypes.object
};
