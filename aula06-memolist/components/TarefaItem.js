import { View, Text, Switch, TouchableOpacity, StyleSheet } from 'react-native';
 
export default function TarefaItem({ tarefa, onToggle, onRemover }) {
  return (
    <View style={styles.container}>
 
      {/* Texto da tarefa: riscado se concluída */}
      <Text style={[styles.texto, tarefa.concluida && styles.textoConcluido]}>
        {tarefa.texto}
      </Text>
 
      <View style={styles.acoes}>
        {/* Switch para marcar como concluída */}
        <Switch
          value={tarefa.concluida}
          onValueChange={() => onToggle(tarefa.id)}
          trackColor={{ false: '#2a2a2a', true: '#2ecc71' }}
          thumbColor={tarefa.concluida ? '#fff' : '#888'}
        />
 
        {/* Botão remover */}
        <TouchableOpacity onPress={() => onRemover(tarefa.id)} style={styles.botaoRemover}>
          <Text style={styles.remover}>❌</Text>
        </TouchableOpacity>
      </View>
 
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    marginVertical: 5,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  texto: {
    fontSize: 15,
    color: '#ffffff',
    flex: 1,
    marginRight: 8,
  },
  textoConcluido: {
    textDecorationLine: 'line-through',
    color: '#555',
  },
  acoes: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  botaoRemover: {
    padding: 4,
  },
  remover: {
    fontSize: 16,
  },
});