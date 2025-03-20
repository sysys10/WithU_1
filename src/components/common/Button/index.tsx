import { StyleSheet, Text, TouchableOpacity } from 'react-native'

interface MyButtonProps {
  children: React.ReactNode
  onPress: () => void
  size?: 'small' | 'medium' | 'large'
}

export default function MyButton({ children, onPress, size = 'medium' }: MyButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, styles[size]]}>
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#60a5fa',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  small: {
    padding: 8,
  },
  medium: {
    width: '50%',
  },
  large: {
    padding: 16,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
})
