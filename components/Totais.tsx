import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { data } from '../data';
import { styles } from './styles/TotaisStyles';

const Totais: React.FC = () => {
  const [mesAno, setMesAno] = useState('');
  const [cliente, setCliente] = useState('');
  const [valorTotal, setValorTotal] = useState<number | null>(null);

  const handleCalcularTotais = () => {
    const total = data
      .filter(item => item.mesAno === mesAno && item.cliente === cliente)
      .reduce((sum, item) => sum + (item.quantidade * item.valorUnitario), 0);
    setValorTotal(total);
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Mês e Ano" value={mesAno} onChangeText={setMesAno} style={styles.input} />
      <TextInput placeholder="Cliente" value={cliente} onChangeText={setCliente} style={styles.input} />
      <Button title="Calcular Totais" onPress={handleCalcularTotais} />
      {valorTotal !== null && (
        <Text>{`Valor Total: ${valorTotal}`}</Text>
      )}
    </View>
  );
}

export default Totais;
