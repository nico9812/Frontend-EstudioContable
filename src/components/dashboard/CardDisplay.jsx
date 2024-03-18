import {
  Card,
  CardContent,
  CardDescription,
  CardTitle
} from '@/components/ui/card';
import { UsersIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

const CardDisplay = ({ title, description, linkTo }) => {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 pt-6">
        <UsersIcon className="h-6 w-6" />
        <div className="grid gap-1">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <Button className="ml-auto" size="sm" variant="outline" asChild>
          <Link to={linkTo}>Ver</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default CardDisplay;
