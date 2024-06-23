import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from './components/Dashboard';
import Listagem from './components/Listagem';
import Pesquisa from './components/Pesquisa';
import Totais from './components/Totais';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Listagem" component={Listagem} />
        <Stack.Screen name="Pesquisa" component={Pesquisa} />
        <Stack.Screen name="Totais" component={Totais} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
