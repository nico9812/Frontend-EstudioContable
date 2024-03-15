import { Card, CardContent } from '@/components/ui/card';
import { FaRegSadTear } from 'react-icons/fa';

const Error400 = () => {
  return (
    <Card className="text-center w-full">
      <CardContent className="p-5">
        <div className="flex flex-col items-center gap-3 text-3xl text-primary font-semibold">
          Ups... ha ocurrido un error
          <FaRegSadTear />
        </div>

        <hr className="my-4" />
        <p>Intentelo más tarde o actualize la pagina</p>
      </CardContent>
    </Card>
  );
};

export default Error400;
