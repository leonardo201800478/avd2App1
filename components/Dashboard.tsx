import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text, ScrollView } from 'react-native';
import { data } from '../data';
import { styles } from './styles/DashboardStyles';
import { TextInputMask } from 'react-native-masked-text';

const validProducts = ['30-320', '20-280', '40-280', '50-310'];
const validClients = ['VolksWagen', 'Nissan', 'Hyundai', 'Peugeot'];

const Dashboard: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [mesAno, setMesAno] = useState('');
  const [produto, setProduto] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [valorUnitario, setValorUnitario] = useState('');
  const [cliente, setCliente] = useState('');

  const handleCadastrar = () => {
    const produtoLower = produto.toLowerCase().trim();
    const clienteLower = cliente.toLowerCase().trim();

    if (!mesAno || !produto || !quantidade || !valorUnitario || !cliente) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios');
      return;
    }

    if (!validProducts.map(p => p.toLowerCase()).includes(produtoLower)) {
      Alert.alert('Erro', 'Produto inválido');
      return;
    }

    if (!validClients.map(c => c.toLowerCase()).includes(clienteLower)) {
      Alert.alert('Erro', 'Cliente inválido');
      return;
    }

    const novoRegistro = {
      mesAno: mesAno.trim(),
      produto: produtoLower,
      quantidade: parseInt(quantidade),
      valorUnitario: parseFloat(valorUnitario.replace('R$', '').replace(',', '').trim()),
      cliente: clienteLower,
    };

    data.push(novoRegistro);
    Alert.alert('Sucesso', 'Cadastro realizado com sucesso');
    limparCampos();
  };

  const limparCampos = () => {
    setMesAno('');
    setProduto('');
    setQuantidade('');
    setValorUnitario('');
    setCliente('');
  };

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
        value={valorUnitario}
        onChangeText={text => setValorUnitario(text)}
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
      <Button title="Listagem" onPress={() => navigation.navigate('Listagem')} />
      <Button title="Pesquisa" onPress={() => navigation.navigate('Pesquisa')} />
      <Button title="Totais" onPress={() => navigation.navigate('Totais')} />
    </ScrollView>
  );
}

export default Dashboard;
