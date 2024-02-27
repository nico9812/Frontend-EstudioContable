import { selectCurrentUserName } from '@/redux/reducer/authReducerSlice';
import { useSelector } from 'react-redux';

export const Home = () => {
  const username = useSelector(selectCurrentUserName);
  return (
    <>
      <h1>
        Bienvenido, {username.charAt(0).toUpperCase() + username.slice(1)}.
      </h1>
      <p> Creo que mereces un chicle </p>
      <p>Para continuar seleccione algo</p>
    </>
  );
};
