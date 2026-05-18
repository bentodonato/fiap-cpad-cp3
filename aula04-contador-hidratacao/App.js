import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
 
const META_DIARIA = 8;
 
export default function App() {
  const [copos, setCopos] = useState(0);
  const [metaAtingida, setMetaAtingida] = useState(false);
 
  // useEffect: observa o contador e detecta quando a meta será atingid
  useEffect(() => {
    if (copos >= META_DIARIA) {
      setMetaAtingida(true);
    } else {
      setMetaAtingida(false);
    }
  }, [copos]);
 
  const adicionarCopo = () => {
    if (copos < META_DIARIA) {
      setCopos(copos + 1);
    }
  };
 
  const resetar = () => {
    setCopos(0);
    setMetaAtingida(false);
  };
 
  const renderCopos = () => {
    return Array.from({ length: META_DIARIA }, (_, i) => (
      <View
        key={i}
        style={[
          styles.copinho,
          i < copos ? styles.copinhoCheio : styles.copinhoVazio,
        ]}
      >
        <Text style={styles.copinhoEmoji}>{i < copos ? '💧' : '○'}</Text>
      </View>
    ));
  };
 
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0d1b2a" />
 
      <Text style={styles.titulo}>💧 Hidratação Diária</Text>
      <Text style={styles.subtitulo}>Meta: {META_DIARIA} copos por dia</Text>
 
      <View style={styles.copinhosContainer}>
        {renderCopos()}
      </View>
 
      <Text style={styles.contador}>{copos}</Text>
      <Text style={styles.label}>
        {copos === 0
          ? 'Beba seu primeiro copo! 🌊'
          : copos < META_DIARIA
          ? `Mais ${META_DIARIA - copos} copo${META_DIARIA - copos > 1 ? 's' : ''} para a meta`
          : 'Meta concluída! 🎉'}
      </Text>
 
      {metaAtingida && (
        <View style={styles.metaContainer}>
          <Text style={styles.metaTexto}>🏆 Meta do dia atingida!</Text>
        </View>
      )}
 
      <View style={styles.botoesContainer}>
        <TouchableOpacity
          style={[styles.botao, styles.botaoAdicionar, metaAtingida && styles.botaoDesabilitado]}
          onPress={adicionarCopo}
          activeOpacity={0.8}
          disabled={metaAtingida}
        >
          <Text style={styles.botaoTexto}>+ Adicionar copo</Text>
        </TouchableOpacity>
 
        <TouchableOpacity
          style={[styles.botao, styles.botaoResetar]}
          onPress={resetar}
          activeOpacity={0.8}
        >
          <Text style={styles.botaoTexto}>🔄 Resetar o dia</Text>
        </TouchableOpacity>
      </View>
 
      <Text style={styles.rodape}>fiap-cpad-cp3 · aula04</Text>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1b2a',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 14,
    color: '#557a95',
    marginBottom: 32,
  },
  copinhosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 32,
  },
  copinho: {
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copinhoCheio: {
    backgroundColor: '#1b4f72',
    borderWidth: 1,
    borderColor: '#4fc3f7',
  },
  copinhoVazio: {
    backgroundColor: '#1a2a3a',
    borderWidth: 1,
    borderColor: '#2c3e50',
  },
  copinhoEmoji: {
    fontSize: 18,
  },
  contador: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#4fc3f7',
    lineHeight: 90,
  },
  label: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 24,
    textAlign: 'center',
  },
  metaContainer: {
    backgroundColor: '#1e3a1e',
    borderWidth: 1,
    borderColor: '#2ecc71',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 24,
  },
  metaTexto: {
    color: '#2ecc71',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botoesContainer: {
    width: '100%',
    gap: 12,
  },
  botao: {
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  botaoAdicionar: {
    backgroundColor: '#1a6fa8',
  },
  botaoResetar: {
    backgroundColor: '#2c3e50',
  },
  botaoDesabilitado: {
    backgroundColor: '#1a3040',
    opacity: 0.5,
  },
  botaoTexto: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  rodape: {
    position: 'absolute',
    bottom: 24,
    fontSize: 11,
    color: '#2c3e50',
    letterSpacing: 1,
  },
});
