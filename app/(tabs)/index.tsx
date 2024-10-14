import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

// Thành phần hiển thị hình ảnh
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

// Thành phần màn hình chính
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
      navigation.navigate('page'); // Điều hướng sang màn hình chính
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
      <DisplayAnImage /> {/* Hiển thị hình ảnh */}

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
    height: 60, // Tăng chiều cao của trường nhập liệu
    borderColor: '#FF8C00',
    borderWidth: 1,
    borderRadius: 10, // Tăng góc bo tròn của trường nhập liệu
    paddingHorizontal: 20, // Tăng padding bên trong trường nhập liệu
    marginBottom: 20, // Tăng khoảng cách giữa các trường nhập liệu
  },
  imageContainer: {
    alignItems: 'center', // Căn giữa các hình ảnh
    marginBottom: 30, // Tăng khoảng cách giữa hình ảnh và phần còn lại
  },
  tinyLogo: {
    width: 160, // Tăng kích thước hình ảnh nhỏ
    height: 130,
    marginBottom: 15,
  },
  logo: {
    width: 100, // Tăng kích thước hình ảnh lớn
    height: 10,
  },
  switchText: {
    color: 'blue',
    textAlign: 'center',
    marginTop: 20, // Tăng khoảng cách giữa văn bản chuyển đổi và các phần khác
  },
  formContainer: {
    backgroundColor: '#CCFFFF', // Màu nền của khung
    padding: 40, // Tăng padding của khung
    borderRadius: 25, // Tăng góc bo tròn của khung
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6, // Chỉ dùng cho Android
    maxWidth: 500, // Tăng chiều rộng tối đa cho khung
    alignSelf: 'center', // Căn giữa khung
  },
});
