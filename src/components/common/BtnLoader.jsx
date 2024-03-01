import { Button, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const BtnLoader = props => {
  const {
    type,
    title,
    loading,
    variant,
    disabled,
    className,
    accionar = null,
    linkTo = null
  } = props;

  const handleButtonClick = () => {
    if (accionar) {
      accionar();
    }
  };

  return (
    <>
      {!loading ? (
        linkTo ? (
          <Link to={linkTo.route} state={linkTo.state} className="ps-3">
            <Button
              variant={variant}
              type={type || 'submit'}
              className={className}
              disabled={disabled}
              onClick={handleButtonClick}
            >
              {title}
            </Button>
          </Link>
        ) : (
          <Button
            variant={variant}
            type={type || 'submit'}
            className={className}
            disabled={disabled}
            onClick={handleButtonClick}
          >
            {title}
          </Button>
        )
      ) : (
        <Button
          variant={variant}
          className={className + ' d-flex flex-center gap-2'}
          disabled
        >
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          {title}
        </Button>
      )}
    </>
  );
};

BtnLoader.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  variant: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  accionar: PropTypes.func,
  linkTo: PropTypes.object
};
