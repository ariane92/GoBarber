import React, { useState, useCallback, useEffect, useMemo } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { FiPower, FiClock } from 'react-icons/fi';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Section,
  Appointment,
  Calendar,
} from './styles';

import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/AuthContext';
import api from '../../services/api';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}
const Dashboard: React.FC = () => {
  const { SignOut, user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  useEffect(() => {
    api
      .get(`/providers/${user.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then((response) => {
        setMonthAvailability(response.data);
      });
  }, [currentMonth, user.id]);

  const disableDays = useMemo(() => {
    const dates = monthAvailability
      .filter((monthDay) => monthDay.available === false)
      .map((monthDay) => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        return new Date(year, month, monthDay.day);
      });
    return dates;
  }, [currentMonth, monthAvailability]);

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

          <Section>
            <strong>Manhã</strong>
            <Appointment>
              <span>
                <FiClock /> 11:00
              </span>
              <div>
                <img
                  src="https://media-exp1.licdn.com/dms/image/C4D03AQFXemYjJXC_Rw/profile-displayphoto-shrink_100_100/0?e=1596067200&v=beta&t=2DL0dbVIn9TYFtyCxryumdkUbCsfrYZfRU-bQ_godzY"
                  alt="Ariane Mateus"
                />
                <strong>Ariane Mateus</strong>
              </div>
            </Appointment>
          </Section>
          <Section>
            <strong>Tarde</strong>

            <Appointment>
              <span>
                <FiClock /> 14:00
              </span>
              <div>
                <img
                  src="https://media-exp1.licdn.com/dms/image/C4D03AQFXemYjJXC_Rw/profile-displayphoto-shrink_100_100/0?e=1596067200&v=beta&t=2DL0dbVIn9TYFtyCxryumdkUbCsfrYZfRU-bQ_godzY"
                  alt="Ariane Mateus"
                />
                <strong>Ariane Mateus</strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock /> 17:00
              </span>
              <div>
                <img
                  src="https://media-exp1.licdn.com/dms/image/C4D03AQFXemYjJXC_Rw/profile-displayphoto-shrink_100_100/0?e=1596067200&v=beta&t=2DL0dbVIn9TYFtyCxryumdkUbCsfrYZfRU-bQ_godzY"
                  alt="Ariane Mateus"
                />
                <strong>Ariane Mateus</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>
        <Calendar>
          <DayPicker
            weekdaysShort={['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disableDays]}
            modifiers={{ available: { daysOfWeek: [1, 2, 3, 4, 5] } }}
            onDayClick={handleDateChange}
            selectedDays={selectedDate}
            onMonthChange={handleMonthChange}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
