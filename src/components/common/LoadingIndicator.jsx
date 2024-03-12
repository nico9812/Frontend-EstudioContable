import { FaSpinner } from 'react-icons/fa';

export const LoadingIndicator = () => {
  return (
    <div className="flex justify-center mb-4 mt-5 flex-row items-center">
      <FaSpinner className="mr-2 h-4 w-4 animate-spin" />
    </div>
  );
};
