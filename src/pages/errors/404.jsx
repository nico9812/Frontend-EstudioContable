import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { FaArrowCircleLeft } from "react-icons/fa";

const Error404 = () => {
  return (
    <Card className="text-center">
      <CardContent className="p-5">
        <div className="display-1 text-300 fs-error">404</div>
        <p className="lead mt-4 text-800 font-sans-serif fw-semi-bold">
          La página que estás buscando no se encuentra.
        </p>
        <hr />
        <p>
          Asegúrate de que la dirección sea correcta y que la página no se haya
          movido.
        </p>
        <Link className="btn btn-primary btn-sm mt-3" to="/">
          <FaArrowCircleLeft className="me-2" />
          Volver Atras
        </Link>
      </CardContent>
    </Card>
  );
};

export default Error404;
