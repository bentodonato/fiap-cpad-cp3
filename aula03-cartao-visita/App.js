import { View, Text, Image, StyleSheet, TouchableOpacity, Linking, ScrollView, StatusBar } from 'react-native';
 
export default function App() {
  const perfil = {
    nome: "Bento Donato",
    curso: "Ciência da Computação",
    ano: "2º Ano · FIAP 2026",
    frase: "Transformando ideias em código, um commit de cada vez! ",
    avatar: "https://github.com/bentodonato.png",
    links: [
      {
        label: "GitHub",
        emoji: "🐙",
        url: "https://github.com/bentodonato",
        cor: "#24292e",
      },
      {
        label: "LinkedIn",
        emoji: "💼",
        url: "https://www.linkedin.com/in/bento-donato-b01062185/",
        cor: "#0077B5",
      },
      {
        label: "FIAP",
        emoji: "🎓",
        url: "https://www.fiap.com.br",
        cor: "#cb1391",
      },
    ],
  };
 
  const abrirLink = (url) => {
    Linking.openURL(url);
  };
 
  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <StatusBar barStyle="light-content" backgroundColor="#0d0d0d" />
 
      <View style={styles.container}>
 
        {/* Avatar */}
        <View style={styles.avatarWrapper}>
          <Image
            source={{ uri: perfil.avatar }}
            style={styles.avatar}
          />
        </View>
 
        {/* Nome */}
        <Text style={styles.nome}>{perfil.nome}</Text>
 
        {/* Curso e Ano */}
        <Text style={styles.curso}>{perfil.curso}</Text>
        <Text style={styles.ano}>{perfil.ano}</Text>
 
        {/* Divider */}
        <View style={styles.divider} />
 
        {/*Frase pessoal */}
        <Text style={styles.frase}>"{perfil.frase}"</Text>

        {/*Links */}
        <View style={styles.linksContainer}>
          {perfil.links.map((link, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.linkButton, { backgroundColor: link.cor }]}
              onPress={() => abrirLink(link.url)}
              activeOpacity={0.8}
            >
              <Text style={styles.linkEmoji}>{link.emoji}</Text>
              <Text style={styles.linkLabel}>{link.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
 
        {/* Rodapé */}
        <Text style={styles.rodape}>fiap-cpad-cp3 · aula03</Text>
 
      </View>
    </ScrollView>
  );
}
 
const ACCENT = '#2826cc';
 
const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    backgroundColor: '#0d0d0d',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 24,
    backgroundColor: '#0d0d0d',
  },
 
  // Avatar
  avatarWrapper: {
    borderRadius: 70,
    borderWidth: 3,
    borderColor: ACCENT,
    padding: 3,
    marginBottom: 20,
    shadowColor: ACCENT,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 10,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
 
  // Textos
  nome: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  curso: {
    fontSize: 14,
    color: '#c9099c',
    marginBottom: 2,
    textAlign: 'center',
  },
  ano: {
    fontSize: 13,
    color: '#666',
    marginBottom: 20,
  },
 
  // Divider
  divider: {
    width: 50,
    height: 2,
    backgroundColor: ACCENT,
    borderRadius: 2,
    marginBottom: 20,
    opacity: 0.6,
  },
 
  // Frase
  frase: {
    fontSize: 14,
    color: '#bbb',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 22,
    marginBottom: 36,
    paddingHorizontal: 10,
  },
 
  // Links
  linksContainer: {
    width: '100%',
    gap: 12,
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 14,
    gap: 12,
  },
  linkEmoji: {
    fontSize: 20,
  },
  linkLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
 
  // Rodapé
  rodape: {
    marginTop: 40,
    fontSize: 11,
    color: '#333',
    letterSpacing: 1,
  },
});
