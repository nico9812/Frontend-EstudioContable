import { ContentDocumentos } from '@/components/documentos/ContentDocumentos';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function Documentos() {
  return (
    <Card>
      <Card.Header className="text-center">
        <Card.Title> Documentos </Card.Title>
      </Card.Header>
      <Card.Body>
        <Button as={Link} to="../" variant="secondary">
          Volver
        </Button>
        <ContentDocumentos />
      </Card.Body>
    </Card>
  );
}
