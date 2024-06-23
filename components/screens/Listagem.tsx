import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { data } from '../data';
import { styles } from '../styles/ListagemStyles';

const Stack = createStackNavigator();

const Listagem: React.FC = () => {
  const [listaData, setListaData] = useState(data);

  useEffect(() => {
    // Atualizar 'listaData' sempre que 'data' mudar
    setListaData([...data]);
  }, [data]);

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
            // Remover o item do array 'listaData'
            const newData = [...listaData];
            newData.splice(index, 1);
            // Atualizar o estado local 'listaData' para refletir a exclusão
            setListaData(newData);
            Alert.alert("Sucesso", "Registro excluído com sucesso");
          }
        }
      ]
    );
  };

  const handleAtualizarLista = () => {
    // Atualizar 'listaData' com os dados atuais de 'data'
    setListaData([...data]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Atualizar Lista" onPress={handleAtualizarLista} />
      </View>
      <Text style={styles.title}>Listagem de Produtos</Text>
      <FlatList
        data={listaData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={styles.item} onPress={() => handleDeletar(index)}>
            <Text>{`Mês/Ano: ${item.mesAno}, Produto: ${item.produto}, Quantidade: ${item.quantidade}, Valor Unitário: ${item.valorUni}, Cliente: ${item.cliente}`}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

function ListagemStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ListagemScreen"
        component={Listagem}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default Listagem;
