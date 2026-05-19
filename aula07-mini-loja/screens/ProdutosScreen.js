import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { produtos } from '../data/produtos';
import { useCarrinho } from '../context/CarrinhoContext';
 
export default function ProdutosScreen() {
  const navigation = useNavigation();
  const { adicionar, carrinho } = useCarrinho();
 
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0d0d0d" />
 
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.titulo}>🛍️ Mini Loja</Text>
        <TouchableOpacity
          style={styles.botaoCarrinho}
          onPress={() => navigation.navigate('Carrinho')}
        >
          <Text style={styles.botaoCarrinhoTexto}>🛒 {carrinho.length}</Text>
        </TouchableOpacity>
      </View>
 
      <Text style={styles.subtitulo}>
        {carrinho.length === 0
          ? 'Seu carrinho está vazio'
          : `${carrinho.length} item${carrinho.length > 1 ? 's' : ''} no carrinho`}
      </Text>
 
      {/* Lista de produtos */}
      <FlatList
        data={produtos}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.imagem} style={styles.imagemProduto} resizeMode="contain" />
            <View style={styles.cardInfo}>
              <Text style={styles.nomeProduto}>{item.nome}</Text>
              <Text style={styles.precoProduto}>R$ {item.preco.toFixed(2)}</Text>
            </View>
            <TouchableOpacity
              style={styles.botaoAdicionar}
              onPress={() => adicionar(item)}
              activeOpacity={0.8}
            >
              <Text style={styles.botaoAdicionarTexto}>＋</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
    paddingTop: 56,
  },
 
  // Cabeçalho
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 4,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  botaoCarrinho: {
    backgroundColor: '#7C3AED',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  botaoCarrinhoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  subtitulo: {
    color: '#555',
    fontSize: 13,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
 
  // Lista
  lista: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
 
  // Card produto
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 14,
    marginBottom: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    gap: 12,
  },
  imagemProduto: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#222',
  },
  cardInfo: {
    flex: 1,
  },
  nomeProduto: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  precoProduto: {
    fontSize: 14,
    color: '#7C3AED',
    fontWeight: 'bold',
  },
  botaoAdicionar: {
    backgroundColor: '#7C3AED',
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoAdicionarTexto: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 24,
  },
});