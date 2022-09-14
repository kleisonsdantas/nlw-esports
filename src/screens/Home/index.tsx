import React from 'react';
import { FlatList, Image, ScrollView, View } from 'react-native';

import logoImg from '../../assets/logo-nlw-esports.png';
import { GameCard } from '../../components/GameCard';
import { Heading } from '../../components/Heading';
import { GAMES } from '../../utils/games';

import { styles } from './styles';

export function Home() {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
          <Image 
            style={styles.logo}
            source={logoImg}
          />

          <Heading
            title='Encontre seu duo!'
            subTitle='Selecione o game que deseja jogar...'
            /> 

          <FlatList
            contentContainerStyle={styles.contentList}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={GAMES}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <GameCard
                data={item}
              />
            )}
          />

      </View>
    </ScrollView>
  );
}