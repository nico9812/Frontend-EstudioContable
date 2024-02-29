import { useNavigate } from 'react-router-dom';

export const extractRawData = entities => {
  return Object.values(entities).map(entity => ({
    id: entity.id,
    username: entity.username,
    email: entity.email,
    first_name: entity.first_name,
    last_name: entity.last_name
  }));
};
