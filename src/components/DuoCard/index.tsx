import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { DuoInfo } from '../DuoInfo';
import { GameController } from 'phosphor-react-native';

import { styles } from './styles';
import { THEME } from '../../theme';
import { TouchableOpacity } from 'react-native-gesture-handler';

export interface DuoCardProps {
  hoursEnd: string;
  hoursStart: string;
  id: string;
  name: string;
  useVoiceChannel: boolean;
  weekDays: number [];
  yearsPlaying: number,
}

interface Props {
  data: DuoCardProps;
  onConnect: () => void;
}

export function DuoCard({ data, onConnect }: Props) {
  return (
    <View style={styles.container}>
      <DuoInfo
        label='Nome'
        value={data.name}
      />
      <DuoInfo
        label='Tempo de jogo'
        value={`${data.yearsPlaying} anos`}
      />
      <DuoInfo
        label='Disponibilidade'
        value={`${data.weekDays.length} dias \u2022 ${data.hoursStart} ~ ${data.hoursEnd}`}
      />
      <DuoInfo
        label='Chamada de áudio?'
        value={data.useVoiceChannel ? 'Sim' : 'Não'}
        colorValue={data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}
      />

      <Pressable
        onPress={onConnect}
      >
        <TouchableOpacity 
          style={styles.button}
        >
          <GameController 
            color={THEME.COLORS.TEXT}
            size={20}
          />

          <Text 
            style={styles.buttonTitle}
          >
            Conectar
          </Text>
        </TouchableOpacity>
      </Pressable>
    </View>
  );
}