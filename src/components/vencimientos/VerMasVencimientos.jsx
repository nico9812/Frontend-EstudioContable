import { useGetVencimientosQuery } from '@/redux/api/vencimientosApiSlice';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { LoadingIndicator } from '../common/LoadingIndicator';
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '../ui/dialog';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import classNames from 'classnames';

const VerMasVencimientos = ({ location, navigateBack }) => {
  const { userId } = useParams();

  const diaLocation = location?.state?.day;

  const splitDia = diaLocation.split('-');
  const month = splitDia[1];
  const year = splitDia[0];

  const nombreDia = new Date(diaLocation).toLocaleDateString('es-AR', {
    timeZone: 'UTC'
  });

  const titulo = `Día: ${nombreDia}`;

  const { vencimientos, isLoading } = useGetVencimientosQuery(
    { userId, month, year },
    {
      selectFromResult: ({ data, isLoading, isSuccess }) => {
        const entities = data?.entities;
        const extractedData = [];

        if (entities !== undefined) {
          for (const value of Object.values(entities)) {
            if (value.fecha === diaLocation) {
              extractedData.push(value);
            }
          }
        }

        return {
          vencimientos: extractedData,
          isLoading,
          isSuccess
        };
      }
    }
  );

  return (
    <DialogContent closeAction={navigateBack}>
      <DialogHeader>
        <DialogTitle id="contained-modal-title-vcenter">{titulo}</DialogTitle>
      </DialogHeader>
      <div className="flex w-full justify-center">
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <ScrollArea className="w-4/5 h-full text-center">
            <div className="p-4">
              <span className="text-sm font-medium"> Vencimientos </span>
              <div className="flex flex-col gap-1 mt-2">
                {vencimientos !== undefined &&
                  vencimientos?.map(ven => (
                    <Link
                      key={ven.id}
                      to={`/dashboard/contador/vencimientos/${userId}/editar/${ven.id}`}
                      state={{
                        backgroundLocation: location.state.backgroundLocation
                      }}
                    >
                      <div
                        className={classNames(
                          'text-white  p-1 border  border-gray-300 rounded-md',
                          {
                            'bg-red-400 hover:bg-red-500': ven.alarma,
                            'bg-blue-400 hover:bg-blue-500': !ven.alarma
                          }
                        )}
                      >
                        {ven.nombre}
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </ScrollArea>
        )}
      </div>
      <DialogFooter className="flex-row sm:justify-between justify-between">
        <Button variant="secondary" onClick={navigateBack}>
          Cerrar
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

VerMasVencimientos.propTypes = {
  location: PropTypes.any,
  navigate: PropTypes.any,
  navigateBack: PropTypes.any
};
export default VerMasVencimientos;
