import { Spinner } from 'reactstrap';

export const LoadingIndicator = () => {
  return (
    <div className="d-flex justify-content-center mb-4 mt-5 flex-row align-items-center">
      <Spinner animation="border" variant="success" />
    </div>
  );
};
