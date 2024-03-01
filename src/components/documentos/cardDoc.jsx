import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { AbrirDocumento } from '../../Api/DocumentosApi';
import Cookies from 'js-cookie';

// contador
export function CardDoc(documento) {
  const handleAbrirDoc = async id => {
    if (id) {
      try {
        const response = await AbrirDocumento(id);
        if (response.status == 401) {
          Cookies.remove('token');
        }
        const pdfData = response.data;
        const blob = new Blob([pdfData], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="document-card">
      <div
        onClick={() => handleAbrirDoc(documento.documento.id)}
        className="pdfpointer"
      >
        <FontAwesomeIcon icon={faFilePdf} className="pdf-icon" />
        {documento.documento.nombre}
      </div>
    </div>
  );
}

// Cliente

export function CardDocCli(documento) {
  const handleAbrirDoc = async id => {
    if (id) {
      try {
        const response = await AbrirDocumento(id);
        if (response.status == 401) {
          Cookies.remove('token');
        }
        const pdfData = response.data;
        console.log(pdfData);
        const blob = new Blob([pdfData], { type: 'application/pdf' });
        console.log(blob);
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="document-card">
      <div
        onClick={() => handleAbrirDoc(documento.documento.id)}
        className="pdfpointer"
      >
        <FontAwesomeIcon icon={faFilePdf} className="pdf-icon" />
        <div className="nombre">{documento.documento.nombre}</div>
      </div>
    </div>
  );
}
