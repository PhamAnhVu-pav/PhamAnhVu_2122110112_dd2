import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProductDetail = ({ visible, onClose, product, onAddToCart, relatedProducts }) => {
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
  const relatedProductsArray = [
    {
      id: 1,
      title: 'Related Product 1',
      imageUrl: require('../../assets/images/d3.jpg'),
    },
    {
      id: 2,
      title: 'Related Product 2',
      imageUrl: require('../../assets/images/d2.jpg'),
    },
    {
      id: 3,
      title: 'Related Product 3',
      imageUrl: require('../../assets/images/d1.jpg'),
    },
    // Add more related products as needed
  ];
  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    Alert.alert("Thông báo", "Sản phẩm đã được thêm vào giỏ hàng!");
  };

  return (
    <Modal animationType="slide" transparent visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icon name="close" size={24} color="#fff" />
          </TouchableOpacity>
          <Image source={product.imageUrl} style={styles.productImage} />
          <Text style={styles.productTitle}>{product.title}</Text>
          <Text style={styles.productDescription}>{product.description}</Text>
          <Text style={styles.productPrice}>{product.price}</Text>

          <View style={styles.sizeContainer}>
            <Text style={styles.sizeLabel}>Chọn kích cỡ:</Text>
            <FlatList
              data={['S', 'M', 'L', 'XL']}
              horizontal
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.sizeButton,
                    selectedSize === item && styles.selectedSizeButton,
                  ]}
                  onPress={() => setSelectedSize(item)}
                >
                  <Text style={styles.sizeButtonText}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
            />
          </View>

          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={handleAddToCart}
          >
            <Text style={styles.addToCartButtonText}>Thêm vào giỏ hàng</Text>
          </TouchableOpacity>

          {/* Related Products Section */}
          <Text style={styles.relatedProductsTitle}>Sản phẩm liên quan</Text>
          <FlatList
            data={relatedProducts}
            horizontal
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.relatedProductItem}>
                <Image source={item.imageUrl} style={styles.relatedProductImage} />
                <Text style={styles.relatedProductTitle}>{item.title}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginVertical: 10,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff5722',
  },
  sizeContainer: {
    marginVertical: 15,
    alignItems: 'center',
  },
  sizeLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sizeButton: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: '#eee',
  },
  selectedSizeButton: {
    backgroundColor: '#ff5722',
  },
  sizeButtonText: {
    color: '#000',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  quantityButton: {
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  addToCartButton: {
    backgroundColor: '#ff5722',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
  },
  addToCartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  relatedProductsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  relatedProductItem: {
    alignItems: 'center',
    marginRight: 10,
  },
  relatedProductImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  relatedProductTitle: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },
});

export default ProductDetail;
