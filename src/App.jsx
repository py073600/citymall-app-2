import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  Pressable,
  Modal,
  SafeAreaView,
  StatusBar,
} from 'react-native-web';
import HomeScreen from './components/HomeScreen';
import AddressForm from './components/AddressForm';

const LanguageSelector = ({ visible, onClose, onLanguageChange }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const languages = [
    { code: 'hi', name: 'हिंदी' },
    { code: 'en', name: 'English' },
  ];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      presentationStyle="fullScreen"
    >
      <SafeAreaView style={styles.modalContainer}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <TouchableOpacity 
              onPress={onClose} 
              style={styles.backButton}
              activeOpacity={0.7}
            >
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Choose Language</Text>
          </View>

          <Text style={styles.subtitle}>Please choose your language</Text>

          <View style={styles.languageList}>
            {languages.map((language) => (
              <TouchableOpacity
                key={language.code}
                style={[
                  styles.languageOption,
                  selectedLanguage === language.name && styles.selectedLanguageOption
                ]}
                onPress={() => setSelectedLanguage(language.name)}
                activeOpacity={0.9}
              >
                <Text style={[
                  styles.languageText,
                  selectedLanguage === language.name && styles.selectedLanguageText
                ]}>
                  {language.name}
                </Text>
                <View style={[
                  styles.radioOuter,
                  selectedLanguage === language.name && styles.selectedRadioOuter
                ]}>
                  {selectedLanguage === language.name && (
                    <View style={styles.radioInner} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.bottomContainer}>
            <TouchableOpacity 
              style={styles.confirmButton}
              onPress={() => {
                onLanguageChange(selectedLanguage);
                onClose();
              }}
              activeOpacity={0.9}
            >
              <Text style={styles.confirmButtonText}>
                Choose {selectedLanguage} Language
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [hoveredItem, setHoveredItem] = useState(null);
  const [pressedItem, setPressedItem] = useState(null);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);

  useEffect(() => {
    // Add a small delay before showing the address form when coming from Orders tab
    if (currentScreen === 'settings') {
      const timer = setTimeout(() => {
        setShowAddressForm(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const menuItems = [
    { icon: '🌐', title: 'Select Language' },
    { icon: '📍', title: 'Saved Addresses' },
    { icon: '🏦', title: 'Bank & UPI details' },
    { icon: 'ℹ️', title: 'About us' },
    { icon: '🔒', title: 'Privacy Policy' },
    { icon: '↩️', title: 'Return Policy' },
    { icon: '🚪', title: 'Logout' },
  ];

  const handlePress = (item) => {
    console.log('Pressed:', item);
    if (item.title === 'Select Language') {
      setLanguageModalVisible(true);
    } else if (item.title === 'Saved Addresses') {
      setShowAddressForm(true);
    }
  };

  const handleLanguageChange = (language) => {
    console.log('Language changed to:', language);
    setLanguageModalVisible(false);
  };

  if (currentScreen === 'home') {
    return (
      <HomeScreen 
        onOrdersPress={() => {
          setCurrentScreen('settings');
        }} 
      />
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onHoverIn={() => setHoveredItem('back')}
          onHoverOut={() => setHoveredItem(null)}
          onPressIn={() => setPressedItem('back')}
          onPressOut={() => setPressedItem(null)}
          onPress={() => {
            setCurrentScreen('home');
            setShowAddressForm(false);
          }}
          style={[
            styles.backButton,
            hoveredItem === 'back' && styles.buttonHovered,
            pressedItem === 'back' && styles.buttonPressed,
          ]}
        >
          <Text style={styles.backButtonText}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <View style={styles.profileCard}>
        <Image
          source={{ uri: 'https://via.placeholder.com/60' }}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Prashant account</Text>
          <Text style={styles.profilePhone}>+91- 9548999898</Text>
        </View>
        <Pressable
          onHoverIn={() => setHoveredItem('edit')}
          onHoverOut={() => setHoveredItem(null)}
          onPressIn={() => setPressedItem('edit')}
          onPressOut={() => setPressedItem(null)}
          onPress={() => handlePress('edit')}
          style={[
            styles.editButton,
            hoveredItem === 'edit' && styles.buttonHovered,
            pressedItem === 'edit' && styles.buttonPressed,
          ]}
        >
          <Text style={styles.editButtonText}>Edit ›</Text>
        </Pressable>
      </View>

      {menuItems.map((item, index) => (
        <Pressable
          key={index}
          onHoverIn={() => setHoveredItem(`menu-${index}`)}
          onHoverOut={() => setHoveredItem(null)}
          onPressIn={() => setPressedItem(`menu-${index}`)}
          onPressOut={() => setPressedItem(null)}
          onPress={() => handlePress(item)}
          style={[
            styles.menuItem,
            hoveredItem === `menu-${index}` && styles.menuItemHovered,
            pressedItem === `menu-${index}` && styles.menuItemPressed,
          ]}
        >
          <Text style={styles.menuIcon}>{item.icon}</Text>
          <Text style={styles.menuText}>{item.title}</Text>
        </Pressable>
      ))}

      <View style={styles.referralCard}>
        <View style={styles.referralContent}>
          <Text style={styles.referralTitle}>Refer & Get ₹100 off</Text>
          <Text style={styles.referralSubtitle}>
            Get ₹100 off after delivery of your referral's 1st Order
          </Text>
          <Pressable
            onHoverIn={() => setHoveredItem('refer')}
            onHoverOut={() => setHoveredItem(null)}
            onPressIn={() => setPressedItem('refer')}
            onPressOut={() => setPressedItem(null)}
            onPress={() => handlePress('refer')}
            style={({pressed}) => [
              styles.referButton,
              hoveredItem === 'refer' && styles.referButtonHovered,
              pressedItem === 'refer' && styles.referButtonPressed,
            ]}
          >
            <Text style={styles.referButtonText}>Refer now</Text>
          </Pressable>
        </View>
        <View style={styles.offLabel}>
          <Text style={styles.offText}>₹100 OFF</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Made with ❤️</Text>
        <Text style={styles.versionText}>App version 1.40.4 (230)</Text>
        <Pressable
          onHoverIn={() => setHoveredItem('delete')}
          onHoverOut={() => setHoveredItem(null)}
          onPressIn={() => setPressedItem('delete')}
          onPressOut={() => setPressedItem(null)}
          onPress={() => handlePress('delete')}
          style={[
            styles.deleteAccount,
            hoveredItem === 'delete' && styles.buttonHovered,
            pressedItem === 'delete' && styles.buttonPressed,
          ]}
        >
          <Text style={styles.deleteText}>Delete Account</Text>
        </Pressable>
      </View>

      <AddressForm
        visible={showAddressForm}
        onClose={() => setShowAddressForm(false)}
      />

      <LanguageSelector
        visible={languageModalVisible}
        onClose={() => setLanguageModalVisible(false)}
        onLanguageChange={handleLanguageChange}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    maxWidth: 500,
    alignSelf: 'center',
    width: '100%',
    height: '100vh',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    marginTop: Platform.OS === 'ios' ? 40 : 0,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
    borderRadius: 8,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  backButtonText: {
    fontSize: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 16,
    borderRadius: 8,
    margin: 16,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profilePhone: {
    color: '#666',
  },
  editButton: {
    padding: 8,
    borderRadius: 8,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  editButtonText: {
    color: '#666',
    fontSize: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 1,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  menuItemHovered: {
    backgroundColor: '#f8f8f8',
  },
  menuItemPressed: {
    backgroundColor: '#f0f0f0',
    transform: [{scale: 0.98}],
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 16,
    width: 24,
  },
  menuText: {
    fontSize: 16,
  },
  referralCard: {
    margin: 16,
    padding: 16,
    backgroundColor: '#ffe6e9',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  referralContent: {
    flex: 1,
    marginRight: 16,
  },
  referralTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  referralSubtitle: {
    color: '#666',
    marginBottom: 16,
    maxWidth: '70%',
  },
  referButton: {
    backgroundColor: '#e91e63',
    padding: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  referButtonHovered: {
    backgroundColor: '#d81557',
    transform: [{scale: 1.02}],
  },
  referButtonPressed: {
    backgroundColor: '#c2124e',
    transform: [{scale: 0.98}],
  },
  referButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  offLabel: {
    alignSelf: 'center',
  },
  offText: {
    color: '#e91e63',
    fontWeight: 'bold',
    fontSize: 24,
  },
  footer: {
    alignItems: 'center',
    padding: 16,
    marginTop: 16,
  },
  footerText: {
    color: '#666',
  },
  versionText: {
    color: '#666',
    marginTop: 8,
  },
  deleteAccount: {
    marginTop: 16,
    padding: 8,
    borderRadius: 8,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  deleteText: {
    color: '#666',
  },
  buttonHovered: {
    backgroundColor: '#f8f8f8',
  },
  buttonPressed: {
    backgroundColor: '#f0f0f0',
    transform: [{scale: 0.98}],
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 12,
    marginLeft: -12,
    marginRight: 8,
  },
  backArrow: {
    fontSize: 28,
    color: '#000',
    lineHeight: 28,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#000',
    marginTop: 24,
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  languageList: {
    marginTop: 8,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      },
    }),
  },
  selectedLanguageOption: {
    backgroundColor: '#fff3f6',
    borderColor: '#e91e63',
  },
  languageText: {
    fontSize: 17,
    color: '#000',
  },
  selectedLanguageText: {
    color: '#e91e63',
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#999',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRadioOuter: {
    borderColor: '#e91e63',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#e91e63',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 24,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  confirmButton: {
    backgroundColor: '#e91e63',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
});
