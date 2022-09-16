import React, { useState } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Modal, ModalProps, Pressable, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Heading } from '../Heading';

import { styles } from './styles';
import { THEME } from '../../theme';
import { CheckCircle } from 'phosphor-react-native';

interface Props extends ModalProps {
  discord: string;
  onclose: () => void;
}

export function DuoMatch({discord, onclose, ...rest}: Props) {
  const [isCopying, setIsCopying] = useState(false);

  async function handleCopyDiscordToClipboard() {
    setIsCopying(true);

    await Clipboard.setStringAsync(discord);

    Alert.alert(
      "Discord copiado!",
      "Usuário copiado para você colar no Discord!"
    )

    setIsCopying(false);
  };

  return (
    <Modal 
      animationType='fade'
      statusBarTranslucent
      transparent 
      {...rest}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.closeContent}>
            <Pressable onPress={onclose}>
              <TouchableOpacity style={styles.closeIcon}>
                <MaterialIcons 
                  name='close' 
                  size={20}
                  color={THEME.COLORS.CAPTION_500}
                />
              </TouchableOpacity>
            </Pressable>
          </View>

          <CheckCircle 
            size={64}
            color={THEME.COLORS.SUCCESS}
            weight='bold'
          />

          <Heading
            title='Let’s play!'
            subTitle='Agora é só começar a jogar!'
            style={{alignItems: 'center', marginTop: 24}}
          />
          
          <Text style={styles.label}>
            Adicione no Discord
          </Text>

          <Pressable
            onPress={handleCopyDiscordToClipboard}
            disabled={isCopying}
           >
            <TouchableOpacity
              style={styles.discordButton}
            >
              <Text style={styles.discord}>
                {isCopying ? <ActivityIndicator color={THEME.COLORS.PRIMARY}/> :  discord}
              </Text>
            </TouchableOpacity>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}