import { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  FlatList, StyleSheet, StatusBar, KeyboardAvoidingView, Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TarefaItem from './components/TarefaItem';
 
const STORAGE_KEY = 'memolist_tarefas';
 
export default function App() {
  const [tarefas, setTarefas] = useState([]);
  const [texto, setTexto] = useState('');
 
  // Carrega tarefas salvas
  useEffect(() => {
    const carregar = async () => {
      const salvo = await AsyncStorage.getItem(STORAGE_KEY);
      if (salvo) setTarefas(JSON.parse(salvo));
    };
    carregar();
  }, []);
 
  // Salva no AsyncStorage
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tarefas));
  }, [tarefas]);
 
  // Contador de pendentes
  const pendentes = tarefas.filter(t => !t.concluida).length;
 
  const adicionarTarefa = () => {
    if (texto.trim() === '') return;
    const nova = {
      id: Date.now().toString(),
      texto: texto.trim(),
      concluida: false,
    };
    setTarefas([nova, ...tarefas]);
    setTexto('');
  };
 
  const toggleTarefa = (id) => {
    setTarefas(tarefas.map(t =>
      t.id === id ? { ...t, concluida: !t.concluida } : t
    ));
  };
 
  const removerTarefa = (id) => {
    setTarefas(tarefas.filter(t => t.id !== id));
  };
 
  const limparTudo = async () => {
    setTarefas([]);
    await AsyncStorage.removeItem(STORAGE_KEY);
  };
 
  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="light-content" backgroundColor="#0d0d0d" />
 
      <View style={styles.container}>
 
        {/* Cabeçalho */}
        <Text style={styles.titulo}>📝 MemoList</Text>
 
        {/* Contador de pendentes */}
        <View style={styles.contadorBox}>
          <Text style={styles.contadorTexto}>
            {pendentes === 0
              ? '✅ Nenhuma tarefa pendente!'
              : `⏳ ${pendentes} tarefa${pendentes > 1 ? 's' : ''} pendente${pendentes > 1 ? 's' : ''}`}
          </Text>
        </View>
 
        {/* Input + botão adicionar */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Nova tarefa..."
            placeholderTextColor="#555"
            value={texto}
            onChangeText={setTexto}
            onSubmitEditing={adicionarTarefa}
            returnKeyType="done"
          />
          <TouchableOpacity style={styles.botaoAdicionar} onPress={adicionarTarefa}>
            <Text style={styles.botaoAdicionarTexto}>＋</Text>
          </TouchableOpacity>
        </View>
 
        {/* Lista de tarefas */}
        <FlatList
          data={tarefas}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TarefaItem
              tarefa={item}
              onToggle={toggleTarefa}
              onRemover={removerTarefa}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.listaVazia}>Nenhuma tarefa ainda. Adicione uma!</Text>
          }
          style={styles.lista}
          showsVerticalScrollIndicator={false}
        />
 
        {/* Botão Limpar tudo */}
        {tarefas.length > 0 && (
          <TouchableOpacity style={styles.botaoLimpar} onPress={limparTudo}>
            <Text style={styles.botaoLimparTexto}>🗑️ Limpar tudo</Text>
          </TouchableOpacity>
        )}
 
      </View>
    </KeyboardAvoidingView>
  );
}
 
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#0d0d0d',
  },
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
 
  // Cabeçalho
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
 
  // Contador
  contadorBox: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  contadorTexto: {
    color: '#aaa',
    fontSize: 14,
  },
 
  // Input
  inputRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    color: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  botaoAdicionar: {
    backgroundColor: '#ac0c79',
    borderRadius: 12,
    paddingHorizontal: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoAdicionarTexto: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
 
  // Lista
  lista: {
    flex: 1,
  },
  listaVazia: {
    color: '#444',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 14,
  },
 
  // Botão limpar
  botaoLimpar: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#3a1a1a',
  },
  botaoLimparTexto: {
    color: '#e74c3c',
    fontSize: 15,
    fontWeight: '600',
  },
});
