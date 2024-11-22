import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Component to display images
const DisplayAnImage = () => {
  return (
    <View style={styles.imageContainer}>
      <Image
        style={styles.tinyLogo}
        source={{ uri: 'https://logoart.vn/blog/wp-content/uploads/2013/04/thiet-ke-logo-bach-viet-sao-kim-7.jpg' }}
      />
      <Image
        style={styles.logo}
        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:AN…uD2KZQKCCkKRYe2xwe54L10AYGrTaMkIfQPQJtR0&usqp=CAU' }}
      />
    </View>
  );
};

// Main screen component
export default function HomeScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const handleLogin = () => {
    if (username && password) {
      Alert.alert('Đăng Nhập Thành Công', `Tên người dùng: ${username}`);
      navigation.navigate('page'); // Navigate to main screen
      setUsername('');
      setPassword('');
    } else {
      Alert.alert('Đăng Nhập Thất Bại', 'Vui lòng nhập cả tên người dùng và mật khẩu.');
    }
  };

  const handleRegister = () => {
    if (registerUsername && registerEmail && registerPassword && registerConfirmPassword) {
      if (registerPassword === registerConfirmPassword) {
        Alert.alert('Đăng Ký Thành Công', `Tên người dùng: ${registerUsername}`);
        setRegisterUsername('');
        setRegisterEmail('');
        setRegisterPassword('');
        setRegisterConfirmPassword('');
      } else {
        Alert.alert('Đăng Ký Thất Bại', 'Mật khẩu xác nhận không khớp.');
      }
    } else {
      Alert.alert('Đăng Ký Thất Bại', 'Vui lòng điền đầy đủ thông tin.');
    }
  };

  const handleForgotPassword = () => {
    if (forgotEmail) {
      Alert.alert('Khôi Phục Mật Khẩu', `Email khôi phục đã được gửi đến: ${forgotEmail}`);
      setForgotEmail('');
    } else {
      Alert.alert('Khôi Phục Mật Khẩu Thất Bại', 'Vui lòng nhập email.');
    }
  };

  return (
    <View style={styles.container}>
      <DisplayAnImage /> {/* Display images */}

      <View style={styles.formContainer}>
        {isForgotPassword ? (
          <>
            <Text style={styles.title}>Quên Mật Khẩu</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={forgotEmail}
                onChangeText={setForgotEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            <Button title="Khôi Phục Mật Khẩu" onPress={handleForgotPassword} color="#007BFF" />
            <TouchableOpacity onPress={() => { setIsForgotPassword(false); setIsRegistering(false); }}>
              <Text style={styles.switchText}>Quay lại đăng nhập</Text>
            </TouchableOpacity>
          </>
        ) : isRegistering ? (
          <>
            <Text style={styles.title}>Đăng Ký</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Tên người dùng"
                value={registerUsername}
                onChangeText={setRegisterUsername}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={registerEmail}
                onChangeText={setRegisterEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                placeholder="Mật khẩu"
                secureTextEntry
                value={registerPassword}
                onChangeText={setRegisterPassword}
              />
              <TextInput
                style={styles.input}
                placeholder="Xác nhận mật khẩu"
                secureTextEntry
                value={registerConfirmPassword}
                onChangeText={setRegisterConfirmPassword}
              />
            </View>
            <Button title="Đăng Ký" onPress={handleRegister} color="#007BFF" />
            <TouchableOpacity onPress={() => setIsRegistering(false)}>
              <Text style={styles.switchText}>Đã có tài khoản? Đăng nhập</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.title}>Đăng Nhập</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Tên người dùng"
                value={username}
                onChangeText={setUsername}
              />
              <TextInput
                style={styles.input}
                placeholder="Mật khẩu"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>
            <Button title="Đăng Nhập" onPress={handleLogin} color="#007BFF" />
            <TouchableOpacity onPress={() => setIsForgotPassword(true)}>
              <Text style={styles.switchText}>Quên mật khẩu?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsRegistering(true)}>
              <Text style={styles.switchText}>Chưa có tài khoản? Đăng ký</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#99FFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 60, // Increased height of input fields
    borderColor: '#FF8C00',
    borderWidth: 1,
    borderRadius: 10, // Increased border radius of input fields
    paddingHorizontal: 20, // Increased padding inside input fields
    marginBottom: 20, // Increased spacing between input fields
  },
  imageContainer: {
    alignItems: 'center', // Center images
    marginBottom: 30, // Increased spacing between images and other content
  },
  tinyLogo: {
    width: 160, // Increased size of small image
    height: 130,
    marginBottom: 15,
  },
  logo: {
    width: 100, // Increased size of large image
    height: 100, // Adjusted height for visibility
  },
  switchText: {
    color: 'blue',
    textAlign: 'center',
    marginTop: 20, // Increased spacing between switch text and other elements
  },
  formContainer: {
    backgroundColor: '#CCFFFF', // Background color of form container
    padding: 40, // Increased padding of the form container
    borderRadius: 25, // Increased border radius of the form container
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6, // Only for Android
    maxWidth: 500, // Increased max width for the form container
    alignSelf: 'center', // Center the form container
  },
});
