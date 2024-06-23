import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { data } from '../data';
import { styles } from './styles/DashboardStyles';

const validProducts = ['30-320', '20-280', '40-280', '50-310'];
const validClients = ['VolksWagen', 'Nissan', 'Hyundai', 'Peugeot'];

const Dashboard: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [mesAno, setMesAno] = useState('');
  const [produto, setProduto] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [valorUnitario, setValorUnitario] = useState('');
  const [cliente, setCliente] = useState('');

  const handleCadastrar = () => {
    if (!mesAno || !produto || !quantidade || !valorUnitario || !cliente) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios');
      return;
    }

    if (!validProducts.includes(produto.trim())) {
      Alert.alert('Erro', 'Produto inválido');
      return;
    }

    if (!validClients.includes(cliente.trim())) {
      Alert.alert('Erro', 'Cliente inválido');
      return;
    }

    const novoRegistro = {
      mesAno: mesAno.trim(),
      produto: produto.trim(),
      quantidade: parseInt(quantidade),
      valorUnitario: parseFloat(valorUnitario),
      cliente: cliente.trim()
    };

    data.push(novoRegistro);
    Alert.alert('Sucesso', 'Cadastro realizado com sucesso');
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Mês e Ano" value={mesAno} onChangeText={setMesAno} style={styles.input} />
      <TextInput placeholder="Produto" value={produto} onChangeText={setProduto} style={styles.input} />
      <TextInput placeholder="Quantidade" value={quantidade} onChangeText={setQuantidade} keyboardType="numeric" style={styles.input} />
      <TextInput placeholder="Valor Unitário" value={valorUnitario} onChangeText={setValorUnitario} keyboardType="numeric" style={styles.input} />
      <TextInput placeholder="Cliente" value={cliente} onChangeText={setCliente} style={styles.input} />
      <Button title="Cadastrar" onPress={handleCadastrar} />
      <Button title="Listagem" onPress={() => navigation.navigate('Listagem')} />
      <Button title="Pesquisa" onPress={() => navigation.navigate('Pesquisa')} />
      <Button title="Totais" onPress={() => navigation.navigate('Totais')} />
    </View>
  );
}

export default Dashboard;
