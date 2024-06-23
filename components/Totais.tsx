import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { data } from '../data';
import { styles } from './styles/TotaisStyles';

const Totais: React.FC = () => {
  const [mesAno, setMesAno] = useState('');
  const [cliente, setCliente] = useState('');
  const [valorTotal, setValorTotal] = useState<number | null>(null);

  const handleCalcularTotais = () => {
    const clienteLower = cliente.toLowerCase().trim();
    
    const total = data
      .filter(item => item.mesAno === mesAno && item.cliente === clienteLower)
      .reduce((sum, item) => sum + (item.quantidade * item.valorUnitario), 0);
    setValorTotal(total);
  };

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

export default Totais;
