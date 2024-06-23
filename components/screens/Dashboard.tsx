import React, { useState } from 'react';
import { TextInput, Button, Alert, Text, ScrollView } from 'react-native';
import { data } from '../data';
import { styles } from '../styles/DashboardStyles';
import { TextInputMask } from 'react-native-masked-text';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

//Inicio da Função do Stack Navigator
function DashboardStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CadastrarScreen"
        component={Dashboard}
        options={{ headerShown: false }} // oculta o nome da tela no cabeçalho
      />
    </Stack.Navigator>
  );
}

//Campos que deverão ser aceitos
const validProducts = ['30-320', '20-280', '40-280', '50-310'];
const validClients = ['Volkswagen', 'Nissan', 'Hyundai', 'Peugeot'];

//Cadastro das variáveis
const Dashboard: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [mesAno, setMesAno] = useState('');
  const [produto, setProduto] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [valorUni, setValorUni] = useState('');
  const [cliente, setCliente] = useState('');

  //Aceitando tanto letras maiúsculas quanto minúsculas
  const handleCadastrar = () => {
    const produtoLower = produto.toLowerCase().trim();
    const clienteLower = cliente.toLowerCase().trim();
//Verificação de campos vazios
    if (!mesAno || !produto || !quantidade || !valorUni || !cliente) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios');
      return;
    }
//Verificação de campos inválidos
    if (!validProducts.map(p => p.toLowerCase()).includes(produtoLower)) {
      Alert.alert('Erro', 'Produto inválido');
      return;
    }
//Verificação de campos inválidos
    if (!validClients.map(c => c.toLowerCase()).includes(clienteLower)) {
      Alert.alert('Erro', 'Cliente inválido');
      return;
    }

    // Tratar valor unitário antes de salvar no estado
    const valorNum = parseFloat(valorUni.replace('R$', '').replace('.', '').replace(',', '.'));

    const novoRegistro = {
      mesAno: mesAno.trim(),
      produto: produtoLower,
      quantidade: parseInt(quantidade),
      valorUni: valorNum, // Salvar o valor numérico corretamente
      cliente: clienteLower,
    };

//Adicionando novo registro
    data.push(novoRegistro);
    Alert.alert('Sucesso', 'Cadastro realizado com sucesso');
    limparCampos();
  };

  //Limpar campos após cadastro
  const limparCampos = () => {
    setMesAno('');
    setProduto('');
    setQuantidade('');
    setValorUni('');
    setCliente('');
  };
//Retorno dos campos
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cadastro de Produtos</Text>
      <Text style={styles.label}>Mês e Ano</Text>
      <TextInput
        placeholder="MMYYYY"
        value={mesAno}
        onChangeText={setMesAno}
        style={styles.input}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Produto</Text>
      <TextInput
        placeholder="Produto"
        value={produto}
        onChangeText={setProduto}
        style={styles.input}
      />
      <Text style={styles.label}>Quantidade</Text>
      <TextInput
        placeholder="Quantidade"
        value={quantidade}
        onChangeText={setQuantidade}
        keyboardType="numeric"
        style={styles.input}
      />
      <Text style={styles.label}>Valor Unitário</Text>
      <TextInputMask
        type={'money'}
        options={{
          precision: 2,
          separator: ',',
          delimiter: '.',
          unit: 'R$ ',
          suffixUnit: '',
        }}
        value={valorUni}
        onChangeText={text => setValorUni(text)}
        style={styles.input}
      />
      <Text style={styles.label}>Cliente</Text>
      <TextInput
        placeholder="Cliente"
        value={cliente}
        onChangeText={setCliente}
        style={styles.input}
      />
      <Button title="Cadastrar" onPress={handleCadastrar} />
    </ScrollView>
  );
}
//Exportação da função
export default Dashboard;
