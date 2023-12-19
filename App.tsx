import 'react-native-gesture-handler';

import { StyleSheet, Text, View } from 'react-native'

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Chicago's instite of art</Text>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#444",
    color: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 22
  }
})