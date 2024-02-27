import { selectCurrentUserName } from '@/redux/reducer/authReducerSlice';
import { useSelector } from 'react-redux';

export const Home = () => {
  const username = useSelector(selectCurrentUserName);
  return (
    <>
      <h1>Bienvenido, {username}.</h1>
      <p>Para continuar seleccione algo</p>
    </>
  );
};
