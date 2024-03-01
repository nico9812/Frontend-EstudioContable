/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

const IconAction = ({
  // Apariencia
  className,
  icon,
  title,
  placement = 'top',
  // Acciones
  accion,
  ruta,
  state
}) => {
  return (
    <OverlayTrigger
      show={true}
      trigger="focus"
      delay={{ show: 250, hide: 400 }}
      overlay={<Tooltip>{title}</Tooltip>}
    >
      {accion ? (
        <div className="cursor-pointer" onClick={accion}>
          <FontAwesomeIcon icon={icon} className={className} size="lg" />
        </div>
      ) : (
        <>
          {icon ? (
            <Link to={ruta} state={state}>
              <FontAwesomeIcon icon={icon} className={className} size="lg" />
            </Link>
          ) : (
            <Button>
              <Link to={ruta} state={state}>
                {title}
              </Link>
            </Button>
          )}
        </>
      )}
    </OverlayTrigger>
  );
};

export default IconAction;
