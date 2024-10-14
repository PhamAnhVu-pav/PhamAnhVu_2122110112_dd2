import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Sample product data
const DATA = [
  {
    id: 'category-1',
    title: 'Tất Cả Sản Phẩm',
    products: [
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'Giày Vans Trắng',
        description: 'Mô tả cho sản phẩm cafe nguyên chất.',
        attributes: 'Hương vị đậm đà, 100% tự nhiên',
        sugarPercentage: '0%',
        icePercentage: '0%',
        sizes: ['38', '39','40','41','42','43'], // Added sizes
        relatedProducts: [
          { title: 'Cafe chuẩn vị', imageUrl: require('../../assets/images/d1.jpg') },
          { title: 'Cafe rang xay', imageUrl: require('../../assets/images/d2.jpg') },
        ],
        reviews: [
          { user: 'Nguyen Van A', comment: 'Giày!', rating: 5 },
          { user: 'Tran Thi B', comment: 'Hơi đắt nhưng đáng.', rating: 4 },
        ],
        imageUrl: require('../../assets/images/d2.jpg'), // Ensure this path is correct
        price: '245.000 VNĐ',
      },
      // Add more products here...
    ],
  },
];

const ProductDetail = ({ visible, onClose, product, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <Image source={product.imageUrl} style={styles.fullImage} />

        <View style={styles.modalContent}>
          <Text style={styles.productDetailTitle}>Chi tiết sản phẩm</Text>
          <Text style={styles.modalTitle}>{product.title}</Text>
         
          <Text style={styles.modalSugar}>Giày chính hảng{product.sugarPercentage}</Text>
          
          
          {/* Size Selection */}
          <Text style={styles.modalSize}>Chọn size:</Text>
          <View style={styles.sizeContainer}>
            {product.sizes.map((size) => (
              <TouchableOpacity
                key={size}
                onPress={() => setSelectedSize(size)}
                style={[
                  styles.sizeButton,
                  selectedSize === size && styles.selectedSizeButton,
                ]}
              >
                <Text style={styles.sizeText}>{size}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.modalPrice}>{product.price}</Text>

          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={decreaseQuantity} style={styles.button}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity onPress={increaseQuantity} style={styles.button}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => {
              if (selectedSize) {
                onAddToCart({ ...product, size: selectedSize }, quantity);
              }
            }}
            style={styles.addToCartButton}
          >
            <Icon name="add-shopping-cart" size={20} color="#fff" />
            <Text style={styles.buttonText}> Thêm vào giỏ hàng</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.modalButton} onPress={onClose}>
            <Icon name="close" size={20} color="#fff" />
            <Text style={styles.buttonText}> Đóng</Text>
          </TouchableOpacity>

          <Text style={styles.relatedTitle}>Sản phẩm liên quan:</Text>
          <FlatList
            data={product.relatedProducts}
            renderItem={({ item }) => (
              <View style={styles.relatedItem}>
                <Image source={item.imageUrl} style={styles.relatedImage} />
                <Text style={styles.relatedProduct}>{item.title}</Text>
              </View>
            )}
            keyExtractor={(item) => item.title}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />

          <Text style={styles.reviewsTitle}>Đánh giá:</Text>
          <FlatList
            data={product.reviews}
            renderItem={({ item }) => (
              <View style={styles.reviewItem}>
                <Text style={styles.reviewUser}>{item.user}:</Text>
                <Text style={styles.reviewComment}>{item.comment}</Text>
                <Text style={styles.reviewRating}>Rating: {item.rating} ★</Text>
              </View>
            )}
            keyExtractor={(item) => item.user}
          />
        </View>
      </View>
    </Modal>
  );
};

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const openDetail = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const closeDetail = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  const addToCart = (product, quantity) => {
    const item = { ...product, quantity };
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id && cartItem.size === item.size);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id && cartItem.size === item.size
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      } else {
        return [...prevCart, item];
      }
    });
    closeDetail();
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0); // Calculate total quantity in cart

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => openDetail(item)}>
      <View style={styles.item}>
        <Image source={item.imageUrl} style={styles.productImage} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  const filteredProducts = DATA[0].products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sản phẩm</Text>
        <TouchableOpacity style={styles.cartButton}>
          <Icon name="shopping-cart" size={30} color="#fff" />
          {cartCount > 0 && (
            <View style={styles.cartCountContainer}>
              <Text style={styles.cartCountText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Tìm kiếm sản phẩm..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      {selectedProduct && (
        <ProductDetail
          visible={modalVisible}
          onClose={closeDetail}
          product={selectedProduct}
          onAddToCart={addToCart}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#99CCFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FF9999',
  },
  headerTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  cartButton: {
    padding: 10,
    position: 'relative',
  },
  cartCountContainer: {
    position: 'absolute',
    right: -10,
    top: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartCountText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  searchInput: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    margin: 10,
    backgroundColor: '#FFFFFF',
  },
  item: {
    backgroundColor: '#80deea',
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  productImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  price: {
    fontSize: 14,
    color: '#ff5722',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 20,
  },
  fullImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  modalContent: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginTop: -50,
    width: '100%',
  },
  productDetailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 22,
    color: '#000000',
    fontWeight: 'bold',
  },
  modalDescription: {
    fontSize: 16,
    color: '#000000',
    marginVertical: 10,
  },
  modalAttributes: {
    fontSize: 14,
    color: '#000000',
  },
  modalSugar: {
    fontSize: 14,
    color: '#000000',
  },
  modalIce: {
    fontSize: 14,
    color: '#000000',
  },
  modalSize: {
    fontSize: 14,
    color: '#000000',
    marginTop: 10,
  },
  sizeContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  sizeButton: {
    borderWidth: 1,
    borderColor: '#00796b',
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 5,
    backgroundColor: '#ffffff', // Default background color
  },
  selectedSizeButton: {
    backgroundColor: '#ffeb3b', // Yellow background when selected
  },
  sizeText: {
    color: '#00796b',
  },
  modalPrice: {
    fontSize: 20,
    color: '#ff5722',
    fontWeight: 'bold',
  },
  modalButton: {
    marginTop: 20,
    backgroundColor: '#FF9999',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addToCartButton: {
    marginTop: 20,
    backgroundColor: '#FF9999',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  relatedTitle: {
    fontSize: 18,
    color: '#000000',
    marginTop: 10,
    fontWeight: 'bold',
  },
  relatedItem: {
    marginRight: 10,
    alignItems: 'center',
  },
  relatedImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 5,
  },
  relatedProduct: {
    fontSize: 14,
    color: '#000000',
  },
  reviewsTitle: {
    fontSize: 18,
    color: '#000000',
    marginTop: 20,
    fontWeight: 'bold',
  },
  reviewItem: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  reviewUser: {
    fontWeight: 'bold',
  },
  reviewComment: {
    marginVertical: 5,
  },
  reviewRating: {
    color: '#ff5722',
  },
  button: {
    backgroundColor: '#FF9999',
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 5,
  },
});

export default App;
