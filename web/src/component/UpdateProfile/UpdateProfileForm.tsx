import React from 'react';
import { Button, Col, Container, Form, FormProps, Row } from 'react-bootstrap';
import { Binder } from '../../hook/useBind';
import { UserUpdateModel } from '../../model/UserUpdateModel';
import './UpdateProfileForm.css';

export type UpdateProfileFormBindings = {
  [k in keyof UserUpdateModel]: Binder;
} & {
  repeatPassword: Binder;
};

export type UpdateProfileErrors =
  | undefined
  | Partial<
      {
        [k in keyof UpdateProfileFormBindings]: string | string[];
      }
    >;

export type UpdateProfileFormProps = {
  bindings: UpdateProfileFormBindings;
  errors: UpdateProfileErrors;
  onSubmit: FormProps['onSubmit'];
  isUpdating: boolean;
};

const UpdateProfileForm = ({
  bindings: { email, name, password, repeatPassword },
  errors,
  onSubmit,
  isUpdating,
}: UpdateProfileFormProps) => (
  <div className="Signup">
    <Container>
      <Form noValidate onSubmit={onSubmit}>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            {...email}
            required
            autoComplete="off"
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
            autoComplete="new-password"
            isInvalid={errors && !!errors.password}
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
            autoComplete="new-password"
            isInvalid={errors && !!errors.repeatPassword}
          />
          <Form.Control.Feedback type="invalid">
            {errors?.repeatPassword}
          </Form.Control.Feedback>
        </Form.Group>

        <Row>
          <Col>
            <Button variant="primary" type="submit" disabled={isUpdating}>
              Update
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  </div>
);

export default UpdateProfileForm;
