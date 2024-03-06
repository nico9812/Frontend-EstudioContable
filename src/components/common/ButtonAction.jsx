/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

const ButtonAction = ({
  // Apariencia
  className,
  icon,
  title,
  // Acciones
  accion,
  ruta,
  state
}) => {
  return (
    <Button
      variant="ghost"
      className={className}
      asChild
      {...(accion && { onClick: accion })}
    >
      {ruta ? (
        <Link to={ruta} state={state}>
          {icon && icon}
          {title}
        </Link>
      ) : (
        <>
          {icon && icon}
          {title}
        </>
      )}
    </Button>
  );
};

export default ButtonAction;
