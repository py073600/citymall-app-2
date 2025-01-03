import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native-web';
import FashionHomeScreen from './FashionHomeScreen';

const products = [
  {
    id: 1,
    name: '707 Dishwash Bar',
    weight: '600 g',
    price: 45,
    originalPrice: 79,
    discount: '43%',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    name: 'Shubhkart Nirmala',
    weight: '3X10 Pc',
    price: 24.99,
    originalPrice: 36,
    discount: '31%',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    name: 'Sunfeast Mom\'s Magic',
    weight: '3X65.7 g',
    price: 28.50,
    originalPrice: 30,
    discount: '5%',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 4,
    name: 'Godrej Fab Detergent',
    weight: '1 L',
    price: 97,
    originalPrice: 99,
    discount: '2%',
    image: 'https://via.placeholder.com/150',
  },
];

const HomeScreen = ({ onOrdersPress }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [showFashionHome, setShowFashionHome] = useState(false);

  const rashanItems = [
    'Groceries',
    'Pulses',
    'Rice',
    'Cooking Oil',
    'Spices',
  ];

  const fashionItems = [
    'Clothing',
    'Accessories',
    'Home Decor',
    'Kitchen Items',
    'Furniture',
  ];

  const handleTabPress = (tab) => {
    setActiveTab(tab);
    if (tab === 'orders') {
      onOrdersPress();
    }
  };

  if (showFashionHome) {
    return <FashionHomeScreen onBack={() => setShowFashionHome(false)} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.deliveryText}>Delivery by 8th January</Text>
          
          <View style={styles.categories}>
            <TouchableOpacity 
              style={[
                styles.rashanBox,
                hoveredCategory === 'rashan' && styles.hoveredCategory
              ]}
              onPress={() => console.log('Rashan pressed')}
              onMouseEnter={() => setHoveredCategory('rashan')}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <Text style={styles.categoryText}>Rashan</Text>
              <Image 
                source={{ uri: 'https://via.placeholder.com/70' }}
                style={styles.categoryImage}
              />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.fashionBox,
                hoveredCategory === 'fashion' && styles.hoveredCategory
              ]}
              onPress={() => setShowFashionHome(true)}
              onMouseEnter={() => setHoveredCategory('fashion')}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <Text style={styles.categoryText}>Fashion & Home</Text>
              <Image 
                source={{ uri: 'https://via.placeholder.com/70' }}
                style={styles.categoryImage}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.searchBar}>
            <TextInput
              style={styles.searchInput}
              placeholder='Search "Knorr Soup"'
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity style={styles.searchIcon}>
              <Text>🔍</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.micIcon}>
              <Text>🎤</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.orderAgainSection}>
          <Text style={styles.sectionTitle}>Order again 🔥</Text>
          <TouchableOpacity onPress={() => console.log('View all pressed')}>
            <Text style={styles.viewAllText}>View all →</Text>
          </TouchableOpacity>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.productsScroll}
        >
          {products.map((product) => (
            <View key={product.id} style={styles.productCard}>
              <View style={styles.discountTag}>
                <Text style={styles.discountText}>{product.discount} OFF</Text>
              </View>
              <Image source={{ uri: product.image }} style={styles.productImage} />
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productWeight}>{product.weight}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>₹{product.price}</Text>
                <Text style={styles.originalPrice}>₹{product.originalPrice}</Text>
              </View>
              <TouchableOpacity 
                style={styles.addButton}
                onPress={() => console.log('Add pressed', product.id)}
              >
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={[styles.navItem, activeTab === 'home' && styles.activeNavItem]}
          onPress={() => handleTabPress('home')}
        >
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={[styles.navText, activeTab === 'home' && styles.activeNavText]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.navItem, activeTab === 'category' && styles.activeNavItem]}
          onPress={() => handleTabPress('category')}
        >
          <Text style={styles.navIcon}>📑</Text>
          <Text style={[styles.navText, activeTab === 'category' && styles.activeNavText]}>Category</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.navItem, activeTab === 'orders' && styles.activeNavItem]}
          onPress={() => handleTabPress('orders')}
        >
          <Text style={styles.navIcon}>🛍️</Text>
          <Text style={[styles.navText, activeTab === 'orders' && styles.activeNavText]}>Orders</Text>
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
    backgroundColor: '#ffb6c1',
  },
  deliveryText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 16,
    paddingHorizontal: '15%',
  },
  rashanBox: {
    flex: 1,
    backgroundColor: '#e91e63',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    maxWidth: '40%',
    aspectRatio: 1.3,
    justifyContent: 'center',
  },
  fashionBox: {
    flex: 1,
    backgroundColor: '#87CEEB',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    maxWidth: '40%',
    aspectRatio: 1.3,
    justifyContent: 'center',
  },
  hoveredCategory: {
    transform: [{scale: 1.05}],
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  },
  categoryText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  categoryImage: {
    width: 25,
    height: 25,
    borderRadius: 4,
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 8,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 16,
    fontSize: 16,
    height: 40,
  },
  searchIcon: {
    padding: 8,
  },
  micIcon: {
    padding: 8,
  },
  orderAgainSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  viewAllText: {
    color: '#e91e63',
    fontSize: 14,
  },
  productsScroll: {
    paddingHorizontal: 16,
  },
  productCard: {
    width: 150,
    marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 16,
  },
  discountTag: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#4caf50',
    padding: 4,
    borderRadius: 4,
    zIndex: 1,
  },
  discountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  productImage: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  productWeight: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: '#666',
    textDecorationLine: 'line-through',
  },
  addButton: {
    position: 'absolute',
    right: 8,
    bottom: 8,
    width: 24,
    height: 24,
    backgroundColor: '#e91e63',
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
    borderTopColor: '#eee',
    backgroundColor: '#fff',
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
  },
  activeNavItem: {
    backgroundColor: '#f8f8f8',
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  navText: {
    fontSize: 12,
    color: '#666',
  },
  activeNavText: {
    color: '#e91e63',
  },
});

export default HomeScreen;
