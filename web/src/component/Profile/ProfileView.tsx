import React from 'react';
import { Col, Row} from 'react-bootstrap';
import { UserInfoModel } from '../../model/UserInfoModel';
import './ProfileView.css';

export type ProfileViewProps = {
  userInfo: UserInfoModel;
};

const ProfileView = ({ userInfo }: ProfileViewProps) => (
  <>
    <Row>
      <Col><h1>User Info</h1></Col>
    </Row>
    <Row>
      <Col>Username: {userInfo.username}</Col>
    </Row>

    <Row>
      <Col>Name: {userInfo.name}</Col>
    </Row>

    <Row>
      <Col>Email: {userInfo.email}</Col>
    </Row>
  </>
);

export default ProfileView;
