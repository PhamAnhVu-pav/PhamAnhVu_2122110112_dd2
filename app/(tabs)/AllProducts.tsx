// import React, { useEffect, useState } from 'react';
// import { View, FlatList, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Button } from 'react-native';
// import axios from 'axios';

// const ApiImages = 'http://127.0.0.1:8000';
// const PAGE_SIZE = 5;

// const AllProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [totalPages, setTotalPages] = useState(1);

//   useEffect(() => {
//     fetchProducts();
//   }, [page]);

//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`http://127.0.0.1:8000/api/product?page=${page}&limit=${PAGE_SIZE}`);
//       if (response.data && response.data.status) {
//         setProducts(response.data.products);
//         setTotalPages(Math.ceil(response.data.total / PAGE_SIZE)); // Tính số trang nếu API không trả về total_pages
//       } else {
//         setError("Không thể tải danh sách sản phẩm.");
//       }
//     } catch (error) {
//       setError("Không thể tải danh sách sản phẩm.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const goToNextPage = () => {
//     if (page < totalPages) {
//       setPage(page + 1);
//     }
//   };

//   const goToPreviousPage = () => {
//     if (page > 1) {
//       setPage(page - 1);
//     }
//   };

//   if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
//   if (error) return <Text>{error}</Text>;

//   const renderProduct = ({ item }) => (
//     <TouchableOpacity style={styles.productItem} onPress={() => console.log(item.name)}>
//       <Image
//         source={{ uri: item.images?.[0]?.thumbnail ? `${ApiImages}/images/product/${item.images[0].thumbnail}` : null }}
//         style={styles.productImage}
//       />
//       <Text style={styles.productTitle} numberOfLines={1} ellipsizeMode="tail">
//         {item.name}
//       </Text>
//       <Text style={styles.productPrice} numberOfLines={1} ellipsizeMode="tail">
//         {item.pricebuy.toLocaleString('vi-VN')} VND
//       </Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={products}
//         renderItem={renderProduct}
//         keyExtractor={(item) => item.id.toString()}
//         numColumns={2}
//         contentContainerStyle={styles.productList}
//       />
//       <View style={styles.pagination}>
//         <Button title="<" onPress={goToPreviousPage} disabled={page === 1} />
//         <Text style={styles.pageNumber}>Trang {page} / {totalPages}</Text>
//         <Button title=">" onPress={goToNextPage} disabled={page === totalPages} />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   productList: {
//     paddingHorizontal: 10,
//   },
//   productItem: {
//     flex: 1,
//     margin: 5,
//     backgroundColor: '#FFF',
//     alignItems: 'center',
//     padding: 10,
//     borderRadius: 8,
//     elevation: 3,
//   },
//   productImage: {
//     width: 60,
//     height: 60,
//     marginBottom: 5,
//   },
//   productTitle: {
//     fontSize: 12,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   productPrice: {
//     color: '#00796b',
//   },
//   pagination: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 10,
//   },
//   pageNumber: {
//     marginHorizontal: 20,
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default AllProducts;
