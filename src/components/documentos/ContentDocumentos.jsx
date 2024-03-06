import PropTypes from 'prop-types';
import '@/components/documentos/documentos.scss';

import { QueryHooks } from '@/hooks/QueryHooks';
import { useGetCategoriasQuery } from '@/redux/api/categoriasApiSlice';
import {
  useGetDocumentosFiltradosQuery,
  useGetDocumentosQuery
} from '@/redux/api/documentosApiSlice';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Col, FormSelect, Row } from 'react-bootstrap';
import { useLocation, useParams } from 'react-router-dom';
import Flex from '../common/Flex';
import ButtonAction from '../common/ButtonAction';
import { CardDoc } from './CardDoc';

export function ContentDocumentos({ userId, group }) {
  let { userId: idParams } = useParams();

  if (userId === undefined) {
    userId = idParams;
  }

  const location = useLocation();

  const [selected, setSelected] = useState('');

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
              <FormSelect
                onChange={e => setSelected(e.target.value)}
                className="w-lg-25"
                size="sm"
              >
                <option value="0">Todos</option>
                {categorias.length > 0 &&
                  categorias?.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nombre}
                    </option>
                  ))}
              </FormSelect>
            )}
          </QueryHooks>
          {group === 1 && (
            <ButtonAction
              className="text-primary h3 m-0"
              title="Agregar Documento"
              ruta="agregar"
              state={{
                backgroundLocation: location
              }}
              icon={faPlusCircle}
            />
          )}
        </Flex>
        <div className="contenedor px-4 py-3">
          {selected !== '' && selected !== '0' ? (
            <QueryHooks
              // eslint-disable-next-line react-hooks/rules-of-hooks
              useQuery={useGetDocumentosFiltradosQuery({
                strCat: selected,
                userId: userId
              })}
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
          ) : (
            <QueryHooks
              // eslint-disable-next-line react-hooks/rules-of-hooks
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
          )}
        </div>
      </Flex>
    </div>
  );
}

ContentDocumentos.propTypes = {
  group: PropTypes.any,
  userId: PropTypes.any
};
