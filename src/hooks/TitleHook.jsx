import { useState } from 'react';

export const TitleHook = () => {
  const [title, setTitle] = useState('');

  return { title, setTitle };
};
