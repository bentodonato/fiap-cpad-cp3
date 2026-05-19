import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
 
export default function Perfil() {
  const router = useRouter();
 
  const dados = {
    curso: 'Ciência da Computação',
    turma: '2CCPO — FIAP 2026',
    tecnologias: [
      { nome: 'React Native', emoji: '⚛️', cor: '#1a3a5c' },
      { nome: 'JavaScript', emoji: '🉑', cor: '#3a3000' },
      { nome: 'Expo', emoji: '📱', cor: '#1a1a3a' },
    ],
  };
 
  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.container}>
 
        {/* Cabeçalho */}
        <Text style={styles.titulo}>Meu Perfil</Text>
 
        {/* Divider */}
        <View style={styles.divider} />
 
        {/* Curso e Turma */}
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Curso</Text>
          <Text style={styles.infoValor}>{dados.curso}</Text>
        </View>
 
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Turma</Text>
          <Text style={styles.infoValor}>{dados.turma}</Text>
        </View>
 
        {/* Tecnologias favoritas */}
        <Text style={styles.secaoTitulo}>Tecnologias Favoritas</Text>
 
        <View style={styles.techRow}>
          {dados.tecnologias.map((tech, index) => (
            <View key={index} style={[styles.techCard, { backgroundColor: tech.cor }]}>
              <Text style={styles.techEmoji}>{tech.emoji}</Text>
              <Text style={styles.techNome}>{tech.nome}</Text>
            </View>
          ))}
        </View>
 
        {/* Botão Voltar */}
        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => router.back()}
          activeOpacity={0.8}
        >
          <Text style={styles.botaoVoltarTexto}>Voltar</Text>
        </TouchableOpacity>
 
      </View>
    </ScrollView>
  );
}
 
const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    backgroundColor: '#0d0d0d',
  },
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 60,
    paddingHorizontal: 24,
  },
 
  // Cabeçalho
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  divider: {
    width: 50,
    height: 2,
    backgroundColor: '#ac0c79',
    borderRadius: 2,
    marginBottom: 28,
  },
 
  // Cards de info
  infoCard: {
    width: '100%',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  infoValor: {
    fontSize: 15,
    color: '#ffffff',
    fontWeight: '500',
  },
 
  // Seção tecnologias
  secaoTitulo: {
    fontSize: 14,
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 20,
    marginBottom: 14,
    alignSelf: 'flex-start',
  },
 
  techRow: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    marginBottom: 36,
  },
  techCard: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  techEmoji: {
    fontSize: 24,
    marginBottom: 6,
  },
  techNome: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
 
  // Botão voltar
  botaoVoltar: {
    backgroundColor: '#1a1a1a',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  botaoVoltarTexto: {
    color: '#ac0c79',
    fontSize: 15,
    fontWeight: '600',
  },
});