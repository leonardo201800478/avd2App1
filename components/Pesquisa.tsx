import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { data } from '../data';
import { styles } from './styles/PesquisaStyles';

const Pesquisa: React.FC = () => {
  const [mesAno, setMesAno] = useState('');
  const [produto, setProduto] = useState('');
  const [cliente, setCliente] = useState('');
  const [resultado, setResultado] = useState<any[]>([]);

  const handlePesquisar = () => {
    const produtoLower = produto.toLowerCase().trim();
    const clienteLower = cliente.toLowerCase().trim();
    
    const filtro = data.filter(item =>
      (produto ? item.produto === produtoLower : true) &&
      (cliente ? item.cliente === clienteLower : true) &&
      item.mesAno === mesAno
    );
    setResultado(filtro);
  };

  const calcularValorTotal = () => {
    return resultado.reduce((total, item) => total + (item.quantidade * item.valorUnitario), 0).toFixed(2);
  };

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
            <Text>{`Mês/Ano: ${item.mesAno}, Produto: ${item.produto}, Quantidade: ${item.quantidade}, Valor Unitário: ${item.valorUnitario}, Cliente: ${item.cliente}`}</Text>
          </View>
        )}
      />
      {resultado.length > 0 && (
        <Text>{`Valor Total: ${calcularValorTotal()}`}</Text>
      )}
    </View>
  );
}

export default Pesquisa;
