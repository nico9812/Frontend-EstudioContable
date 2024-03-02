import Flex from '../common/Flex';
import IconAction from '../common/IconAction';
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
  columnFilters: PropTypes.array,
  setColumnFilters: PropTypes.func,
  location: PropTypes.object
};
