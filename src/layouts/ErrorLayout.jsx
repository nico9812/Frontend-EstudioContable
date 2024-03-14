import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';

const ErrorLayout = () => {
  return (
    <div className="container h-screen py-0">
      <div className="flex h-full w-full items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
};

ErrorLayout.propTypes = {
  match: PropTypes.object
};

export default ErrorLayout;
