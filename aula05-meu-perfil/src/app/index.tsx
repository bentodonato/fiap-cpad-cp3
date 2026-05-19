import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
 
export default function Home() {
  const router = useRouter();
 
  const perfil = {
    nome: 'Bento Donato Garcia',
    inicial: 'B',
    descricao: 'Estudante de Ciência da Computação',
    avatarUrl: 'https://github.com/bentodonato.png',
  };
 
  return (
    <View style={styles.container}>
 
      {/* Foto do GitHub */}
      <Image
        source={{ uri: perfil.avatarUrl }}
        style={styles.avatar}
      />
 
      {/* Nome */}
      <Text style={styles.nome}>{perfil.nome}</Text>
 
      {/* Descrição */}
      <Text style={styles.descricao}>{perfil.descricao}</Text>
 
      {/* Botão para Tela 2 */}
      <TouchableOpacity
        style={styles.botao}
        onPress={() => router.push('/perfil')}
        activeOpacity={0.8}
      >
        <Text style={styles.botaoTexto}>Ver meu perfil completo</Text>
      </TouchableOpacity>
 
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
 
  // Avatar
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: '#ac0c79',
    marginBottom: 20,
  },
 
  // Textos
  nome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  descricao: {
    fontSize: 14,
    color: '#888',
    marginBottom: 40,
    textAlign: 'center',
  },
 
  // Botão
  botao: {
    backgroundColor: '#ac0c79',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 14,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});
