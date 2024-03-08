import PropTypes from 'prop-types';

import { QueryHooks } from '@/hooks/QueryHooks';
import { useGetCategoriasQuery } from '@/redux/api/categoriasApiSlice';
import {
  useGetDocumentosFiltradosQuery,
  useGetDocumentosQuery
} from '@/redux/api/documentosApiSlice';
import { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import ButtonAction from '../common/ButtonAction';
import { CardDoc } from './CardDoc';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select';
import { FaPlusCircle } from 'react-icons/fa';

export function ContentDocumentos({ userId, group }) {
  let { userId: idParams } = useParams();

  if (userId === undefined) {
    userId = idParams;
  }

  const location = useLocation();

  const [selected, setSelected] = useState('');

  return (
    <div className="mt-3">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <QueryHooks
            useQuery={useGetCategoriasQuery()}
            childrenObjects={renderArray => ({
              categorias: renderArray
            })}
          >
            {({ categorias }) => (
              <Select
                onValueChange={value => {
                  setSelected(value);
                }}
                defaultValue={selected}
                className="w-lg-25"
                size="sm"
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Todas</SelectItem>
                  {categorias.length > 0 &&
                    categorias?.map(cat => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.nombre}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            )}
          </QueryHooks>
          {group === 1 && (
            <Link
              to="agregar"
              state={{
                backgroundLocation: location
              }}
            >
              <ButtonAction
                className="ml-auto"
                title="Agregar"
                icon={<FaPlusCircle />}
              />
            </Link>
          )}
        </div>
        <QueryHooks
          useQuery={
            selected !== '' && selected !== '0'
              ? // eslint-disable-next-line react-hooks/rules-of-hooks
                useGetDocumentosFiltradosQuery({
                  strCat: selected,
                  userId: userId
                })
              : // eslint-disable-next-line react-hooks/rules-of-hooks
                useGetDocumentosQuery(userId)
          }
          childrenObjects={renderArray => ({
            documentos: renderArray
          })}
        >
          {({ documentos }) => (
            <div className="border rounded-sm px-4 py-3 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3">
              {documentos.length > 0 ? (
                documentos.map(doc => <CardDoc key={doc.id} documento={doc} />)
              ) : (
                <div className="text-center">No hay documentos</div>
              )}
            </div>
          )}
        </QueryHooks>
      </div>
    </div>
  );
}

ContentDocumentos.propTypes = {
  group: PropTypes.any,
  userId: PropTypes.any
};
