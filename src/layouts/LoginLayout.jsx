import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '@/redux/reducer/authReducerSlice';

const LoginLayout = () => {
  const navigate = useNavigate();
  const token = useSelector(selectCurrentToken);

  if (token) {
    navigate('/dashboard', {
      replace: true
    });
  }

  return (
    <div className="flex min-h-screen w-screen justify-center items-center">
      <Outlet />
    </div>
  );
};

export default LoginLayout;
