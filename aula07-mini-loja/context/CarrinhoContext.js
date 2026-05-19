import { createContext, useContext, useState } from 'react';
 
const CarrinhoContext = createContext();
 
export function CarrinhoProvider({ children }) {
  const [carrinho, setCarrinho] = useState([]);
 
  function adicionar(produto) {
    setCarrinho(prev => [...prev, { ...produto, uid: Date.now().toString() }]);
  }
 
  function remover(uid) {
    setCarrinho(prev => prev.filter(item => item.uid !== uid));
  }
 
  function limpar() {
    setCarrinho([]);
  }
 
  const total = carrinho.reduce((soma, item) => soma + item.preco, 0);
 
  return (
    <CarrinhoContext.Provider value={{ carrinho, adicionar, remover, limpar, total }}>
      {children}
    </CarrinhoContext.Provider>
  );
}
 
export const useCarrinho = () => useContext(CarrinhoContext);