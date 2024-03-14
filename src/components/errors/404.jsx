import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

const Error404 = () => {
  return (
    <Card className="text-center">
      <CardContent className="p-5">
        <div className="text-6xl text-primary font-semibold">404</div>
        <p className="mt-4 text-lg font-sans-serif font-semibold">
          La página que estás buscando no se encuentra.
        </p>
        <hr className="my-4" />
        <p>
          Asegúrate de que la dirección sea correcta y que la página no se haya
          movido.
        </p>
        <Link
          className="bg-primary text-white px-4 py-2 rounded-full mt-4 inline-flex items-center"
          to="/"
        >
          Volver Atrás
        </Link>
      </CardContent>
    </Card>
  );
};

export default Error404;
