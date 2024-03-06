import { Button } from '@/components/ui/button';
import { FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const BtnLoader = props => {
  const { type, title, loading, linkTo = null } = props;

  return (
    <>
      {!loading ? (
        linkTo ? (
          <Link to={linkTo.route} state={linkTo.state} className="ps-3">
            <Button type={type || 'submit'} {...props}>
              {title}
            </Button>
          </Link>
        ) : (
          <Button type={type || 'submit'} {...props}>
            {title}
          </Button>
        )
      ) : (
        <Button disabled {...props}>
          <FaSpinner className="animate-spin" />
          {title}
        </Button>
      )}
    </>
  );
};
