import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native-web';

const categories = [
  {
    id: 1,
    title: 'Atta,Sugar,Salt,Oil,Ghee',
    items: [
      { id: 1, name: 'Atta', image: 'https://via.placeholder.com/150' },
      { id: 2, name: 'Salt, Sugar & Jaggery', image: 'https://via.placeholder.com/150' },
      { id: 3, name: 'Edible Oils', image: 'https://via.placeholder.com/150' },
      { id: 4, name: 'Ghee & Vanaspati', image: 'https://via.placeholder.com/150' },
    ]
  },
  {
    id: 2,
    title: 'Dal, Rice, Spices, Dry Fruit',
    items: [
      { id: 1, name: 'Pulses', image: 'https://via.placeholder.com/150' },
      { id: 2, name: 'Dry Fruits & Nuts', image: 'https://via.placeholder.com/150' },
      { id: 3, name: 'Rice And Rice Products', image: 'https://via.placeholder.com/150' },
      { id: 4, name: 'Besan, Sooji & Similar Products', image: 'https://via.placeholder.com/150' },
    ]
  },
  // Add more categories as needed
];

const CategoryScreen = ({ onBack }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={onBack}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Categories</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {categories.map((category) => (
          <View key={category.id} style={styles.categorySection}>
            <Text style={styles.categoryTitle}>{category.title}</Text>
            <View style={styles.itemsGrid}>
              {category.items.map((item) => (
                <TouchableOpacity 
                  key={item.id} 
                  style={styles.itemCard}
                  onPress={() => console.log('Selected:', item.name)}
                >
                  <Image 
                    source={{ uri: item.image }} 
                    style={styles.itemImage}
                  />
                  <Text style={styles.itemName}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#FFE44D',
    padding: 16,
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 20,
    marginRight: 12,
  },
  backButtonText: {
    fontSize: 24,
    color: '#333',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollView: {
    flex: 1,
  },
  categorySection: {
    padding: 16,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  itemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  itemCard: {
    width: '48%',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  itemImage: {
    width: 80,
    height: 80,
    marginBottom: 8,
    borderRadius: 8,
  },
  itemName: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
  },
});

export default CategoryScreen;
