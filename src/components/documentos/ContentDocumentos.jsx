import '@/components/documentos/documentos.scss';

import { useParams } from 'react-router-dom';
import { UsDoc } from '../../hooks/listarDocumentos';
import { CardDoc } from './cardDoc';
import { UsCat } from '../../hooks/listarCategorias';
import { Card, Col, FormSelect, Row } from 'react-bootstrap';
import Flex from '../common/Flex';
import IconAction from '../common/IconAction';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

export function ContentDocumentos() {
  const { id } = useParams();
  const documentos = UsDoc(id);
  const categorias = UsCat();

  return (
    <div className="mt-3">
      <Flex direction="column" className="gap-3">
        <Flex
          direction="row"
          alignItems="center"
          justifyContent="between"
          className="gap-3"
        >
          <FormSelect className="w-lg-25" size="sm" style={{ height: '30px' }}>
            <option value="todas">Todos</option>
            {categorias.categorias.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </FormSelect>
          <IconAction
            className="text-primary h3 m-0"
            title="Agregar Documento"
            ruta="agregar"
            state={{
              backgroundLocation: location
            }}
            icon={faPlusCircle}
          />
        </Flex>
        <div className="contenedor px-4 py-3">
          <Row className="row-cols-3 gap-4">
            {documentos.documentos.length > 0 ? (
              documentos.documentos.map(doc => (
                <Col as={Card} className="p-4" key={doc.id}>
                  <CardDoc key={doc.id} documento={doc} />
                </Col>
              ))
            ) : (
              <div>No hay documentos</div>
            )}
          </Row>
        </div>
      </Flex>
    </div>
  );
}
