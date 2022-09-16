import React, { useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, View, Text, Pressable } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GameParams } from '../../@types/navigation';
import { Background } from '../../components/Background';
import { Entypo } from '@expo/vector-icons'

import { styles } from './styles';
import { THEME } from '../../theme';

import logoImg from '../../assets/logo-nlw-esports.png';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { DuoMatch } from '../../components/DuoMatch';


export function Game() {
  const navigation = useNavigation();
  const route = useRoute();
  const game = route.params as GameParams;

  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState('');

  function handleGoBack() {
    navigation.goBack();
  }

  async function getDiscordUser(adsId: string) {
    fetch(`http://192.168.0.9:3333/ads/${adsId}/discord`)
    .then(response => response.json())
    .then(data => {
      setDiscordDuoSelected(data.discord)
    })
    console.log('Aqui')
  }

  useEffect(() => {
    fetch(`http://192.168.0.9:3333/games/${game.id}/ads`)
    .then(response => response.json())
    .then(data => {
      setDuos(data)
    })
  }, [])

  return (
    <Background>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Pressable onPress={handleGoBack}>
              <TouchableOpacity>
                <Entypo 
                  name='chevron-thin-left'
                  color={THEME.COLORS.CAPTION_300}
                  size={20}
                />
              </TouchableOpacity>
            </Pressable>

            <Image 
              style={styles.logo}
              source={logoImg}
            />

            <View style={styles.right}/>
          </View>

          <Image 
            style={styles.cover}
            source={{uri: game.bannerUrl}}
            resizeMode='cover'
          />

          <Heading
            title={game.title}
            subTitle='Conecte-se e comece a jogar!'
          />
          
          <FlatList
            style={styles.containerList}
            contentContainerStyle={duos.length > 0 ? styles.contentList : styles.emptyContentList}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={duos}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <DuoCard
                data={item}
                onConnect={() => getDiscordUser(item.id)}
              />
            )}
            ListEmptyComponent={() =>(
              <Text style={styles.emptyListText}>
                Não há anúncios cadastrados ainda.
              </Text>
            )}
          />

          <DuoMatch 
            visible={!!discordDuoSelected}
            discord={discordDuoSelected}
            onclose={() => setDiscordDuoSelected('')}
          />
        </SafeAreaView>
      </ScrollView>
    </Background>
  );
}