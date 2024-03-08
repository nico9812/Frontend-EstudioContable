import ButtonAction from '../common/ButtonAction';
import PropTypes from 'prop-types';
import { FaPlusCircle } from 'react-icons/fa';
import { Input } from '../ui/input';
import { Link } from 'react-router-dom';

export const Filters = ({ globalFilters, setGlobalFilters, location }) => {
  return (
    <div className="flex items-center justify-end py-4 gap-2">
      <Input
        type="text"
        className="w-full max-w-sm"
        placeholder="Buscar"
        aria-label="Buscador"
        required
        value={globalFilters}
        onChange={e => setGlobalFilters(e.target.value)}
      />
      <Link
        to="agregar"
        state={{
          backgroundLocation: location
        }}
      >
        <ButtonAction
          className="ml-auto"
          title="Agregar"
          icon={<FaPlusCircle />}
        />
      </Link>
    </div>
  );
};

Filters.propTypes = {
  globalFilters: PropTypes.string,
  setGlobalFilters: PropTypes.func,
  location: PropTypes.object
};
