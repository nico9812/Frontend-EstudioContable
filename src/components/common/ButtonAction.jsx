/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { FaSpinner } from 'react-icons/fa';

const ButtonAction = ({
  // Apariencia
  className,
  icon,
  title,
  variant,
  // Acciones
  accion,
  ruta,
  state,
  // Estados
  loading
}) => {
  return (
    <Button
      className={className}
      disabled={loading}
      variant={variant}
      {...(accion && { onClick: accion, asChild: true })}
    >
      {ruta ? (
        <Link className="flex gap-2 items-center" to={ruta} state={state}>
          {icon && icon}
          {title}
        </Link>
      ) : (
        <div className="flex gap-2 items-center">
          {loading && <FaSpinner className="animate-spin" />}
          {icon && icon}
          {title}
        </div>
      )}
    </Button>
  );
};

export default ButtonAction;