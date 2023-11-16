import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from './app.routes';

import { useTheme } from 'styled-components/native';

export function Routes() {
   const { COLORS } = useTheme(); //evita bug em android onde o fundo por estar na cor branca, da uma piscada quando muda de tela

   return (
      <View style={{ flex: 1, backgroundColor: COLORS.GRAY_600 }}>
         <NavigationContainer>
            <AppRoutes />
         </NavigationContainer>
      </View>
   );
}