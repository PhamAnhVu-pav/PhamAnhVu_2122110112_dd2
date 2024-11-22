import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
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
  ToastAndroid,
  Platform,
  Dimensions,
  ScrollView,
} from 'react-native';
import BannerList from './BannerList';
import ProductDetail from './Cart';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

const BANNERS = [
  require('../../assets/images/banner1.png'),
  require('../../assets/images/banner2.png'),
  require('../../assets/images/banner3.png'),
];

const relatedProductsArray = [
  { id: 1, title: 'Nike lanes', imageUrl: require('../../assets/images/d3.jpg') },
  { id: 2, title: 'Puma shoes', imageUrl: require('../../assets/images/d2.jpg') },
  { id: 3, title: 'Relantedess', imageUrl: require('../../assets/images/d1.jpg') },
];

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
        brand: 'Balenciaga',
      },
    ],
  },
  {
    id: 'category-nike',
    title: 'Nike',
    products: [
      {
        id: 'nike1',
        title: 'Nike Air Max',
        description: 'Mô tả cho sản phẩm Nike chính hãng.',
        imageUrl: require('../../assets/images/d2.jpg'),
        price: '3.000.000 VNĐ',
        brand: 'Nike',
      },
    ],
  },
  {
    id: 'category-adidas',
    title: 'Adidas',
    products: [
      {
        id: 'adidas1',
        title: 'Adidas Ultra Boost',
        description: 'Mô tả cho sản phẩm Adidas chính hãng.',
        imageUrl: require('../../assets/images/d3.jpg'),
        price: '3.200.000 VNĐ',
        brand: 'Adidas',
      },
    ],
  },
  {
    id: 'category-puma',
    title: 'Puma',
    products: [
      {
        id: 'puma1',
        title: 'Puma Ultra Boost',
        description: 'Mô tả cho sản phẩm Pumas chính hãng.',
        imageUrl: require('../../assets/images/d4.jpg'),
        price: '3.667.000 VNĐ',
        brand: 'Puma',
      },
    ],
  },
];

const App = () => {
  const navigation = useNavigation();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [bannerIndex, setBannerIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('Tất Cả Sản Phẩm');

  const handleProductPress = (product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = (product) => {
    Alert.alert('Thêm vào giỏ hàng', `${product.title} đã được thêm vào giỏ hàng!`);
    closeModal();
  };

  // Hàm hiển thị thông báo khi nhấn vào biểu tượng thông báo
  const handleNotificationPress = () => {
    console.log('Thông báo đã được nhấn');

    if (Platform.OS === 'web') {
      Alert.alert('Chúc mừng quý khách!');
    } else if (Platform.OS === 'android') {
      ToastAndroid.show('Chúc mừng quý khách!', ToastAndroid.SHORT);
    } else {
      Alert.alert('Thông báo', 'Chúc mừng quý khách!');
    }
  };

  // Hàm hiển thị thông báo chào mừng quý khách
  const showWelcomeMessage = () => {
    console.log('Chào mừng quý khách đến với cửa hàng!'); // Log để kiểm tra
    if (Platform.OS === 'android') {
      ToastAndroid.show('Chào mừng quý khách đến với cửa hàng!', ToastAndroid.SHORT);
    } else {
      Alert.alert('Chào mừng', 'Chào mừng quý khách đến với cửa hàng!');
    }
  };

  // Hiển thị thông báo chào mừng mỗi 3 giây
  useEffect(() => {
    const interval = setInterval(() => {
      showWelcomeMessage();
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const Item = ({ product }) => (
    <TouchableOpacity onPress={() => handleProductPress(product)}>
      <View style={styles.item}>
        <Image
          source={
            product && product.imageUrl
              ? (typeof product.imageUrl === 'string' ? { uri: product.imageUrl } : product.imageUrl)
              : require('../../assets/images/n3.png')
          }
          style={styles.productImage}
        />
        <Text style={styles.title}>{product?.title || 'No Title'}</Text>
        <Text style={styles.description}>{product?.description || 'No Description'}</Text>
        <Text style={styles.price}>{product?.price || 'No Price'}</Text>
      </View>
    </TouchableOpacity>
  );

  const CategoryFilter = ({ categories, onSelectCategory }) => (
    <View style={styles.categoryFilter}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category.title}
          style={styles.categoryButton}
          onPress={() => onSelectCategory(category.title)}
        >
          <Image source={category.imageUrl} style={styles.categoryImage} />
          <Text style={styles.categoryButtonText}>{category.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((prevIndex) => (prevIndex + 1) % BANNERS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const categories = [
    { title: 'Tất Cả Sản Phẩm', imageUrl: require('../../assets/images/banner1.png') },
    { title: 'Nike', imageUrl: require('../../assets/images/d2.jpg') },
    { title: 'Adidas', imageUrl: require('../../assets/images/d3.jpg') },
    { title: 'Puma', imageUrl: require('../../assets/images/d4.jpg') },
  ];  const productsToDisplay = DATA.flatMap(category => category.products)
    .filter(product =>
      (selectedCategory === 'Tất Cả Sản Phẩm' ||
        DATA.find(cat => cat.title === selectedCategory)?.products.includes(product)) &&
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.header}>SHEEP SHOOP SHUUP</Text>
        
        {/* Icon thông báo */}
        <TouchableOpacity style={styles.notificationIconContainer} onPress={handleNotificationPress}>
          <Icon name="notifications" size={30} color="#ff9800" />
        </TouchableOpacity>

        {/* Icon giỏ hàng */}
        <TouchableOpacity style={styles.cartIconContainer} onPress={() => Alert.alert('Giỏ hàng')}>
          <Icon name="shopping-cart" size={30} color="#00796b" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <ScrollView>
        <BannerList banners={BANNERS} />
      </ScrollView>

      <CategoryFilter categories={categories} onSelectCategory={setSelectedCategory} />

      <FlatList
        data={productsToDisplay}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Item product={item} />}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
      {isModalVisible && selectedProduct && (
        <ProductDetail
          visible={isModalVisible}
          onClose={closeModal}
          product={selectedProduct}
          onAddToCart={handleAddToCart}
          relatedProducts={relatedProductsArray}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#99CCF',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3f51b5',
    marginRight: 'auto',
  },
  notificationIconContainer: {
    marginLeft: 'auto',
    marginRight: 20,
  },
  cartIconContainer: {
    marginRight: 20,
  },
  searchContainer: {
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  categoryFilter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  categoryButton: {
    padding: 10,
  },
  categoryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3f51b5',
  },
  row: {
    justifyContent: 'space-between',
  },
  item: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    flex: 1,
    alignItems: 'center',
    height: 220,
  },
  productImage: {
    width: width / 2 - 40,
    height: 120,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 12,
    color: 'gray',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#f44336',
  },
  categoryFilter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  categoryButton: {
    alignItems: 'center',
  },
  categoryImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3f51b5',
    textAlign: 'center',
  },
});

export default App;
