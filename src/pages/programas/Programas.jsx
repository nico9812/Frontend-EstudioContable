import ContentProgramas from '@/components/programas/ContentProgramas';
import { selectCurrentUser } from '@/redux/reducer/authReducerSlice';
import { useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function Programas() {
  const { group, id: userId } = useSelector(selectCurrentUser);

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle> Programas </CardTitle>
      </CardHeader>
      <CardContent>
        <ContentProgramas group={group} {...(group === 2 && { userId })} />
      </CardContent>
    </Card>
  );
}
