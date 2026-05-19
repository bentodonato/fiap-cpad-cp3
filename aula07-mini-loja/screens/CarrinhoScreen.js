import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCarrinho } from '../context/CarrinhoContext';
 
export default function CarrinhoScreen() {
  const navigation = useNavigation();
  const { carrinho, remover, limpar, total } = useCarrinho();
 
  return (
    <View style={styles.container}>
 
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.voltar}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>🛒 Carrinho</Text>
      </View>
 
      {/* Lista vazia */}
      {carrinho.length === 0 ? (
        <View style={styles.vazio}>
          <Text style={styles.vazioEmoji}>🛒</Text>
          <Text style={styles.vazioTexto}>Seu carrinho está vazio</Text>
          <TouchableOpacity
            style={styles.botaoVoltar}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.botaoVoltarTexto}>Ver produtos</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {/* Itens do carrinho */}
          <FlatList
            data={carrinho}
            keyExtractor={item => item.uid}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.lista}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Image source={item.imagem} style={styles.imagemProduto} resizeMode="contain" />
                <View style={styles.cardInfo}>
                  <Text style={styles.nomeItem}>{item.nome}</Text>
                  <Text style={styles.precoItem}>R$ {item.preco.toFixed(2)}</Text>
                </View>
                <TouchableOpacity
                  style={styles.botaoRemover}
                  onPress={() => remover(item.uid)}
                >
                  <Text style={styles.botaoRemoverTexto}>✕</Text>
                </TouchableOpacity>
              </View>
            )}
          />
 
          {/* Rodapé com total */}
          <View style={styles.rodape}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValor}>R$ {total.toFixed(2)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.qtdLabel}>{carrinho.length} item{carrinho.length > 1 ? 's' : ''}</Text>
            </View>
 
            <TouchableOpacity style={styles.botaoFinalizar} activeOpacity={0.8}>
              <Text style={styles.botaoFinalizarTexto}>✅ Finalizar Compra</Text>
            </TouchableOpacity>
 
            <TouchableOpacity style={styles.botaoLimpar} onPress={limpar}>
              <Text style={styles.botaoLimparTexto}>🗑️ Limpar carrinho</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
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
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 16,
  },
  voltar: {
    color: '#7C3AED',
    fontSize: 15,
    fontWeight: '600',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
  },
 
  // Vazio
  vazio: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  vazioEmoji: {
    fontSize: 48,
  },
  vazioTexto: {
    color: '#555',
    fontSize: 16,
  },
  botaoVoltar: {
    backgroundColor: '#7C3AED',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 8,
  },
  botaoVoltarTexto: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
 
  // Lista
  lista: {
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
 
  // Card item
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
    width: 52,
    height: 52,
    borderRadius: 8,
    backgroundColor: '#222',
  },
  cardInfo: {
    flex: 1,
  },
  nomeItem: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  precoItem: {
    fontSize: 13,
    color: '#7C3AED',
    fontWeight: 'bold',
  },
  botaoRemover: {
    backgroundColor: '#2a1a1a',
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoRemoverTexto: {
    color: '#e74c3c',
    fontSize: 14,
    fontWeight: 'bold',
  },
 
  // Rodapé
  rodape: {
    backgroundColor: '#1a1a1a',
    borderTopWidth: 1,
    borderTopColor: '#2a2a2a',
    padding: 20,
    gap: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    color: '#aaa',
    fontSize: 16,
  },
  totalValor: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  qtdLabel: {
    color: '#555',
    fontSize: 13,
  },
  botaoFinalizar: {
    backgroundColor: '#7C3AED',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  botaoFinalizarTexto: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  botaoLimpar: {
    backgroundColor: '#1a1a1a',
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3a1a1a',
  },
  botaoLimparTexto: {
    color: '#e74c3c',
    fontSize: 14,
    fontWeight: '600',
  },
});