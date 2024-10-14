import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  TextInput,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const App = () => {
  const [cart, setCart] = useState([
    // { id: '1', title: 'Giày Balenciaga', price: '250.000 VNĐ', quantity: 2, imageUrl: require('../../assets/images/d1.jpg') },
    { id: '2', title: 'Giày Vans Trắng', price: '245.000 VNĐ', quantity: 1, imageUrl: require('../../assets/images/d2.jpg') },
    // Add other products here...
  ]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const totalAmount = cart.reduce((sum, item) => 
    sum + (parseFloat(item.price.replace(/ VNĐ/g, '').replace(/\./g, '')) * item.quantity), 
    0
  );

  const handlePayment = () => {
    if (!name || !email || !phone || !shippingAddress) {
      Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin');
      return;
    }

    // Show success message
    setPaymentSuccess(true);
    setTimeout(() => setPaymentSuccess(false), 3000); // Hide after 3 seconds

    // Clear cart and input fields
    setCart([]);
    setName('');
    setEmail('');
    setPhone('');
    setShippingAddress('');
  };

  const CartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={item.imageUrl} style={styles.productImage} />
      <Text style={styles.productTitle}>{item.title}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => handleQuantityChange(item.id, -1)} style={styles.button}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => handleQuantityChange(item.id, 1)} style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.productPrice}>{item.price}</Text>
    </View>
  );

  const handleQuantityChange = (id, change) => {
    setCart(cart.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Giỏ Hàng</Text>

      <FlatList
        data={cart}
        renderItem={({ item }) => <CartItem item={item} />}
        keyExtractor={item => item.id}
      />

      <Text style={styles.totalText}>Tổng tiền: {totalAmount.toLocaleString()} VNĐ</Text>

      <TextInput
        style={styles.input}
        placeholder="Tên khách hàng"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Số điện thoại"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Địa chỉ giao hàng"
        value={shippingAddress}
        onChangeText={setShippingAddress}
      />

      <TouchableOpacity onPress={handlePayment} style={styles.button}>
        <Text style={styles.buttonText}>Xác Nhận Thanh Toán</Text>
      </TouchableOpacity>

      {paymentSuccess && (
        <View style={styles.successMessage}>
          <Text style={styles.successText}>Thanh toán thành công! Cảm ơn bạn đã đặt hàng.</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5,
  },
  productTitle: {
    fontSize: 18,
    flex: 1,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#FF9999',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  productPrice: {
    fontSize: 16,
    color: '#ff5722',
    fontWeight: 'bold',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  input: {
    height: 50,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
  },
  successMessage: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#dff0d8',
    borderColor: '#d6e9c6',
    borderWidth: 1,
    borderRadius: 5,
  },
  successText: {
    color: '#3c763d',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
