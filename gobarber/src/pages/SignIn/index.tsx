import React from 'react';
import {
  Image,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Title,
  ForgotPassord,
  ForgotPassordText,
  CreateAcccountButtonText,
  CreateAcccountButton,
} from './styles';
import logoImg from '../../assets/logo.png';

const SignIn: React.FC = () => {
  const navigation = useNavigation();
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Image source={logoImg} />
            <View>
              <Title>Faça seu Logon</Title>
            </View>

            <Input name="email" icon="mail" placeholder="E-mail" />
            <Input name="password" icon="lock" placeholder="Senha" />
            <Button onPress={() => {}}>Entrar</Button>
            <ForgotPassord onPress={() => {}}>
              <ForgotPassordText>Esqueci minha senha</ForgotPassordText>
            </ForgotPassord>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <CreateAcccountButton onPress={() => navigation.navigate('SignUp')}>
        <Icon name="log-in" size={20} color="#ff9000" />
        <CreateAcccountButtonText>Criar uma conta</CreateAcccountButtonText>
      </CreateAcccountButton>
    </>
  );
};

export default SignIn;
