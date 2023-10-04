import 'react-native-gesture-handler';
import { useFonts } from 'expo-font'; 
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from './store';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import MapScreen from './src/screens/MapScreen';
import EatScreen from './src/screens/EatScreen';

function App() {
  const [fontsLoaded] = useFonts({
    'Mont': require('./assets/fonts/Montserrat-SemiBold.ttf'),
  });
  const Stack = createNativeStackNavigator();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <NavigationContainer>
          <SafeAreaProvider>
            <KeyboardAvoidingView 
              style={{ flex: 1 }}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 0}
            >
              <Stack.Navigator
                screenOptions={{
                  headerShown: false
                }}
              >
                <Stack.Screen 
                  name='HomeScreen'
                  children={(props) => <HomeScreen {...props} />}
                />
                <Stack.Screen 
                  name='MapScreen'
                  children={(props) => <MapScreen {...props} />}
                />
                <Stack.Screen 
                  name='EatScreen'
                  children={(props) => <EatScreen {...props} />}
                />
              </Stack.Navigator>
            </KeyboardAvoidingView>
          </SafeAreaProvider>
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;
