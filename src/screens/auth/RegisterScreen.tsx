import { useRegister } from '@/hooks/query/useAuth'
import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native'

export default function RegisterScreen({ navigation }: { navigation: any }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')

  // Validation functions
  const validateEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
    return emailRegex.test(email)
  }

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[a-z\d@$!%*?&]{8,}$/
    return passwordRegex.test(password)
  }

  const { mutate, isPending } = useRegister()
  const handleRegister = () => {
    if (!name) {
      Alert.alert('입력 오류', '이름을 입력해주세요.')
      return
    }

    if (!validateEmail(email)) {
      Alert.alert('입력 오류', '유효한 이메일 주소를 입력해주세요.')
      return
    }

    if (!validatePassword(password)) {
      Alert.alert('입력 오류', '비밀번호는 8자 이상, 문자, 숫자, 특수문자를 포함해야 합니다.')
      return
    }

    if (password !== passwordCheck) {
      Alert.alert('입력 오류', '비밀번호가 일치하지 않습니다.')
      return
    }

    // Proceed with registration
    const registrationData = {
      name,
      email,
      password,
    }

    mutate(registrationData)
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>회원가입</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>이름</Text>
            <TextInput
              placeholder="이름을 입력하세요"
              value={name}
              onChangeText={setName}
              style={styles.input}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>이메일</Text>
            <TextInput
              placeholder="이메일을 입력하세요"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>비밀번호</Text>
            <TextInput
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              secureTextEntry
              autoCapitalize="none"
            />
            <Text style={styles.helperText}>8자 이상, 문자, 숫자, 특수문자 포함</Text>
          </View>

          {/* Password Confirmation */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>비밀번호 확인</Text>
            <TextInput
              placeholder="비밀번호를 다시 입력하세요"
              value={passwordCheck}
              onChangeText={setPasswordCheck}
              style={styles.input}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          {/* Register Button */}
          <TouchableOpacity style={styles.registerButton} onPress={handleRegister} disabled={isPending}>
            <Text style={styles.registerButtonText}>{isPending ? '가입 처리 중...' : '회원가입'}</Text>
          </TouchableOpacity>

          {/* Login Navigation */}
          <View style={styles.loginLinkContainer}>
            <Text style={styles.loginLinkText}>이미 계정이 있나요? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>로그인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3B82F6',
  },
  formContainer: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
    color: '#333',
    fontWeight: '500',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  helperText: {
    marginTop: 5,
    fontSize: 12,
    color: '#666',
  },
  registerButton: {
    backgroundColor: '#3B82F6',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginLinkText: {
    color: '#666',
  },
  loginLink: {
    color: '#3B82F6',
    fontWeight: 'bold',
  },
})
