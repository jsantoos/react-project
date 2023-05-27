import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

function App() {
  const [valorCerveja, setValorCerveja] = useState('');
  const [frete, setFrete] = useState('');
  const [pessoas, setPessoas] = useState([{ nome: 'Pessoa 1', cervejas: 0 }]);

  const handleCervejasChange = (index, valor) => {
    const novasPessoas = [...pessoas];
    novasPessoas[index].cervejas = valor;
    setPessoas(novasPessoas);
  };

  const adicionarPessoa = () => {
    setPessoas([...pessoas, { nome: `Pessoa ${pessoas.length + 1}`, cervejas: 0 }]);
  };

  const removerPessoa = (index) => {
    const novasPessoas = [...pessoas];
    novasPessoas.splice(index, 1);
    setPessoas(novasPessoas);
  }

  const handleDecimalInput = (text) => {
    const formattedText = text.replace(",", ".");
    return formattedText;
  };

  const valorTotal = () => {
    const total = pessoas.reduce((total, pessoa) => total + (pessoa.cervejas * parseFloat(valorCerveja)), parseFloat(frete) || 0);
    return isNaN(total) ? "0.00" : total.toFixed(2);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Divisão de Conta do Zé Delivery</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Valor da Cerveja</Text>
        <TextInput
          style={styles.input}
          keyboardType="decimal-pad"
          value={valorCerveja}
          onChangeText={(text) => setValorCerveja(handleDecimalInput(text))}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Frete</Text>
        <TextInput
          style={styles.input}
          keyboardType="decimal-pad"
          value={frete}
          onChangeText={(text) => setFrete(handleDecimalInput(text))}
        />
      </View>

      <Text style={styles.valorTotal}>Valor Total da Compra: {valorTotal()} reais</Text>

      {pessoas.map((pessoa, i) => (
        <View key={i} style={styles.inputContainer}>
          <Text style={styles.personName}>{pessoa.nome}</Text>
          <Text style={styles.label}>Cervejas Pedidas</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={pessoa.cervejas.toString()}
            onChangeText={(text) => handleCervejasChange(i, +text)}
          />
          <Text style={styles.valorPagar}>Valor a Pagar: {(pessoa.cervejas * parseFloat(valorCerveja) + (parseFloat(frete) || 0) / pessoas.length || 0).toFixed(2)} reais</Text>
          {pessoas.length > 1 && 
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => removerPessoa(i)} style={styles.removeButton}>
                <Text style={styles.buttonText}>Remover Pessoa</Text>
              </TouchableOpacity>
            </View>
          }
        </View>
      ))}
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={adicionarPessoa} style={styles.addButton}>
          <Text style={styles.buttonText}>Adicionar Pessoa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: '100%',
  },
  personName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  valorPagar: {
    marginTop: 10,
  },
  valorTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    width: '100%',
  },
  addButton: {
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    width: '60%',
    textAlign: 'center'
  },
  removeButton: {
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    width: '60%',
    textAlign: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default App;
