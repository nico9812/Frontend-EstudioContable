import ContentCategorias from '@/components/categorias/ContentCategorias';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function Categorias() {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle> Categorias </CardTitle>
      </CardHeader>
      <CardContent>
        <ContentCategorias />
      </CardContent>
    </Card>
  );
}
