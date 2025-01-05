import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
  PanResponder,
  Animated,
} from 'react-native-web';
import FashionHomeScreen from './FashionHomeScreen';
import CategoryScreen from './CategoryScreen';

const products = Array(15).fill().map((_, index) => ({
  id: index + 1,
  name: `Product ${index + 1}`,
  weight: '1 kg',
  price: Math.floor(Math.random() * 500) + 100,
  originalPrice: Math.floor(Math.random() * 1000) + 500,
  discount: `${Math.floor(Math.random() * 50) + 10}%`,
  image: index === 1 ? 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop' : 'https://via.placeholder.com/150',
}));

const orderAgainItems = [
  { id: 1, name: 'Fortune Oil', price: '₹110', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop' },
  { id: 2, name: 'Tata Salt', price: '₹20', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop' },
  { id: 3, name: 'Maggi', price: '₹14', image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&h=400&fit=crop' },
  { id: 4, name: 'Surf Excel', price: '₹85', image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400&h=400&fit=crop' },
  { id: 5, name: 'Aashirvaad Atta', price: '₹325', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop' },
  { id: 6, name: 'Parle-G', price: '₹10', image: 'https://images.unsplash.com/photo-1587206668283-c21d974993c3?w=400&h=400&fit=crop' },
  { id: 7, name: 'Dairy Milk', price: '₹40', image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&h=400&fit=crop' },
  { id: 8, name: 'Good Day', price: '₹30', image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=400&fit=crop' },
  { id: 9, name: 'Red Label', price: '₹140', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop' },
  { id: 10, name: 'Nescafe', price: '₹280', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=400&fit=crop' },
  { id: 11, name: 'Horlicks', price: '₹240', image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=400&h=400&fit=crop' },
  { id: 12, name: 'Colgate', price: '₹55', image: 'https://images.unsplash.com/photo-1559304822-9eb2813c9844?w=400&h=400&fit=crop' },
  { id: 13, name: 'Dove Soap', price: '₹45', image: 'https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?w=400&h=400&fit=crop' },
  { id: 14, name: 'Clinic Plus', price: '₹2', image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400&h=400&fit=crop' },
  { id: 15, name: 'Dettol', price: '₹65', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop' },
  { id: 16, name: 'Lux Soap', price: '₹35', image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=400&h=400&fit=crop' },
  { id: 17, name: 'Lifebuoy', price: '₹30', image: 'https://images.unsplash.com/photo-1585232351009-aa87416fca90?w=400&h=400&fit=crop' },
  { id: 18, name: 'Tide', price: '₹75', image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=400&fit=crop' },
  { id: 19, name: 'Boost', price: '₹220', image: 'https://images.unsplash.com/photo-1578021127722-1f1ff95b429e?w=400&h=400&fit=crop' },
  { id: 20, name: 'Kissan Jam', price: '₹110', image: 'https://images.unsplash.com/photo-1557925923-cd4648e211a0?w=400&h=400&fit=crop' }
];

const orderAgainSections = Array(20).fill().map((_, index) => ({
  id: index + 1,
  title: `Order Again ${index + 1} 🔥`,
  products: orderAgainItems,
}));

const HomeScreen = ({ onOrdersPress }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeTab, setActiveTab] = React.useState('home');
  const [hoveredCategory, setHoveredCategory] = React.useState(null);
  const [showFashionHome, setShowFashionHome] = React.useState(false);
  const [showCategories, setShowCategories] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState(Dimensions.get('window').width);
  const [position] = React.useState({
    x: new Animated.Value(20),
    y: new Animated.Value(180)
  });
  const [isDragging, setIsDragging] = React.useState(false);
  const moveThreshold = 5;
  const startTime = React.useRef(0);

  const handleFloatingTabPress = () => {
    setShowFashionHome(true);
  };

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        startTime.current = Date.now();
        setIsDragging(false);
        position.x.setOffset(position.x._value);
        position.y.setOffset(position.y._value);
        position.x.setValue(0);
        position.y.setValue(0);
      },
      onPanResponderMove: (e, gestureState) => {
        const distance = Math.sqrt(Math.pow(gestureState.dx, 2) + Math.pow(gestureState.dy, 2));
        if (distance > moveThreshold) {
          setIsDragging(true);
        }
        Animated.event(
          [null, { dx: position.x, dy: position.y }],
          { useNativeDriver: false }
        )(e, gestureState);
      },
      onPanResponderRelease: (e, gestureState) => {
        const endTime = Date.now();
        const duration = endTime - startTime.current;
        const distance = Math.sqrt(Math.pow(gestureState.dx, 2) + Math.pow(gestureState.dy, 2));
        
        position.x.flattenOffset();
        position.y.flattenOffset();

        // Consider it a tap if movement is small and duration is short
        if (distance < moveThreshold && duration < 200) {
          handleFloatingTabPress();
        }
        
        setIsDragging(false);
      }
    })
  ).current;

  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(Dimensions.get('window').width);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getResponsiveStyles = () => {
    const isMobile = windowWidth < 768;
    const isTablet = windowWidth >= 768 && windowWidth < 1024;

    return {
      categoryText: {
        fontSize: isMobile ? 13 : isTablet ? 14 : 16,
        marginBottom: isMobile ? 2 : 4,
      },
      categoryImage: {
        width: isMobile ? 45 : isTablet ? 60 : 70,
        height: isMobile ? 45 : isTablet ? 60 : 70,
        borderRadius: isMobile ? 23 : isTablet ? 30 : 35,
      },
      categoryBox: {
        padding: isMobile ? 8 : isTablet ? 12 : 14,
        aspectRatio: isMobile ? 1.1 : 1.3,
      },
      container: {
        paddingHorizontal: isMobile ? '4%' : isTablet ? '6%' : '8%',
      },
      searchBar: {
        height: isMobile ? 40 : 48,
        marginHorizontal: isMobile ? 12 : 16,
      },
      headerText: {
        fontSize: isMobile ? 16 : isTablet ? 18 : 20,
      },
    };
  };

  const responsiveStyles = getResponsiveStyles();

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
    } else if (tab === 'category') {
      setShowCategories(true);
    }
  };

  if (showFashionHome) {
    return <FashionHomeScreen onBack={() => setShowFashionHome(false)} />;
  }

  if (showCategories) {
    return <CategoryScreen onBack={() => setShowCategories(false)} />;
  }

  return (
    <SafeAreaView style={[styles.container, responsiveStyles.container]}>
      <View style={styles.fixedHeader}>
        <Text style={[styles.deliveryText, { fontSize: responsiveStyles.headerText.fontSize }]}>
          Delivery by 8th January
        </Text>
        
        <View style={[styles.searchBar, responsiveStyles.searchBar]}>
          <TextInput
            style={[styles.searchInput, { 
              fontSize: 14,
              height: responsiveStyles.searchBar.height,
            }]}
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

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.stickyHeader}>
          <View style={styles.categoryTabsContainer}>
            <TouchableOpacity 
              style={[
                styles.rashanBox,
                hoveredCategory === 'rashan' && styles.hoveredCategory,
                {
                  padding: responsiveStyles.categoryBox.padding,
                  aspectRatio: responsiveStyles.categoryBox.aspectRatio,
                }
              ]}
              onPress={() => setShowCategories(true)}
              onMouseEnter={() => setHoveredCategory('rashan')}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <Text style={[
                styles.categoryText,
                {
                  fontSize: responsiveStyles.categoryText.fontSize,
                  marginBottom: responsiveStyles.categoryText.marginBottom,
                }
              ]}>Rashan</Text>
              <Image 
                source={{ 
                  uri: 'https://img.freepik.com/free-photo/kitchen-utensils-wooden-cooking-tools-dark-background-top-view-free-space-your-text_187166-4456.jpg'
                }}
                style={[
                  styles.categoryImage,
                  {
                    width: responsiveStyles.categoryImage.width,
                    height: responsiveStyles.categoryImage.height,
                    borderRadius: responsiveStyles.categoryImage.borderRadius,
                    objectFit: 'cover',
                    backgroundColor: '#fff',
                  }
                ]}
                resizeMode="cover"
                defaultSource={{ uri: 'https://via.placeholder.com/90/FFFFFF/000000?text=Loading...' }}
              />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.fashionBox,
                hoveredCategory === 'fashion' && styles.hoveredCategory,
                {
                  padding: responsiveStyles.categoryBox.padding,
                  aspectRatio: responsiveStyles.categoryBox.aspectRatio,
                }
              ]}
              onPress={() => setShowFashionHome(true)}
              onMouseEnter={() => setHoveredCategory('fashion')}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <Text style={[
                styles.categoryText,
                {
                  fontSize: responsiveStyles.categoryText.fontSize,
                  marginBottom: responsiveStyles.categoryText.marginBottom,
                }
              ]}>Fashion & Home</Text>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=200&h=200&fit=crop' }}
                style={[
                  styles.categoryImage,
                  {
                    width: responsiveStyles.categoryImage.width,
                    height: responsiveStyles.categoryImage.height,
                    borderRadius: responsiveStyles.categoryImage.borderRadius,
                    objectFit: 'cover',
                  }
                ]}
              />
            </TouchableOpacity>
          </View>
        </View>

        {orderAgainSections.map((section) => (
          <View key={section.id} style={styles.orderAgainSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <TouchableOpacity onPress={() => console.log('View all pressed')}>
                <Text style={styles.viewAllText}>View all →</Text>
              </TouchableOpacity>
            </View>

            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.productsScroll}
            >
              {section.products.map((product) => (
                <View key={product.id} style={styles.productCard}>
                  <View style={styles.discountTag}>
                    <Text style={styles.discountText}>{product.discount} OFF</Text>
                  </View>
                  <Image source={{ uri: product.image }} style={styles.productImage} />
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productWeight}>{product.price}</Text>
                  <View style={styles.priceContainer}>
                    <Text style={styles.price}>{product.price}</Text>
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
          </View>
        ))}
        <View style={styles.bottomSpacing} />
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

      <Animated.View
        style={[
          styles.floatingTab,
          {
            transform: [
              { translateX: position.x },
              { translateY: position.y }
            ]
          }
        ]}
        {...panResponder.panHandlers}
      >
        <TouchableOpacity
          style={styles.floatingTabButton}
          onPress={handleFloatingTabPress}
        >
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop' }}
            style={styles.floatingImage}
          />
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  fixedHeader: {
    backgroundColor: '#FFE44D',
    padding: 16,
    paddingTop: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    position: 'sticky',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
  },
  deliveryText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    color: '#333',
    paddingVertical: 8,
  },
  searchIcon: {
    padding: 8,
  },
  micIcon: {
    padding: 8,
  },
  stickyHeader: {
    backgroundColor: '#fff',
    position: 'sticky',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  categoryTabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '12%',
    paddingVertical: 12,
    backgroundColor: '#FFE44D',
    marginTop: 0,
    zIndex: 1,
  },
  rashanBox: {
    flex: 1,
    maxWidth: '42%',
    backgroundColor: '#e91e63',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 3,
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  fashionBox: {
    flex: 1,
    maxWidth: '42%',
    backgroundColor: '#2196f3',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 3,
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  hoveredCategory: {
    transform: [{scale: 1.02}],
  },
  categoryText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
  },
  categoryImage: {
    borderWidth: 2,
    borderColor: '#fff',
    objectFit: 'cover',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
    zIndex: 0,
  },
  contentContainer: {
    flexGrow: 1,
  },
  orderAgainSection: {
    marginTop: 16,
    backgroundColor: '#fff',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
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
    paddingLeft: 16,
  },
  productCard: {
    width: 150,
    marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 8,
  },
  productImage: {
    width: '100%',
    height: 100,
    borderRadius: 4,
    marginBottom: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
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
    gap: 8,
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  originalPrice: {
    fontSize: 14,
    color: '#666',
    textDecorationLine: 'line-through',
  },
  discountTag: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#e91e63',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    zIndex: 1,
  },
  discountText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#e91e63',
    borderRadius: 4,
    padding: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomSpacing: {
    height: 100,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    marginTop: 4,
    fontSize: 12,
  },
  activeNavText: {
    color: '#e91e63',
  },
  floatingTab: {
    position: 'absolute',
    left: 20,
    top: 180,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    zIndex: 1000,
  },
  floatingTabButton: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    overflow: 'hidden',
  },
  floatingImage: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
});

export default HomeScreen;
