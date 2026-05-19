import { useState, useRef } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  Switch, ScrollView, StyleSheet,
  KeyboardAvoidingView, Platform, StatusBar,
} from 'react-native';
 
// Funcoes de mascara
const formatarCPF = (v) =>
  v.replace(/\D/g, '')
   .replace(/(\d{3})(\d)/, '$1.$2')
   .replace(/(\d{3})(\d)/, '$1.$2')
   .replace(/(\d{3})(\d{1,2})/, '$1-$2')
   .slice(0, 14);
 
const formatarTel = (v) =>
  v.replace(/\D/g, '')
   .replace(/(\d{2})(\d)/, '($1) $2')
   .replace(/(\d{5})(\d{1,4})/, '$1-$2')
   .slice(0, 15);
 
// Componente campo reutilizavel
const Campo = ({ label, erro, children }) => (
  <View style={styles.campoWrapper}>
    <Text style={styles.label}>{label}</Text>
    {children}
    {erro ? <Text style={styles.erro}>⚠ {erro}</Text> : null}
  </View>
);
 
// Perfis
const PERFIS = [
  { id: 'estudante',     label: '🎓 Estudante' },
  { id: 'profissional',  label: '💼 Profissional' },
  { id: 'freelancer',    label: '🚀 Freelancer' },
];
 
