import IconButton from 'components/common/IconButton';
import PropTypes from 'prop-types';

const VolverAtras = ({
  navigate,
  ruta,
  replaceTrue,
  locationState,
  accionar = null
}) => {
  const navegador = () => {
    if (replaceTrue) {
      navigate(ruta, { replace: true });
    } else {
      navigate(ruta, { state: locationState });
    }
  };

  const handleButtonClick = () => {
    if (accionar) {
      accionar();
    }
    navegador();
  };

  return (
    <IconButton
      className="me-2 mb-1"
      variant="info"
      size="sm"
      icon="arrow-left"
      transform="shrink-3"
      onClick={handleButtonClick}
    >
      Atras
    </IconButton>
  );
};

VolverAtras.propTypes = {
  navigate: PropTypes.func.isRequired,
  ruta: PropTypes.string.isRequired,
  replaceTrue: PropTypes.bool,
  accionar: PropTypes.func,
  locationState: PropTypes.object
};

export default VolverAtras;
