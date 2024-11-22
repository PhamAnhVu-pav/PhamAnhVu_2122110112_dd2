import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, Image, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window');

const BannerList = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/banner');
        setBanners(response.data.banners);
      } catch (error) {
        console.error('Error fetching banners:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!banners.length) {
    return <Text>No banners available</Text>;
  }

  return (
    <View style={styles.container}>
      <Swiper
        autoplay
        autoplayTimeout={3}
        showsPagination
        loop
        style={styles.swiper}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
      >
        {banners.map(banner => (
          <View key={banner.id} style={styles.slide}>
            <Image
              source={{ uri: `http://localhost:8000/images/banner/${banner.image}` }}
              style={styles.bannerImage}
            />
          </View>
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  swiper: {
    height: '100%',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerImage: {
    width: width,
    height: '100%',
    resizeMode: 'cover',
  },
  dot: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  activeDot: {
    backgroundColor: '#FFFFFF',
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 3,
  },
});

export default BannerList;
