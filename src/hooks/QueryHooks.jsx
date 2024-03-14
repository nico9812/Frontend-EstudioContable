import { extractRawData } from '@/helpers';
import { LoadingIndicator } from '@/components/common/LoadingIndicator';
import Error400 from '@/components/errors/400';

export const QueryHooks = ({ useQuery, children, childrenObjects }) => {
  const { data, isLoading, isSuccess, isError, refetch } = useQuery;

  const renderChildren = () => {
    if (isLoading) {
      return <LoadingIndicator />;
    } else if (isError) {
      return <Error400 />;
    } else if (isSuccess) {
      const renderArray = extractRawData(data);

      const finalChildrenObjects =
        typeof childrenObjects === 'function'
          ? childrenObjects(renderArray)
          : childrenObjects;

      return children({ children, ...finalChildrenObjects, refetch });
    } else {
      return null;
    }
  };

  return renderChildren();
};
