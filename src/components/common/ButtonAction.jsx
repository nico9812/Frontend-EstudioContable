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
  // Estados
  loading
}) => {
  const buttonProps = {
    className,
    disabled: loading,
    variant
  };

  if (accion && !loading) {
    buttonProps.onClick = accion;
    buttonProps.asChild = true;
  }

  return (
    <Button {...buttonProps}>
      <div className="flex gap-2 items-center">
        {loading && <FaSpinner className="animate-spin" />}
        {icon && icon}
        {title}
      </div>
    </Button>
  );
};

export default ButtonAction;
