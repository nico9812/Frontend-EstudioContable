import ContentProgramas from '@/components/programas/ContentProgramas';
import { Card } from 'react-bootstrap';

export function Programas() {
  return (
    <Card>
      <Card.Header className="text-center">
        <Card.Title> Programas </Card.Title>
      </Card.Header>
      <Card.Body>
        <ContentProgramas />
      </Card.Body>
    </Card>
  );
}
