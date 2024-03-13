import ButtonAction from '../common/ButtonAction';
import { FaPlusCircle } from 'react-icons/fa';
import { Input } from '../ui/input';
import { Link } from 'react-router-dom';

export const Filters = ({
  globalFilters,
  setGlobalFilters,
  location,
  group
}) => {
  return (
    <div className="flex items-center justify-end py-4 gap-2">
      <Input
        type="text"
        className="w-full max-w-sm"
        placeholder="Buscar"
        aria-label="Buscador"
        required
        value={globalFilters}
        onChange={e => {
          return setGlobalFilters(e.target.value);
        }}
      />
      {group === 1 && (
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
      )}
    </div>
  );
};
