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
import { Separator } from '../ui/separator';

const VerMasVencimientos = ({ location, navigateBack }) => {
  const { userId } = useParams();

  const diaLocation = location?.state?.day;

  const nombreDia = new Date(diaLocation).toLocaleDateString('es-AR', {
    timeZone: 'UTC'
  });

  const titulo = `Vencimientos - ${nombreDia}`;

  const { vencimientos, isLoading } = useGetVencimientosQuery(userId, {
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
  });

  return (
    <DialogContent closeAction={navigateBack}>
      <DialogHeader>
        <DialogTitle id="contained-modal-title-vcenter">{titulo}</DialogTitle>
      </DialogHeader>
      <div className="flex w-full justify-center">
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <ScrollArea className="w-4/5 h-full text-center rounded-md border">
            <div className="p-4">
              <h4 className="mb-4 text-sm font-medium leading-none">
                Vencimientos
              </h4>
              {vencimientos !== undefined &&
                vencimientos?.map(ven => (
                  <div key={ven.id} className="hover:bg-gray-100 pt-1">
                    <Link
                      to={`/dashboard/contador/vencimientos/${userId}/editar/${ven.id}`}
                      state={{
                        backgroundLocation: location.state.backgroundLocation
                      }}
                    >
                      {ven.nombre}
                    </Link>
                    <Separator className="my-2" />
                  </div>
                ))}
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
