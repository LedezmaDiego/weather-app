import { View, StyleSheet, ScrollView } from 'react-native';
import { TarjetaDeClima } from '../contenidos/TarjetaDeClima';

export const ContenedorDePantallaClima = ({ climas }: any) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {climas.map((clima: any, index: number) => (
        <TarjetaDeClima key={index} clima={clima} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 50,
  },
});
