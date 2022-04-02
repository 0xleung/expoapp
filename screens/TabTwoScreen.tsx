import { StyleSheet, TouchableOpacity } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

import { FontAwesome } from '@expo/vector-icons';

export default function TabTwoScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const colorScheme = useColorScheme();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>profile screen</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Modal')}
        style={{ padding: 16 }}>
        <Text style={{ fontSize: 20 }}>
          <FontAwesome
              name="camera"
              size={25}
              color={Colors[colorScheme].text}
              style={{ marginRight: 15 }}
            />
        </Text>
      </TouchableOpacity>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {/* <EditScreenInfo path="/screens/TabTwoScreen.tsx" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
