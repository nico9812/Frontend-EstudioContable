import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import ContentCalendario from '@/components/vencimientos/ContentVencimientos';
import { selectCurrentUser } from '@/redux/reducer/authReducerSlice';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

export function Vencimientos() {
  const { group, id: userId } = useSelector(selectCurrentUser);

  return (
    <Card>
      <CardHeader>
        <h1 className="text-lg font-semibold">Vencimientos</h1>
      </CardHeader>
      <CardContent>
        {group === 1 && (
          <Button asChild>
            <Link to="../">Volver</Link>
          </Button>
        )}
        <ContentCalendario group={group} {...(group === 2 && { userId })} />
      </CardContent>
    </Card>
  );
}
