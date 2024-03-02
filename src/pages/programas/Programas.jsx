import ContentProgramas from '@/components/programas/ContentProgramas';
import { selectCurrentUser } from '@/redux/reducer/authReducerSlice';
import { Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export function Programas() {
  const { group, id: userId } = useSelector(selectCurrentUser);

  return (
    <Card>
      <Card.Header className="text-center">
        <Card.Title> Programas </Card.Title>
      </Card.Header>
      <Card.Body>
        <ContentProgramas group={group} {...(group === 2 && { userId })} />
      </Card.Body>
    </Card>
  );
}
