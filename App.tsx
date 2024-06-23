import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Octicons } from '@expo/vector-icons';

// Importação das telas
import Dashboard from './components/screens/Dashboard';
import Listagem from './components/screens/Listagem';
import Pesquisa from './components/screens/Pesquisa';
import Totais from './components/screens/Totais';

// Importação dos estilos
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Início da função DashboardStack
function DashboardStack() {
  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false, // Oculta o cabeçalho por padrão para todas as telas
    }}>
      <Stack.Screen name="Cadastrar" component={Dashboard} />
    </Stack.Navigator>
  );
}

// Início da função ListagemStack
function ListagemStack() {
  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false, // Oculta o cabeçalho por padrão para todas as telas
    }}>
      <Stack.Screen name="Listagem" component={Listagem} />
    </Stack.Navigator>
  );
}

// Início da função PesquisaStack
function PesquisaStack() {
  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false, // Oculta o cabeçalho por padrão para todas as telas
    }}>
      <Stack.Screen name="Pesquisa" component={Pesquisa} />
    </Stack.Navigator>
  );
}

// Início da função TotaisStack
function TotaisStack() {
  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false, // Oculta o cabeçalho por padrão para todas as telas
    }}>
      <Stack.Screen name="Totais" component={Totais} />
    </Stack.Navigator>
  );
}

// Início da função Tabs
function Tabs() {
  return (
<Tab.Navigator
  screenOptions={({ route }) => ({
    headerShown: false, // Oculta o cabeçalho por padrão para todas as telas
    tabBarIcon: ({ color, size }) => {
      let iconName;
// Definição dos ícones para cada tela
      if (route.name === 'CADASTRO') {
        iconName = 'diff-added' as const;
      } else if (route.name === 'LISTAGEM') {
        iconName = 'list-unordered' as const;
      } else if (route.name === 'PESQUISA') {
        iconName = 'search' as const;
      } else if (route.name === 'TOTAIS') {
        iconName = 'graph' as const;
      }

      // Retorna o ícone correspondente
      return <Octicons name={iconName} size={size} color={color} />;
    },
  })}
  // Definição das cores para os ícones ativos e inativos
>
  <Tab.Screen name="CADASTRO" component={DashboardStack} />
  <Tab.Screen name="LISTAGEM" component={ListagemStack} />
  <Tab.Screen name="PESQUISA" component={PesquisaStack} />
  <Tab.Screen name="TOTAIS" component={TotaisStack} />
</Tab.Navigator>
  );
}
// Início da função App
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Dashboard">
        <Drawer.Screen name="Cadastro" component={Tabs} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
