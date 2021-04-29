import React from 'react';
import {
  Form,
  Button,
  FormProps,
  Alert,
  Spinner,
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import { Variant } from 'react-bootstrap/esm/types';
import { useHistory } from 'react-router';
import { Binder } from '../../hook/useBind';
import { LoginModel } from '../../model/LoginModel';
import './LoginForm.css';

export type LoginFormBindings = { [k in keyof LoginModel]: Binder };

export type LoginFormProps = {
  bindings: LoginFormBindings;
  onSubmit: FormProps['onSubmit'];
  message: string;
  messageVariant: Variant;
  isLoggingIn: boolean;
};

const LoginForm = ({
  bindings: { identity, secret },
  onSubmit,
  message,
  messageVariant,
  isLoggingIn,
}: LoginFormProps) => {
  const history = useHistory();

  const onClickSignup = () => {
    history.push('/signup');
  };

  return (
    <div className="Login">
      <Container>
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username or email"
              {...identity}
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              {...secret}
              autoComplete="on"
            />
          </Form.Group>

          <Row>
            <Col>
              <Button variant="primary" type="submit" disabled={isLoggingIn}>
                Login
              </Button>
            </Col>
            <Col className="text-right">
              <Button variant="outline-secondary" onClick={onClickSignup}>
                Go to Signup
              </Button>
            </Col>
          </Row>

          <Row className="LoginError">
            <Col>
              {isLoggingIn ? <Spinner animation="grow" size="sm" /> : ''}
              {message && <Alert variant={messageVariant}>{message}</Alert>}
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default LoginForm;
