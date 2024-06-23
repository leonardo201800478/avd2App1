import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { data } from '../data';
import { styles } from './styles/ListagemStyles';

const Listagem: React.FC = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{`Mês/Ano: ${item.mesAno}, Produto: ${item.produto}, Quantidade: ${item.quantidade}, Valor Unitário: ${item.valorUnitario}, Cliente: ${item.cliente}`}</Text>
          </View>
        )}
      />
    </View>
  );
}

export default Listagem;
