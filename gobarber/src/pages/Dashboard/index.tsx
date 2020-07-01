import React, { useCallback } from 'react';

import { useAuth } from '../../hooks/AuthContext';
import { Container, Header, HeaderTitle, UserName, ProfileButton, UserAvatar } from './stytes';
import { useNavigation } from '@react-navigation/native';
import {View, Button} from 'react-native';

const Dashboard: React.FC = () => {
  const { SignOut, user } = useAuth();
  const { navigate } = useNavigation();
  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo, {'\n'}
          <UserName>{user.name}</UserName>
        </HeaderTitle>
        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar source={{ uri: user.avatar_url }} />
        </ProfileButton>
      </Header>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Button title='sair' onPress={SignOut} />
      </View>
    </Container>
  );
};

export default Dashboard;
