import Flex from '../common/Flex';
import ButtonAction from '../common/ButtonAction';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

export const TableHeader = ({ location }) => {
  return (
    <Flex
      direction="row"
      alignItems="center"
      justifyContent="end"
      className="gap-3"
    >
      <ButtonAction
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
  columnFilters: PropTypes.array,
  setColumnFilters: PropTypes.func,
  location: PropTypes.object
};
