import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '../ui/button';
// import { BsThreeDots } from 'react-icons/bs';
import { Separator } from '../ui/separator';
// import { Link } from 'react-router-dom';

// const CardInfo = ({ title, linkTo, children }) => {
const CardInfo = ({ title, children, className }) => {
  return (
    <Card className={className}>
      <CardHeader className="flex-row items-center py-4">
        <CardTitle>{title}</CardTitle>
        {/* <Button className="ml-auto rounded-full h-7 w-7" size="icon" asChild>
          <Link to={linkTo}>
            <BsThreeDots className="h-4 w-4" />
          </Link>
          <span className="sr-only">Ver</span>
        </Button> */}
      </CardHeader>
      <Separator />
      <CardContent className="flex items-center justify-center p-6 flex-1">
        {children}
      </CardContent>
    </Card>
  );
};
export default CardInfo;
