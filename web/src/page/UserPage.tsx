import React from 'react';
import { Button, Col, Container, Nav, Row } from 'react-bootstrap';
import { SelectCallback } from 'react-bootstrap/esm/helpers';
import { useHistory, useLocation } from 'react-router';
import { AuthContext } from '../hook/AuthContext';
import HomePageRoute from './UserPageRoute';
import './UserPage.css';
import { logout } from '../service/AuthService';

const UserPage = () => {
  const { dispatch } = React.useContext(AuthContext);
  const history = useHistory();
  const location = useLocation();

  const onClickLogout = () => {
    logout(dispatch);
    history.push('/');
  };

  const onSelectNav: SelectCallback = (selection) => {
    history.push(selection || '/');
  };

  const activekey = location.pathname === '/' ? '/home' : location.pathname;

  return (
    <Container>
      <Row>
        <Col>User Page</Col>
        <Col>
          <Nav activeKey={activekey} onSelect={onSelectNav}>
            <Nav.Item>
              <Nav.Link eventKey="/home">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="/profile">Profile</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="/edit">Edit</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col className="text-right">
          <Button variant="outline-primary" onClick={onClickLogout}>
            Logout
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <HomePageRoute />
        </Col>
      </Row>
    </Container>
  );
};

export default UserPage;
