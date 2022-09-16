import 'react-native-gesture-handler';
import './src/services/notificationsConfig';
import { useRef, useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { getPushNotificationToken } from './src/services/getPushNotificationToken';
import { StatusBar } from 'react-native';
import { Background } from './src/components/Background';

import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from '@expo-google-fonts/inter';

import { Loading } from './src/components/Loading';
import { Routes } from './src/routes';
import { Subscription } from 'expo-modules-core';

export default function App() {
  const getNotificationsListener = useRef<Subscription>();
  const responseNotificationsListener = useRef<Subscription>();

  const [fontsLoaded] = useFonts({  
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  });
  
  useEffect(() => {
    getPushNotificationToken()
  }, []);

  useEffect(() => {
    getNotificationsListener.current = Notifications
    .addNotificationReceivedListener(notification => {
      console.log(notification)
    })

    responseNotificationsListener.current = Notifications
    .addNotificationResponseReceivedListener(response => {
      console.log(response)
    })

    return () => {
      if(getNotificationsListener.current && responseNotificationsListener.current) {
        Notifications.removeNotificationSubscription(getNotificationsListener.current);
        Notifications.removeNotificationSubscription(responseNotificationsListener.current);
      }
    }
  }, []);

  return (
    <Background>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor='transparent'
        translucent 
      />

      {fontsLoaded ? <Routes />: <Loading/>}
    </Background>
  );
}
