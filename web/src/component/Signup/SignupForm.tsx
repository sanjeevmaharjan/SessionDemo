import React from 'react';
import { Button, Col, Container, Form, FormProps, Row } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { Binder } from '../../hook/useBind';
import { SignupModel } from '../../model/SignupModel';
import './SignupForm.css';

export type SignupFormBindings = { [k in keyof SignupModel]: Binder } & {
  repeatPassword: Binder;
};

export type SignupErrors =
  | undefined
  | Partial<
      {
        [k in keyof SignupFormBindings]: string | string[];
      }
    >;

export type SignupFormProps = {
  bindings: SignupFormBindings;
  errors: SignupErrors;
  onSubmit: FormProps['onSubmit'];
  isSigningUp: boolean;
};

const SignupForm = ({
  bindings: { username, email, name, password, repeatPassword },
  errors,
  onSubmit,
  isSigningUp,
}: SignupFormProps) => {
  const history = useHistory();

  const onClickLogin = () => {
    history.push('/login');
  };

  return (
    <div className="Signup">
      <Container>
        <Form noValidate onSubmit={onSubmit}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              {...username}
              isInvalid={errors && !!errors.username}
            />
            <Form.Control.Feedback type="invalid">
              {errors?.username}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              {...email}
              required
              isInvalid={errors && !!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors?.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              {...name}
              required
              isInvalid={errors && !!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors?.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              {...password}
              required
              isInvalid={errors && !!errors.password}
              autoComplete="on"
            />
            <Form.Control.Feedback type="invalid">
              {errors?.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formRepeatPassword">
            <Form.Label>Repeat Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              {...repeatPassword}
              required
              isInvalid={errors && !!errors.repeatPassword}
              autoComplete="on"
            />
            <Form.Control.Feedback type="invalid">
              {errors?.repeatPassword}
            </Form.Control.Feedback>
          </Form.Group>

          <Row>
            <Col>
              <Button variant="primary" type="submit" disabled={isSigningUp}>
                Signup
              </Button>
            </Col>
            <Col className="text-right">
              <Button variant="outline-secondary" onClick={onClickLogin}>
                Go to Login
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default SignupForm;
