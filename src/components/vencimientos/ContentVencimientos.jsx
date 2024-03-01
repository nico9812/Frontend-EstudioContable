import { useParams } from 'react-router-dom';

import { useGetVencimientosQuery } from '@/redux/api/vencimientosApiSlice';

import { Calendario } from '@/components/vencimientos/Calendario';
import { extractRawData } from '@/helpers';
import { QueryHooks } from '@/hooks/QueryHooks';

const ContentCalendario = () => {
  const { userId } = useParams();

  return (
    <QueryHooks
      useQuery={useGetVencimientosQuery(userId)}
      childrenObjects={renderArray => ({
        vencimientos: renderArray,
        location: location
      })}
    >
      {({ vencimientos }) => <Calendario vencimientos={vencimientos} />}
    </QueryHooks>
  );
};

export default ContentCalendario;
