import { useParams } from 'react-router-dom';

import { useGetVencimientosQuery } from '@/redux/api/vencimientosApiSlice';

import { Calendario } from '@/components/vencimientos/Calendario';
import { extractRawData } from '@/helpers';

const ContentCalendario = () => {
  const { id: userId } = useParams();

  const {
    data: vencimientos,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetVencimientosQuery(userId);

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = <p>{error}</p>;
  } else if (isSuccess) {
    const renderedVencimientos = extractRawData(vencimientos);

    content = <Calendario vencimientos={renderedVencimientos} />;
  }
  return content;
};

export default ContentCalendario;
