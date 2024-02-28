import { selectCurrentUserName } from '@/redux/reducer/authReducerSlice';
import { useSelector } from 'react-redux';

import { faAlignLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { BsPersonCircle } from 'react-icons/bs';
import {
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  Row,
  UncontrolledDropdown
} from 'reactstrap';
import Flex from '@/components/common/Flex';
import { Link } from 'react-router-dom';

export const TopBar = ({ toggleSidebar }) => {
  const username = useSelector(selectCurrentUserName);

  return (
    <header>
      <Navbar
        color="light"
        light
        expand="xs"
        className="navbar shadow-lg p-3 mb-5 bg-white rounded"
      >
        <Row className="g-0 w-100 align-items-center">
          <Col className="d-flex justify-content-xs-start">
            <Button color="info" onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faAlignLeft} />
            </Button>
          </Col>

          <Col className="d-flex justify-content-end">
            <Nav className="mrx-auto" navbar>
              <UncontrolledDropdown
                className="d-flex align-items-center"
                nav
                inNavbar
              >
                <DropdownToggle className="font-weight-bold" nav>
                  <Flex alignItems="center" className="gap-2">
                    <h3>
                      <BsPersonCircle />
                    </h3>
                  </Flex>
                </DropdownToggle>
                <DropdownMenu end flip>
                  <DropdownItem
                    className="font-weight-bold text-secondary text-uppercase"
                    header
                    disabled
                  >
                    Usuario: {username}
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Ajustes</DropdownItem>
                  <DropdownItem>
                    <Link to="/logout">Cerrar Sesión</Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Col>
        </Row>
      </Navbar>
    </header>
  );
};

TopBar.propTypes = {
  toggleSidebar: PropTypes.func
};
