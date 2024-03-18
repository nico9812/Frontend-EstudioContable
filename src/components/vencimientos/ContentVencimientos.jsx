import PropTypes from 'prop-types';
import { useParams, useSearchParams } from 'react-router-dom';

import { useGetVencimientosQuery } from '@/redux/api/vencimientosApiSlice';

import { Calendario } from '@/components/vencimientos/Calendario';
import { QueryHooks } from '@/hooks/QueryHooks';

const ContentCalendario = ({ userId, group }) => {
  let { userId: idParams } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  const monthFilter = searchParams.get('month');
  const yearFilter = searchParams.get('year');

  if (userId === undefined) {
    userId = idParams;
  }

  const params = {
    month: monthFilter,
    year: yearFilter,
    userId
  };

  return (
    <QueryHooks
      useQuery={useGetVencimientosQuery({ ...params })}
      childrenObjects={renderArray => ({
        vencimientos: renderArray,
        location: location
      })}
    >
      {({ vencimientos, refetch }) => (
        <Calendario
          vencimientos={vencimientos}
          group={group}
          refetch={refetch}
          params={params}
          setSearchParams={setSearchParams}
          searchParams={searchParams}
        />
      )}
    </QueryHooks>
  );
};

ContentCalendario.propTypes = {
  group: PropTypes.any,
  userId: PropTypes.any
};

export default ContentCalendario;
