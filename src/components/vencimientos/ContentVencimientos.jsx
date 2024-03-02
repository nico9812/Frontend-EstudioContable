import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import { useGetVencimientosQuery } from '@/redux/api/vencimientosApiSlice';

import { Calendario } from '@/components/vencimientos/Calendario';
import { QueryHooks } from '@/hooks/QueryHooks';

const ContentCalendario = ({ userId, group }) => {
  let { userId: idParams } = useParams();

  if (userId === undefined) {
    userId = idParams;
  }

  return (
    <QueryHooks
      useQuery={useGetVencimientosQuery(userId)}
      childrenObjects={renderArray => ({
        vencimientos: renderArray,
        location: location
      })}
    >
      {({ vencimientos }) => (
        <Calendario vencimientos={vencimientos} group={group} />
      )}
    </QueryHooks>
  );
};

ContentCalendario.propTypes = {
  group: PropTypes.any,
  userId: PropTypes.any
};

export default ContentCalendario;
