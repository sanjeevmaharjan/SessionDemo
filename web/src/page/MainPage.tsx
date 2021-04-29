import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import MainPageRoute from './MainPageRoute';

const MainPage = () => (
  <Container>
    <Row>
      <Col>Main Page</Col>
    </Row>
    <Row>
      <Col>
        <MainPageRoute />
      </Col>
    </Row>
  </Container>
);

export default MainPage;
