/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const BtnAccion = ({
  // Apariencia
  variant,
  icon,
  title,
  placement = 'top',
  // Acciones
  accion,
  ruta,
  state
}) => {
  return (
    <OverlayTrigger placement={placement} overlay={<Tooltip>{title}</Tooltip>}>
      {accion ? (
        <div className="cursor-pointer" onClick={accion}>
          <FontAwesomeIcon icon={icon} className={variant} size="lg" />
        </div>
      ) : (
        <Link to={ruta} state={state}>
          <FontAwesomeIcon icon={icon} className={variant} size="lg" />
        </Link>
      )}
    </OverlayTrigger>
  );
};

export default BtnAccion;
