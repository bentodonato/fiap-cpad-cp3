import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CarrinhoProvider } from './context/CarrinhoContext';
import ProdutosScreen from './screens/ProdutosScreen';
import CarrinhoScreen from './screens/CarrinhoScreen';
 
const Stack = createNativeStackNavigator();
 
export default function App() {
  return (
    <CarrinhoProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Produtos" component={ProdutosScreen} />
          <Stack.Screen name="Carrinho" component={CarrinhoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </CarrinhoProvider>
  );
}
