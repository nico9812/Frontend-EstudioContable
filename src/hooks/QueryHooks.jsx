import { extractRawData } from '@/helpers';
import { LoadingIndicator } from '@/components/common/LoadingIndicator';

export const QueryHooks = ({ useQuery, children, childrenObjects }) => {
  const { data, isLoading, isSuccess, isError, error } = useQuery;

  const renderChildren = () => {
    if (isLoading) {
      return <LoadingIndicator />;
    } else if (isError) {
      return <span>{error}</span>;
    } else if (isSuccess) {
      const renderArray = extractRawData(data);

      const finalChildrenObjects =
        typeof childrenObjects === 'function'
          ? childrenObjects(renderArray)
          : childrenObjects;

      return children({ children, ...finalChildrenObjects });
    } else {
      return null;
    }
  };

  return renderChildren();
};
