import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '@/redux/reducer/authReducerSlice';

const LoginLayout = () => {
  const token = useSelector(selectCurrentToken);

  return token ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <div className="flex min-h-screen w-screen justify-center items-center">
      <Outlet />
    </div>
  );
};

export default LoginLayout;
