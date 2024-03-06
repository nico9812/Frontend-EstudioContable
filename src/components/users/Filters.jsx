import ButtonAction from '../common/ButtonAction';
import PropTypes from 'prop-types';
import { FaPlusCircle } from 'react-icons/fa';
import { Input } from '../ui/input';

export const TableHeader = ({ globalFilters, setGlobalFilters, location }) => {
  return (
    <div className="flex items-center py-4 gap-2">
      <Input
        type="text"
        className="w-full max-w-sm"
        placeholder="Buscar"
        aria-label="Buscador"
        required
        value={globalFilters}
        onChange={e => setGlobalFilters(e.target.value)}
      />
      <ButtonAction
        className="ml-auto"
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
