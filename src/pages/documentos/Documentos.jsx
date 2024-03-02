import { ContentDocumentos } from '@/components/documentos/ContentDocumentos';
import { selectCurrentUser } from '@/redux/reducer/authReducerSlice';
import { Button, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export function Documentos() {
  const { group, id: userId } = useSelector(selectCurrentUser);

  return (
    <Card>
      <Card.Header className="text-center">
        <Card.Title> Documentos </Card.Title>
      </Card.Header>
      <Card.Body>
        {group === 1 && (
          <Button as={Link} to="../" variant="secondary">
            Volver
          </Button>
        )}
        <ContentDocumentos group={group} {...(group === 2 && { userId })} />
      </Card.Body>
    </Card>
  );
}
