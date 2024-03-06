import { Card, CardContent, CardHeader } from '@/components/ui/card';
import ContentClientes from '@/components/users/ContentClientes';

export const Clientes = () => {
  return (
    <Card>
      <CardHeader>
        <h1 className="text-lg font-semibold">Lista de Clientes</h1>
      </CardHeader>
      <CardContent>
        <ContentClientes />
      </CardContent>
    </Card>
  );
};
