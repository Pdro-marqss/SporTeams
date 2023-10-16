import { Text, View, StyleSheet } from 'react-native';

export function Groups() {
   return (
      <View style={styles.container}>
         <Text style={styles.text}>Pagina Groups</Text>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#000000',
      alignItems: 'center',
      justifyContent: 'center',
   },
   text: {
      color: '#FFFFFF',
      fontSize: 15,
   }
})