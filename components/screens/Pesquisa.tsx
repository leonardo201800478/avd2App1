import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { data } from '../data';
import { styles } from '../styles/PesquisaStyles';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
// Início da função do Stack Navigator
function PesquisaStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PesquisaScreen"
        component={Pesquisa}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
// Início da função do Stack Navigator
const Pesquisa: React.FC = () => {
  const [mesAno, setMesAno] = useState('');
  const [produto, setProduto] = useState('');
  const [cliente, setCliente] = useState('');
  const [resultado, setResultado] = useState<any[]>([]);
// Função para pesquisar um item
  const handlePesquisar = () => {
    const produtoLower = produto.toLowerCase().trim();
    const clienteLower = cliente.toLowerCase().trim();
// Filtrar os itens de acordo com os campos preenchidos    
    const filtro = data.filter(item =>
      (produto ? item.produto === produtoLower : true) &&
      (cliente ? item.cliente === clienteLower : true) &&
      item.mesAno === mesAno
    );
    setResultado(filtro);
  };
// Função para calcular o valor total
  const calcularValorTotal = () => {
    return resultado.reduce((total, item) => total + (item.quantidade * item.valorUni), 0).toFixed(2);
  };
// Retorno da função
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pesquisa de Produtos</Text>
      <Text style={styles.label}>Mês e Ano</Text>
      <TextInput placeholder="MMYYYY" value={mesAno} onChangeText={setMesAno} style={styles.input} keyboardType="numeric" />
      <Text style={styles.label}>Produto</Text>
      <TextInput placeholder="Produto" value={produto} onChangeText={setProduto} style={styles.input} />
      <Text style={styles.label}>Cliente</Text>
      <TextInput placeholder="Cliente" value={cliente} onChangeText={setCliente} style={styles.input} />
      <Button title="Pesquisar" onPress={handlePesquisar} />
      <FlatList
        data={resultado}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{`Mês/Ano: ${item.mesAno}, Produto: ${item.produto}, Quantidade: ${item.quantidade}, Valor Unitário: ${item.valorUni}, Cliente: ${item.cliente}`}</Text>
          </View>
        )}
      />
      {resultado.length > 0 && (
        <Text>{`Valor Total: ${calcularValorTotal()}`}</Text>
      )}
    </View>
  );
}
// Exportar a função
export default Pesquisa;
