import React from 'react';
import { FiPower, FiClock } from 'react-icons/fi';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  Calendar,
  NextAppointment,
} from './styles';

import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/AuthContext';

const Dashboard: React.FC = () => {
  const { SignOut, user } = useAuth();
  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />

          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem-vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={SignOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 30</span>
            <span>Sabádo</span>
          </p>

          <NextAppointment>
            <strong>Atendimento á seguir</strong>
            <div>
              <img
                src="https://media-exp1.licdn.com/dms/image/C4D03AQFXemYjJXC_Rw/profile-displayphoto-shrink_100_100/0?e=1596067200&v=beta&t=2DL0dbVIn9TYFtyCxryumdkUbCsfrYZfRU-bQ_godzY"
                alt="Ariane Mateus"
              />
              <strong>Ariane Mateus</strong>
              <span>
                {' '}
                <FiClock /> 10:00{' '}
              </span>
            </div>
          </NextAppointment>
        </Schedule>
        <Calendar />
      </Content>
    </Container>
  );
};

export default Dashboard;
