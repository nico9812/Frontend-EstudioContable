import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ContentDocumentos } from '@/components/documentos/ContentDocumentos';
import { selectCurrentUser } from '@/redux/reducer/authReducerSlice';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export function Documentos() {
  const { group, id: userId } = useSelector(selectCurrentUser);

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle> Documentos </CardTitle>
      </CardHeader>
      <CardContent>
        {group === 1 && (
          <Button asChild>
            <Link to="../">Volver</Link>
          </Button>
        )}
        <ContentDocumentos group={group} {...(group === 2 && { userId })} />
      </CardContent>
    </Card>
  );
}
