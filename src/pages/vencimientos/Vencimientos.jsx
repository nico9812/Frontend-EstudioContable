import ContentCalendario from '@/components/vencimientos/ContentVencimientos';
import { selectCurrentUser } from '@/redux/reducer/authReducerSlice';
import { Button, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export function Vencimientos() {
  const { group, id: userId } = useSelector(selectCurrentUser);

  return (
    <Card>
      <Card.Header className="text-center">
        <Card.Title> Vencimientos</Card.Title>
      </Card.Header>
      <Card.Body>
        {group === 1 && (
          <Button as={Link} to="../" variant="secondary">
            Volver
          </Button>
        )}
        <ContentCalendario group={group} {...(group === 2 && { userId })} />
      </Card.Body>
    </Card>
  );
}
