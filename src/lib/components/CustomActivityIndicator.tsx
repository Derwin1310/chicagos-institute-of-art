import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { COLORS } from "src/theme/colors"

interface CustomActivityIndicatorProps {
  size?: number
  color?: string
}

export const CustomActivityIndicator = ({ size = 50, color = COLORS.secondary }: CustomActivityIndicatorProps) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={color} size={size} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    paddingBottom: 0
  },
})