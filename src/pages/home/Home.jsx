import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { selectCurrentGroup } from '@/redux/reducer/authReducerSlice';
import { Separator } from '@/components/ui/separator';
import { FileIcon, UsersIcon } from 'lucide-react';
import { BsThreeDots } from 'react-icons/bs';
import { useSelector } from 'react-redux';

const Home = () => {
  const group = useSelector(selectCurrentGroup);
  return (
    <>
      {group === 1 && (
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <UsersIcon className="h-6 w-6" />
              <div className="grid gap-1">
                <CardTitle>Clientes</CardTitle>
                <CardDescription>Ver clientes cargados</CardDescription>
              </div>
              <Button className="ml-auto" size="sm" variant="outline">
                Ver
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <FileIcon className="h-6 w-6" />
              <div className="grid gap-1">
                <CardTitle>Categorias</CardTitle>
                <CardDescription>Ver categorias disponibles</CardDescription>
              </div>
              <Button className="ml-auto" size="sm" variant="outline">
                Ver
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
      {group === 2 && (
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex-row items-center py-4">
              <CardTitle>Mis vencimientos</CardTitle>
              <Button className="ml-auto rounded-full h-7 w-7" size="icon">
                <BsThreeDots className="h-4 w-4" />
                <span className="sr-only">Ver</span>
              </Button>
            </CardHeader>
            <Separator />
            <CardContent className="flex items-center justify-center p-6 flex-1">
              No hay vencimientos que mostrar
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex-row items-center py-4">
              <CardTitle>Mis documentos</CardTitle>
              <Button className="ml-auto rounded-full h-7 w-7" size="icon">
                <BsThreeDots className="h-4 w-4" />
                <span className="sr-only">Agregar</span>
              </Button>
            </CardHeader>
            <Separator />
            <CardContent className="flex items-center justify-center p-6 flex-1">
              No hay documentos que mostrar
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex-row items-center py-4">
              <CardTitle>Mis programas</CardTitle>
              <Button className="ml-auto rounded-full h-7 w-7" size="icon">
                <BsThreeDots className="h-4 w-4" />
                <span className="sr-only">Agregar</span>
              </Button>
            </CardHeader>
            <Separator />
            <CardContent className="flex items-center justify-center p-6 flex-1">
              No hay programas de higiene que mostrar.
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};
export default Home;
