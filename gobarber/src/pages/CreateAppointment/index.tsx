import React, { useCallback, useState, useEffect } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import  Icon  from 'react-native-vector-icons/Feather';
import { Platform } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useAuth } from '../../hooks/AuthContext';
import { Container, 
  BackButton, 
  HeaderTitle, 
  UserAvatar, 
  Header, 
  ProvidersListContainer, 
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  Calendar,
  Title,
  OpenDatePickerButton,
  OpenDatePickerButtonText

 } from './styles';
import api from '../../services/api';


interface RouteParams {
  providerId: string;
}

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const CreateAppointment: React.FC = () => {
  const {user} = useAuth();
  const route = useRoute();
  const { goBack} = useNavigation();

  
  const routeParams = route.params as RouteParams;
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState( new Date());
  const [providers, setProviders] = useState<Provider[]>([]); 
  const [selectedProvider, setSelectedProvider] =  useState(routeParams.providerId)

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  useEffect(() => {
    api.get('providers').then((response) => {
      setProviders(response.data);
    });
  }, []);

  const handleSelectedProvider = useCallback((providerId: string) => {
    setSelectedProvider(providerId);
  }, []);

  const handleTogglePicker = useCallback(() => {
    setShowDatePicker(!showDatePicker);
  }, [showDatePicker]);

  const handleDateChanged = useCallback((event: any, date: Date | undefined ) => {
    if( Platform.OS === 'android') {
      setShowDatePicker(false);
    }

    if (date) {
      setSelectedDate(date);
    }
   
  },[])
  
  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>
        <HeaderTitle>Cabeleireiros</HeaderTitle>
        <UserAvatar source={{uri: user.avatar_url}} />
      </Header>

     <ProvidersListContainer>
      <ProvidersList
          horizontal 
          showsHorizontalScrollIndicator={false}
          data={providers}
          keyExtractor={provider => provider.id}
          renderItem={({item: provider}) => (
            <ProviderContainer
              onPress={() => handleSelectedProvider(provider.id)}
              selected={provider.id === selectedProvider}
            >
              <ProviderAvatar source={{ uri: provider.avatar_url}} />
              <ProviderName
                selected={provider.id === selectedProvider}
              >
                {provider.name}
              </ProviderName>
            </ProviderContainer>
        )} />
     </ProvidersListContainer>

     <Calendar>
       <Title>Escolha a data</Title>
       <OpenDatePickerButton  onPress={handleTogglePicker}>
            <OpenDatePickerButtonText>Selecionar outra Data</OpenDatePickerButtonText>
        </OpenDatePickerButton>
      {showDatePicker && (
        <DateTimePicker 
            mode="date"
            display="calendar"
            onChange={handleDateChanged}
            textColor="#f4ede8"
            value={selectedDate} 
        />
      )}
     </Calendar>
    </Container>
  )
};

export default CreateAppointment;
