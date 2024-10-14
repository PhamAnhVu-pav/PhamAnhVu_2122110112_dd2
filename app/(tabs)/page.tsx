import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  StatusBar,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';

// Dữ liệu sản phẩm
import Ionicons from 'react-native-vector-icons/Ionicons'; 
const DATA = [
  {
    id: 'category-1',
    title: 'Tất Cả Sản Phẩm',
    description: 'Danh sách tất cả sản phẩm có sẵn.',
    products: [
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'Giày Balenciaga',
        description: 'Mô tả cho sản phẩm giày chính hãng.',
        imageUrl: require('../../assets/images/d1.jpg'),
        price: '250.000 VNĐ',
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Giày Vans Trắng',
        description: 'Mô tả cho sản phẩm giày chính hãng.',
        imageUrl: require('../../assets/images/d2.jpg'),
        price: '260.000 VNĐ',
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Giày Vans Đen',
        description: 'Mô tả cho sản phẩm giày chính hãng.',
        imageUrl: require('../../assets/images/d3.jpg'),
        price: '255.000 VNĐ',
      },
      {
        id: 'cafe4',
        title: 'Giày Samba',
        description: 'Mô tả cho sản phẩm giày chính hãng.',
        imageUrl: require('../../assets/images/d4.jpg'),
        price: '245.000 VNĐ',
      },
    ],
  },
  {
    id: 'category-2',
    title: 'Nike',
    description: 'Danh sách sản phẩm Nike.',
    products: [
      {
        id: 'nike1',
        title: 'Nike Air Max',
        description: 'Mô tả cho sản phẩm Nike chính hãng.',
        imageUrl: require('../../assets/images/d2.jpg'),
        price: '3.000.000 VNĐ',
      },
      {
        id: 'nike2',
        title: 'Nike Air Force 1',
        description: 'Mô tả cho sản phẩm Nike chính hãng.',
        imageUrl: require('../../assets/images/d1.jpg'),
        price: '2.800.000 VNĐ',
      },
    ],
  },
  {
    id: 'category-3',
    title: 'Adidas',
    description: 'Danh sách sản phẩm Adidas.',
    products: [
      {
        id: 'adidas1',
        title: 'Adidas Ultra Boost',
        description: 'Mô tả cho sản phẩm Adidas chính hãng.',
        imageUrl: require('../../assets/images/d3.jpg'),
        price: '3.200.000 VNĐ',
      },
      {
        id: 'adidas2',
        title: 'Adidas Superstar',
        description: 'Mô tả cho sản phẩm Adidas chính hãng.',
        imageUrl: require('../../assets/images/d4.jpg'),
        price: '2.500.000 VNĐ',
      },
    ],
  },
  {
    id: 'category-4',
    title: 'Puma',
    description: 'Danh sách sản phẩm Puma.',
    products: [
      {
        id: 'puma1',
        title: 'Puma RS-X',
        description: 'Mô tả cho sản phẩm Puma chính hãng.',
        imageUrl: require('../../assets/images/d1.jpg'),
        price: '2.000.000 VNĐ',
      },
      {
        id: 'puma2',
        title: 'Puma Suede Classic',
        description: 'Mô tả cho sản phẩm Puma chính hãng.',
        imageUrl: require('../../assets/images/d2.jpg'),
        price: '1.800.000 VNĐ',
      },
    ],
  },
];

const Item = ({ title, description, imageUrl, price }) => {
  const handleOrder = () => {
    Alert.alert('Đặt hàng thành công', `Bạn đã đặt hàng: ${title}`);
  };

  return (
    <View style={styles.item}>
      <Image source={imageUrl} style={styles.productImage} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.price}>{price}</Text>
      <TouchableOpacity style={styles.orderButton} onPress={handleOrder}>
        <Text style={styles.buttonText}>Đặt hàng</Text>
      </TouchableOpacity>
    </View>
  );
};

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = DATA.filter(category =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          // source={require('../../assets/images/logocafe.png')}
          // style={styles.logo}
        />
        <Text style={styles.header}>Welcome To My Shoe Store SHEEP SHOOP SHUUP</Text>
      </View>
      <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Tìm kiếm..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {/* Cart Icon */}
      <TouchableOpacity style={styles.iconButton} onPress={() => Alert.alert('Giỏ hàng của bạn')}>
        <Ionicons name="cart" size={30} color="#000" />
      </TouchableOpacity>
      {/* Profile Icon */}
      <TouchableOpacity style={styles.iconButton} onPress={() => Alert.alert('Trang cá nhân của bạn')}>
        <Ionicons name="person" size={30} color="#000" />
      </TouchableOpacity>
    </View>
      <Image
        source={require('../../assets/images/banner2.png')}
        style={styles.banner}
      />
      <FlatList
        data={filteredCategories}
        keyExtractor={category => category.id}
        renderItem={({ item: category }) => (
          <View>
            <Text style={styles.categoryTitle}>{category.title}</Text>
            <FlatList
              data={category.products}
              renderItem={({ item }) => <Item {...item} />}
              keyExtractor={item => item.id}
              numColumns={2} // Số cột trong lưới
              columnWrapperStyle={styles.row} // Thêm style cho hàng
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#99CCFF',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginRight: 10,
  },
  banner: {
    width: '100%',
    height: 280,
    resizeMode: 'cover',
    marginVertical: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00796b',
    textAlign: 'center',
  },
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  hotline: {
    fontSize: 16,
    color: '#00796b',
  },
  address: {
    fontSize: 16,
    color: '#00796b',
  },
  searchInput: {
    height: 40,
    width:300,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00796b',
    margin: 10,
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#80deea',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.5,
    flex: 1, // Thêm để sử dụng không gian trong lưới
    maxWidth: '45%', // Đảm bảo mỗi sản phẩm chiếm không quá 45% chiều rộng
  },
  productImage: {
    width: '100%', // Chiếm toàn bộ chiều rộng
    height: 120,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    color: '#004d40',
    fontWeight: '600',
  },
  description: {
    fontSize: 12,
    color: '#555',
    marginTop: 5,
  },
  price: {
    fontSize: 14,
    color: '#ff5722',
    fontWeight: 'bold',
    marginTop: 5,
  },
  orderButton: {
    marginTop: 5,
    backgroundColor: '#FF9999',
    borderRadius: 5,
    paddingVertical: 5,
    alignItems: 'center',
  },
  cartButton: {
    marginLeft: 20,
  },
  cartIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  iconButton: {
    marginLeft: 10,
  },
  row: {
    justifyContent: 'space-between', // Chỉnh lại để mỗi hàng có khoảng cách đều nhau
  },
});

export default App;
//doan code 
