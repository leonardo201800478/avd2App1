import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { data } from '../data';
import { styles } from './styles/ListagemStyles';

const Listagem: React.FC = () => {
  const handleDeletar = (index: number) => {
    Alert.alert(
      "Confirmação",
      "Você tem certeza que deseja excluir este registro?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Excluir",
          onPress: () => {
            data.splice(index, 1);
            Alert.alert("Sucesso", "Registro excluído com sucesso");
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listagem de Produtos</Text>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={styles.item} onPress={() => handleDeletar(index)}>
            <Text>{`Mês/Ano: ${item.mesAno}, Produto: ${item.produto}, Quantidade: ${item.quantidade}, Valor Unitário: ${item.valorUnitario}, Cliente: ${item.cliente}`}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default Listagem;
