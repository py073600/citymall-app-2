import React from 'react';
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

const categories = [
  { id: 1, name: "Men's", icon: '👔' },
  { id: 2, name: "Women's", icon: '👗' },
  { id: 3, name: 'Kids', icon: '👶' },
  { id: 4, name: 'Footwear', icon: '👟' },
  { id: 5, name: 'Western', icon: '🎭' },
  { id: 6, name: 'Brand Store', icon: '🏪' },
  { id: 7, name: 'Electronics', icon: '📱' },
  { id: 8, name: 'Winter', icon: '🧥' },
  { id: 9, name: 'Kitchen', icon: '🍳' },
  { id: 10, name: 'Home', icon: '🏠' },
  { id: 11, name: 'Decor', icon: '🎨' },
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
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Low Prices • More Saving</Text>
          
          {/* Search Bar */}
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
          {categories.map((category) => (
            <TouchableOpacity 
              key={category.id} 
              style={styles.categoryItem}
              onPress={() => console.log(`${category.name} pressed`)}
            >
              <View style={styles.categoryIconContainer}>
                <Text style={styles.categoryIcon}>{category.icon}</Text>
              </View>
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
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
    backgroundColor: '#FFE44D',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  searchIcon: {
    padding: 8,
  },
  micIcon: {
    padding: 8,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '20%',
    alignItems: 'center',
    marginBottom: 20,
  },
  categoryIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  categoryIcon: {
    fontSize: 24,
  },
  categoryName: {
    fontSize: 12,
    textAlign: 'center',
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
