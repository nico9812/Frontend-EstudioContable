import '@/components/documentos/documentos.scss';

import { useLocation, useParams } from 'react-router-dom';
import { CardDoc } from './CardDoc';
import { Col, FormSelect, Row } from 'react-bootstrap';
import Flex from '../common/Flex';
import IconAction from '../common/IconAction';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { QueryHooks } from '@/hooks/QueryHooks';
import { useGetCategoriasQuery } from '@/redux/api/categoriasApiSlice';
import { useGetDocumentosQuery } from '@/redux/api/documentosApiSlice';

export function ContentDocumentos() {
  const { userId } = useParams();
  const location = useLocation();

  return (
    <div className="mt-3">
      <Flex direction="column" className="gap-3">
        <Flex
          direction="row"
          alignItems="center"
          justifyContent="between"
          className="gap-3"
        >
          <QueryHooks
            useQuery={useGetCategoriasQuery()}
            childrenObjects={renderArray => ({
              categorias: renderArray
            })}
          >
            {({ categorias }) => (
              <FormSelect className="w-lg-25" size="sm">
                <option value="todas">Todos</option>
                {categorias.length > 0 &&
                  categorias?.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nombre}
                    </option>
                  ))}
              </FormSelect>
            )}
          </QueryHooks>
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
          <QueryHooks
            useQuery={useGetDocumentosQuery(userId)}
            childrenObjects={renderArray => ({
              documentos: renderArray
            })}
          >
            {({ documentos }) => (
              <Row className="m-0 row-cols-2 row-cols-md-3 h-100 overflow-scroll">
                {documentos.length > 0 ? (
                  documentos.map(doc => (
                    <Col className="p-1 cursor-pointer" key={doc.id}>
                      <CardDoc key={doc.id} documento={doc} />
                    </Col>
                  ))
                ) : (
                  <div>No hay documentos</div>
                )}
              </Row>
            )}
          </QueryHooks>
        </div>
      </Flex>
    </div>
  );
}
