import { selectCurrentGroup } from '@/redux/reducer/authReducerSlice';
import { useSelector } from 'react-redux';
import { QueryHooks } from '@/hooks/QueryHooks';
import { useGetVencimientosRecientesQuery } from '@/redux/api/vencimientosApiSlice';
import CardDisplay from '@/components/dashboard/CardDisplay';
import CardInfo from '@/components/dashboard/CardInfo';
import VencimientosProximos from '@/components/dashboard/VencimientosProximos';
import DocumentosRecientes from '@/components/dashboard/DocumentosRecientes';
import { useGetDocumentosRecientesQuery } from '@/redux/api/documentosApiSlice';
import { useGetProgramasRecientesQuery } from '@/redux/api/programasApiSlice';
import ProgramasRecientes from '@/components/dashboard/ProgramasRecientes';

const Home = () => {
  const group = useSelector(selectCurrentGroup);
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {group === 1 && (
        <>
          <CardDisplay
            title="Clientes"
            description="Ver Clientes Cargados"
            linkTo="contador"
          />
          <CardDisplay
            title="Categorias"
            description="Ver categorias disponibles"
            linkTo="contador/categorias"
          />
          <CardInfo className="col-span-full" title="Vencimientos próximos a vencer">
            <QueryHooks
              // eslint-disable-next-line react-hooks/rules-of-hooks
              useQuery={useGetVencimientosRecientesQuery()}
              childrenObjects={renderArray => ({
                vencimientos: renderArray,
                location: location
              })}
            >
              {({ vencimientos }) => (
                <VencimientosProximos vencimientos={vencimientos} />
              )}
            </QueryHooks>
          </CardInfo>
          {/* <CardInfo title="Documentos recientes">
            <QueryHooks
              // eslint-disable-next-line react-hooks/rules-of-hooks
              useQuery={useGetDocumentosRecientesQuery()}
              childrenObjects={renderArray => ({
                documentos: renderArray,
                location: location
              })}
            >
              {({ documentos }) => (
                <DocumentosRecientes documentos={documentos} />
              )}
            </QueryHooks>
          </CardInfo>
          <CardInfo title="Mis Programas">
            <QueryHooks
              // eslint-disable-next-line react-hooks/rules-of-hooks
              useQuery={useGetProgramasRecientesQuery()}
              childrenObjects={renderArray => ({
                programas: renderArray,
                location: location
              })}
            >
              {({ programas }) => <ProgramasRecientes programas={programas} />}
            </QueryHooks>
          </CardInfo> */}
        </>
      )}
      {group === 2 && (
        <>
          <CardInfo title="Mis Vencimientos">
            <QueryHooks
              // eslint-disable-next-line react-hooks/rules-of-hooks
              useQuery={useGetVencimientosRecientesQuery()}
              childrenObjects={renderArray => ({
                vencimientos: renderArray,
                location: location
              })}
            >
              {({ vencimientos }) => (
                <VencimientosProximos vencimientos={vencimientos} />
              )}
            </QueryHooks>
          </CardInfo>
          <CardInfo title="Mis Documentos">
            <QueryHooks
              // eslint-disable-next-line react-hooks/rules-of-hooks
              useQuery={useGetDocumentosRecientesQuery()}
              childrenObjects={renderArray => ({
                documentos: renderArray,
                location: location
              })}
            >
              {({ documentos }) => (
                <DocumentosRecientes documentos={documentos} />
              )}
            </QueryHooks>
          </CardInfo>
          <CardInfo className="col-span-full" title="Mis Programas">
            <QueryHooks
              // eslint-disable-next-line react-hooks/rules-of-hooks
              useQuery={useGetProgramasRecientesQuery()}
              childrenObjects={renderArray => ({
                programas: renderArray,
                location: location
              })}
            >
              {({ programas }) => <ProgramasRecientes programas={programas} />}
            </QueryHooks>
          </CardInfo>
        </>
      )}
    </div>
  );
};
export default Home;
