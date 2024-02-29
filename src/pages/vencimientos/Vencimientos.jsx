import '@/assets/css/modal.css';
import { Calendario } from '@/components/vencimientos/Calendario';
import { useParams } from 'react-router-dom';
import { UsVen } from '@/hooks/listarVencimiento';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function ListarVencimientosconta() {
  const { id } = useParams();
  const datos = UsVen(id);

  return (
    <Card>
      <Card.Header className="text-center">
        <Card.Title> Vencimientos</Card.Title>
      </Card.Header>
      <Card.Body>
        <Button as={Link} to="../" variant="secondary">
          Volver
        </Button>
        <Calendario datos={datos} />
      </Card.Body>
    </Card>
  );
}

export function ListarVencimientosclien() {
  const datos = UsVen();

  return (
    <div className="body">
      <div className="calclien">
        <Calendario datos={datos} />
      </div>
    </div>
  );
}
