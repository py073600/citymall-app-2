import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions
} from 'react-native-web';

const categories = [
  { 
    id: 1, 
    name: "Men's", 
    icon: '👔',
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=500&q=80'
  },
  { 
    id: 2, 
    name: "Women's", 
    icon: '👗',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&q=80'
  },
  { 
    id: 3, 
    name: 'Kids', 
    icon: '👶',
    image: 'https://images.unsplash.com/photo-1534255536877-96d31c1a8f2e?w=500&q=80'
  },
  { 
    id: 4, 
    name: 'Footwear', 
    icon: '👟',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&q=80'
  },
  { 
    id: 5, 
    name: 'Western', 
    icon: '🎭',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500&q=80'
  },
  { 
    id: 6, 
    name: 'Brand Store', 
    icon: '🏪',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&q=80'
  },
  { 
    id: 7, 
    name: 'Electronics', 
    icon: '📱',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&q=80'
  },
  { 
    id: 8, 
    name: 'Winter', 
    icon: '🧥',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&q=80'
  },
  { 
    id: 9, 
    name: 'Kitchen', 
    icon: '🍳',
    image: 'https://images.unsplash.com/photo-1556909172-8c2f041fca1e?w=500&q=80'
  },
  { 
    id: 10, 
    name: 'Home', 
    icon: '🏠',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500&q=80'
  },
  { 
    id: 11, 
    name: 'Decor', 
    icon: '🎨',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&q=80'
  },
];

const deals = [
  {
    id: 1,
    name: 'Fleece Hoodie',
    price: '₹300 OFF',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    name: 'Innate Branded',
    price: '₹160 OFF',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    name: 'Buddha Trimm',
    price: '₹500 OFF',
    image: 'https://via.placeholder.com/150',
  },
];

const FashionHomeScreen = ({ onBack }) => {
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const screenWidth = Dimensions.get('window').width;
    const cardWidth = screenWidth * 0.8; // 80% of screen width
    
    const autoScroll = setInterval(() => {
      if (scrollViewRef.current) {
        const nextIndex = (currentIndex + 1) % categories.length;
        scrollViewRef.current.scrollTo({
          x: nextIndex * cardWidth,
          animated: true
        });
        setCurrentIndex(nextIndex);
      }
    }, 3000); // Scroll every 3 seconds

    return () => clearInterval(autoScroll);
  }, [currentIndex]);

  const handleScroll = (event) => {
    const screenWidth = Dimensions.get('window').width;
    const cardWidth = screenWidth * 0.8;
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / cardWidth);
    setCurrentIndex(index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header with Back Button */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={onBack}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>Low Prices • More Saving</Text>
        </View>

        {/* Search Section */}
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <TextInput
              style={styles.searchInput}
              placeholder='Search "Garbage Bag"'
              placeholderTextColor="#666"
            />
            <TouchableOpacity style={styles.searchIcon}>
              <Text>🔍</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.micIcon}>
              <Text>🎤</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories Grid */}
        <View style={styles.categoriesGrid}>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            contentContainerStyle={styles.scrollContent}
          >
            {categories.map((category, index) => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryCard}
                onPress={() => console.log(`${category.name} pressed`)}
              >
                <View style={styles.categoryImageContainer}>
                  <Image
                    source={{ uri: category.image }}
                    style={styles.categoryImage}
                  />
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.pagination}>
            {categories.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  index === currentIndex && styles.paginationDotActive
                ]}
              />
            ))}
          </View>
        </View>

        {/* Hot Deals Section */}
        <View style={styles.dealsSection}>
          <View style={styles.dealsBanner}>
            <Text style={styles.dealsTitle}>HOT DEALS FOR WINTERS</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All Deals &gt;&gt;&gt;</Text>
            </TouchableOpacity>
          </View>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.dealsScroll}
          >
            {deals.map((deal) => (
              <View key={deal.id} style={styles.dealCard}>
                <Image source={{ uri: deal.image }} style={styles.dealImage} />
                <Text style={styles.dealName}>{deal.name}</Text>
                <Text style={styles.dealPrice}>{deal.price}</Text>
                <TouchableOpacity style={styles.addButton}>
                  <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>📑</Text>
          <Text style={styles.navText}>Category</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem}
          onPress={onBack}
        >
          <Text style={styles.navIcon}>🛍️</Text>
          <Text style={styles.navText}>Orders</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingTop: 20,
    backgroundColor: '#FFE44D',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 60,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  backButtonText: {
    fontSize: 24,
    color: '#333',
  },
  headerText: {
    fontSize: 19,
    fontWeight: 'bold',
    marginLeft: 8,
    flex: 1,
  },
  searchSection: {
    padding: 16,
    backgroundColor: '#fff',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 8,
    fontSize: 16,
  },
  searchIcon: {
    padding: 8,
  },
  micIcon: {
    padding: 8,
  },
  categoriesGrid: {
    padding: 16,
  },
  scrollContent: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 15,
  },
  categoryCard: {
    alignItems: 'center',
    marginHorizontal: 8,
    width: 80,
  },
  categoryImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    backgroundColor: '#f5f5f5',
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
    marginTop: 8,
    textAlign: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#FFE44D',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  dealsSection: {
    padding: 16,
  },
  dealsBanner: {
    backgroundColor: '#4169E1',
    padding: 16,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  dealsTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewAllButton: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 15,
  },
  viewAllText: {
    color: '#4169E1',
    fontWeight: 'bold',
  },
  dealsScroll: {
    marginTop: 16,
  },
  dealCard: {
    width: 150,
    marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dealImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  dealName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  dealPrice: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  addButton: {
    position: 'absolute',
    right: 8,
    bottom: 8,
    backgroundColor: '#4CAF50',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  navText: {
    fontSize: 12,
  },
});

export default FashionHomeScreen;
