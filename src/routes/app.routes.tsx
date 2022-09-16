import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '../screens/Home';
import { Game } from '../screens/Game';

const { Navigator, Screen } = createStackNavigator();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name='home' component={Home}/>
      <Screen name='game' component={Game}/>
    </Navigator>
  );
}