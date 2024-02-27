/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

const BtnAccion = ({
  // Apariencia
  variant,
  icon,
  title,
  placement = 'top',
  // Acciones
  accion,
  ruta,
  parametro,
  state,
}) => {
  const composeRoute = parametro ? ruta + parametro : ruta;
  return (
    <OverlayTrigger
      placement={placement}
      overlay={<Tooltip>{title}</Tooltip>}
    >
      {accion ? (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div className="cursor-pointer" onClick={accion}>
          <FontAwesomeIcon icon={icon} className={variant} size="lg" />
        </div>
      ) : (
        <Link to={composeRoute} state={state}>
          <FontAwesomeIcon icon={icon} className={variant} size="lg" />
        </Link>
      )}
    </OverlayTrigger>
  );
};

export default BtnAccion;
