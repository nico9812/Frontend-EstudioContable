import '../../static/css/home.css';
import Cookies from 'js-cookie';
import { Calendario } from '../../components/calendario';
import { useParams } from 'react-router-dom';
import { UsVen } from '../../components/listarVencimiento';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "../../static/css/vencimiento.css"

export function ListarVencimientosconta(){
    const { id } = useParams();
    const datos = UsVen(id);
    return (
      <div className='body'>
        <div className='content'>
          <Button as={Link} to="../" variant="secondary">
            Volver         
          </Button>
        </div>
        <Calendario datos={datos}/>
      </div>
      );
}

export function ListarVencimientosclien(){
  const id = Cookies.get('id');
  const datos = UsVen(id);

  return (
    <div className='body'>
      <div className='calclien'>
        <Calendario datos={datos}/>
      </div>
    </div>
    );
}