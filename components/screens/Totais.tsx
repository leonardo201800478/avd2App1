import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'; // Import createStackNavigator from '@react-navigation/stack'
import { data } from '../data';
import { styles } from '../styles/TotaisStyles';

const Stack = createStackNavigator(); // Add this line to create a Stack navigator
// Início da função do Stack Navigator
function TotaisStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TotaisScreen"
        component={Totais}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const Totais: React.FC = () => {
  const [mesAno, setMesAno] = useState('');
  const [cliente, setCliente] = useState('');
  const [valorTotal, setValorTotal] = useState<number | null>(null);
// Função para calcular os totais
  const handleCalcularTotais = () => {
    const clienteLower = cliente.toLowerCase().trim();
// Filtrar os itens de acordo com os campos preenchidos    
    const total = data
      .filter(item => item.mesAno === mesAno && item.cliente === clienteLower)
      .reduce((sum, item) => sum + (item.quantidade * item.valorUni), 0);
    setValorTotal(total);
  };
// Retorno da função
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Totais por Cliente</Text>
      <Text style={styles.label}>Mês e Ano</Text>
      <TextInput placeholder="MMYYYY" value={mesAno} onChangeText={setMesAno} style={styles.input} keyboardType="numeric" />
      <Text style={styles.label}>Cliente</Text>
      <TextInput placeholder="Cliente" value={cliente} onChangeText={setCliente} style={styles.input} />
      <Button title="Calcular Totais" onPress={handleCalcularTotais} />
      {valorTotal !== null && (
        <Text>{`Valor Total: R$ ${valorTotal.toFixed(2)}`}</Text>
      )}
    </View>
  );
}
// Exportar a função
export default Totais;
