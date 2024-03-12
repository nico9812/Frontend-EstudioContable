import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ContentClientes from '@/components/users/ContentClientes';

export const Clientes = () => {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle> Clientes </CardTitle>
      </CardHeader>
      <CardContent>
        <ContentClientes />
      </CardContent>
    </Card>
  );
};
