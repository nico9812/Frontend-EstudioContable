import '@/components/vencimientos/vermas.scss';

import { useGetVencimientosQuery } from '@/redux/api/vencimientosApiSlice';
import PropTypes from 'prop-types';
import { Button, Modal, CloseButton } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { LoadingIndicator } from '../common/LoadingIndicator';
import { ListGroup, ListGroupItem } from 'reactstrap';
import Flex from '../common/Flex';

const VerMasVencimientos = ({ location, navigateBack, navigate }) => {
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

  const onClickEvent = event => {
    return navigate(
      `/dashboard/contador/vencimientos/${userId}/editar/${event.target.id}`,
      {
        state: {
          backgroundLocation: location.state.backgroundLocation
        }
      }
    );
  };

  return (
    <>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">{titulo}</Modal.Title>
        <CloseButton
          className="btn btn-circle btn-sm transition-base p-0"
          onClick={navigateBack}
        />
      </Modal.Header>
      <Modal.Body as={Flex} justifyContent="center">
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <ListGroup className="w-50">
            {vencimientos !== undefined &&
              vencimientos?.map(ven => (
                <ListGroupItem
                  key={ven.id}
                  id={ven.id}
                  className="text-center"
                  action
                  onClick={onClickEvent}
                >
                  {ven.nombre}
                </ListGroupItem>
              ))}
          </ListGroup>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={navigateBack}>
          Cerrar
        </Button>
      </Modal.Footer>
    </>
  );
};

VerMasVencimientos.propTypes = {
  location: PropTypes.any,
  navigate: PropTypes.any,
  navigateBack: PropTypes.any
};
export default VerMasVencimientos;
