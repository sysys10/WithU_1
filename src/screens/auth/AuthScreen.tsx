import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  Alert,
} from 'react-native'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { BottomTabParamList } from '@/navigations/BottomTabNavigator'
import { useNavigation } from '@react-navigation/native'
import { useLogin } from '@/hooks/query/useAuth'

const KakaoIcon = () => <Image source={require('@/assets/icons/kakao-logo.png')} style={styles.socialIcon} />

const NaverIcon = () => <Image source={require('@/assets/icons/kakao-logo.png')} style={styles.socialIcon} />

const GoogleIcon = () => <Image source={require('@/assets/icons/kakao-logo.png')} style={styles.socialIcon} />

function SocialLogin() {
  const handleKakaoLogin = () => {
    console.log('kakao login')
  }

  const handleNaverLogin = () => {
    console.log('naver login')
  }

  const handleGoogleLogin = () => {
    console.log('google login')
  }

  return (
    <View style={styles.socialLoginContainer}>
      <TouchableOpacity onPress={handleKakaoLogin} style={[styles.socialButton, { backgroundColor: '#FEE500' }]}>
        <KakaoIcon />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleNaverLogin} style={[styles.socialButton, { backgroundColor: '#03C75A' }]}>
        <NaverIcon />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleGoogleLogin}
        style={[
          styles.socialButton,
          {
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: '#E0E0E0',
          },
        ]}>
        <GoogleIcon />
      </TouchableOpacity>
    </View>
  )
}

function LoginForm({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { mutate, isPending } = useLogin()

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('입력 오류', '이메일과 비밀번호를 모두 입력해주세요.')
      return
    }

    mutate({ email, password })
  }

  return (
    <View style={styles.loginFormContainer}>
      <TextInput
        placeholder="이메일"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#888"
      />

      <TextInput
        placeholder="비밀번호"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={isPending}>
        <Text style={styles.loginButtonText}>{isPending ? '로그인 중...' : '로그인'}</Text>
      </TouchableOpacity>

      <View style={styles.linkContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.linkText}>회원가입</Text>
        </TouchableOpacity>
        <View style={styles.verticalDivider} />
        <TouchableOpacity onPress={() => navigation.navigate('FindIdScreen')}>
          <Text style={styles.linkText}>아이디 찾기</Text>
        </TouchableOpacity>
        <View style={styles.verticalDivider} />
        <TouchableOpacity onPress={() => navigation.navigate('FindPasswordScreen')}>
          <Text style={styles.linkText}>비밀번호 찾기</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default function AuthScreen() {
  const navigation = useNavigation<BottomTabNavigationProp<BottomTabParamList>>()
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>WithU</Text>
        </View>

        <LoginForm navigation={navigation} />

        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>또는</Text>
          <View style={styles.dividerLine} />
        </View>

        <SocialLogin />

        <Text style={styles.copyrightText}>© {new Date().getFullYear()} WithU. All rights reserved.</Text>
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
    alignItems: 'center',
    padding: 20,
  },
  logoContainer: {
    marginBottom: 40,
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#3B82F6',
  },
  loginFormContainer: {
    width: '100%',
    maxWidth: 400,
  },
  input: {
    height: 50,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  loginButton: {
    backgroundColor: '#3B82F6',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  linkText: {
    color: '#666',
    fontSize: 14,
    paddingHorizontal: 10,
  },
  verticalDivider: {
    width: 1,
    height: 10,
    backgroundColor: '#E0E0E0',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#888',
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  socialButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: {
    width: 30,
    height: 30,
  },
  copyrightText: {
    marginTop: 20,
    color: '#888',
    fontSize: 12,
  },
})
