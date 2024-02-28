import { useState } from 'react';

export const useModal = () => {
  const [modalAbierto, setModalAbierto] = useState(false);

  return { modalAbierto, setModalAbierto };
};
