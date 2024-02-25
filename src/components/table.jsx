import Table from 'react-bootstrap/Table';
import { Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare,faCalendarAlt, faFilePdf, faTrashAlt, faListCheck } from '@fortawesome/free-solid-svg-icons';
import "../static/css/tabla.css"
import Cookies from 'js-cookie';

export function TableGen(cabecera,contenido,opciones,{ abrirConfirm }, { abrirModalMod }) {
  const group = Cookies.get('group');
  if (opciones=="programas"){
    contenido = contenido.programas;
  }
  if (opciones=="clientes"){
    contenido = contenido.usuarios;
  }

  return (
    <div>
    <Table striped bordered hover className={opciones == "clientes" ? ("tablecli"):("tablepro")}>
      <thead>
        <tr>
        {
        cabecera.map((elemento, index) => (
        <th key={index}>{elemento}</th>
        ))}
        {group == "1" &&

        <th>Opciones</th>
        }
        </tr>
      </thead>
      <tbody>
      {
      contenido.map((user, rowIndex) => (
          <tr key={rowIndex}>
            {Object.entries(user).map(([key,valor], index) => (
              key !== "id" && key !== "usuario" &&  <td key={index}>{valor}</td>
            ))}
            {opciones == "clientes"&&
              <td className='d-flex justify-content-between'>
                <Link onClick={() => abrirModalMod(user)}><FontAwesomeIcon icon={faPenToSquare} /></Link>
                <Link to={`Vencimientos/${user.id}`}><FontAwesomeIcon icon={faCalendarAlt} /></Link>
                <Link to={`Documentos/${user.id}`}><FontAwesomeIcon icon={faFilePdf} /></Link>
                <Link to={`Programas/${user.id}`}><FontAwesomeIcon icon={faListCheck} /></Link>
              </td>
            }
            {opciones == "programas" && group == "1" &&
              <td className='d-flex justify-content-between'>
                < FontAwesomeIcon className='linkmod' onClick={() => abrirModalMod(user)} icon={faPenToSquare} />
                <FontAwesomeIcon className='linkven' onClick={() => abrirConfirm(user)} icon={faTrashAlt} />
              </td>
            }
            {opciones == "categorias" && group == "1" &&
              <td className='d-flex justify-content-between'>
                < FontAwesomeIcon className='linkmod' onClick={() => abrirModalMod(user)} icon={faPenToSquare} />
                <FontAwesomeIcon className='linkven' onClick={() => abrirConfirm(user)} icon={faTrashAlt} />
              </td>
            }
          </tr>
          
        ))}
      </tbody>
    </Table>
    </div>
  );
}