// App Principal
export default function App() {
  const [nome,       setNome]       = useState('');
  const [email,      setEmail]      = useState('');
  const [cpf,        setCpf]        = useState('');
  const [tel,        setTel]        = useState('');
  const [perfil,     setPerfil]     = useState('');
  const [termos,     setTermos]     = useState(false);
  const [erros,      setErros]      = useState({});
  const [carregando, setCarregando] = useState(false);
  const [sucesso,    setSucesso]    = useState(false);
 
  // Refs para navegação entre campos
  const emailRef = useRef(null);
  const cpfRef   = useRef(null);
  const telRef   = useRef(null);
 
  // Validação
  const validar = () => {
    const e = {};
    if (!nome.trim())                         e.nome   = 'Nome obrigatório';
    if (!email.includes('@') || !email.includes('.')) e.email = 'E-mail inválido';
    if (cpf.length < 14)                      e.cpf    = 'CPF incompleto';
    if (tel.length < 14)                      e.tel    = 'Telefone incompleto';
    if (!perfil)                              e.perfil = 'Escolha um perfil';
    if (!termos)                              e.termos = 'Aceite os termos para continuar';
    setErros(e);
    return Object.keys(e).length === 0;
  };
 
  // Envio
  const handleSubmit = () => {
    if (!validar()) return;
    setCarregando(true);
    setTimeout(() => {
      setCarregando(false);
      setSucesso(true);
    }, 1500);
  };
 
  const handleNovocadastro = () => {
    setNome(''); setEmail(''); setCpf(''); setTel('');
    setPerfil(''); setTermos(false); setErros({});
    setSucesso(false);
  };
 
  // Tela de Sucesso
  if (sucesso) {
    return (
      <View style={styles.sucessoContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#0d0d0d" />
        <Text style={styles.sucessoEmoji}>🎉</Text>
        <Text style={styles.sucessoTitulo}>Cadastro realizado!</Text>
        <Text style={styles.sucessoSub}>Bem-vindo(a), {nome.split(' ')[0]}!</Text>
        <View style={styles.sucessoCard}>
          <Text style={styles.sucessoDetalhe}>📧 {email}</Text>
          <Text style={styles.sucessoDetalhe}>🪪 {cpf}</Text>
          <Text style={styles.sucessoDetalhe}>📱 {tel}</Text>
          <Text style={styles.sucessoDetalhe}>🏷️ {PERFIS.find(p => p.id === perfil)?.label}</Text>
        </View>
        <TouchableOpacity style={styles.botaoNovo} onPress={handleNovocastro}>
          <Text style={styles.botaoTexto}>Novo cadastro</Text>
        </TouchableOpacity>
      </View>
    );
  }
 
  // Formulario
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#0d0d0d' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="light-content" backgroundColor="#0d0d0d" />
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Cabeçalho */}
        <Text style={styles.titulo}>📋 Cadastro</Text>
        <Text style={styles.subtitulo}>Preencha seus dados para continuar</Text>
 
        {/* Nome */}
        <Campo label="Nome completo" erro={erros.nome}>
          <TextInput
            placeholder="Ex: Bento Donato Garcia"
            placeholderTextColor="#444"
            value={nome}
            onChangeText={setNome}
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
            style={[styles.input, erros.nome && styles.inputErro]}
          />
        </Campo>
 
        {/* E-mail */}
        <Campo label="E-mail" erro={erros.email}>
          <TextInput
            ref={emailRef}
            placeholder="bento@email.com"
            placeholderTextColor="#444"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => cpfRef.current.focus()}
            style={[styles.input, erros.email && styles.inputErro]}
          />
        </Campo>
 
        {/* CPF */}
        <Campo label="CPF" erro={erros.cpf}>
          <TextInput
            ref={cpfRef}
            placeholder="000.000.000-00"
            placeholderTextColor="#444"
            value={cpf}
            onChangeText={(v) => setCpf(formatarCPF(v))}
            keyboardType="numeric"
            maxLength={14}
            returnKeyType="next"
            onSubmitEditing={() => telRef.current.focus()}
            style={[styles.input, erros.cpf && styles.inputErro]}
          />
        </Campo>
 
        {/* Telefone */}
        <Campo label="Telefone" erro={erros.tel}>
          <TextInput
            ref={telRef}
            placeholder="(11) 99999-9999"
            placeholderTextColor="#444"
            value={tel}
            onChangeText={(v) => setTel(formatarTel(v))}
            keyboardType="phone-pad"
            maxLength={15}
            returnKeyType="done"
            style={[styles.input, erros.tel && styles.inputErro]}
          />
        </Campo>
 
        {/* Perfil chips */}
        <Campo label="Perfil" erro={erros.perfil}>
          <View style={styles.chips}>
            {PERFIS.map((op) => (
              <TouchableOpacity
                key={op.id}
                onPress={() => setPerfil(op.id)}
                style={[styles.chip, perfil === op.id && styles.chipAtivo]}
                activeOpacity={0.8}
              >
                <Text style={[styles.chipTexto, perfil === op.id && styles.chipTextoAtivo]}>
                  {op.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Campo>
 
        {/* Termos Switch */}
        <View style={styles.termosRow}>
          <Switch
            value={termos}
            onValueChange={setTermos}
            trackColor={{ false: '#2a2a2a', true: '#ac0c79' }}
            thumbColor={termos ? '#fff' : '#888'}
          />
          <Text style={styles.termosText}>Aceito os termos de uso</Text>
        </View>
        {erros.termos ? <Text style={styles.erro}>⚠ {erros.termos}</Text> : null}
 
        {/* Botão submit */}
        <TouchableOpacity
          style={[styles.botao, carregando && styles.botaoCarregando]}
          onPress={handleSubmit}
          disabled={carregando}
          activeOpacity={0.8}
        >
          <Text style={styles.botaoTexto}>
            {carregando ? '⏳ Enviando...' : 'Criar conta'}
          </Text>
        </TouchableOpacity>
 
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
 
// Estilos
const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 56,
    paddingBottom: 60,
    backgroundColor: '#0d0d0d',
  },
 
  // Cabeçalho
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 14,
    color: '#555',
    marginBottom: 28,
  },
 
  // Campo
  campoWrapper: {
    marginBottom: 18,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#aaa',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  input: {
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#2a2a2a',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: '#ffffff',
  },
  inputErro: {
    borderColor: '#e74c3c',
  },
  erro: {
    color: '#e74c3c',
    fontSize: 12,
    marginTop: 5,
  },
 
  // Chips
  chips: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  chipAtivo: {
    backgroundColor: '#ac0c79',
    borderColor: '#ac0c79',
  },
  chipTexto: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  chipTextoAtivo: {
    color: '#ffffff',
    fontWeight: '600',
  },
 
  // Termos
  termosRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 6,
    marginTop: 4,
  },
  termosText: {
    fontSize: 15,
    color: '#aaa',
  },
 
  // Botão
  botao: {
    backgroundColor: '#ac0c79',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  botaoCarregando: {
    opacity: 0.6,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
 
  // Tela de sucesso
  sucessoContainer: {
    flex: 1,
    backgroundColor: '#0d0d0d',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 12,
  },
  sucessoEmoji: {
    fontSize: 56,
  },
  sucessoTitulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  sucessoSub: {
    fontSize: 16,
    color: '#888',
    marginBottom: 8,
  },
  sucessoCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 14,
    padding: 20,
    width: '100%',
    gap: 10,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  sucessoDetalhe: {
    color: '#ccc',
    fontSize: 15,
  },
  botaoNovo: {
    backgroundColor: '#1a1a1a',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 32,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#ac0c79',
  },
});