import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  StatusBar,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native-web';

const AddressForm = ({ visible, onClose }) => {
  const [formData, setFormData] = useState({
    flatNumber: '',
    sector: '',
    pinCode: '',
    city: '',
    landmark: '',
    receiverName: '',
    receiverPhone: '',
  });
  const [errors, setErrors] = useState({});
  const mapRef = useRef(null);

  useEffect(() => {
    if (visible && window.google) {
      // Initialize map
      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 15,
        mapTypeControl: false,
        streetViewControl: false,
      });

      // Try to get user's current location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            map.setCenter(pos);

            // Add marker at current location
            const marker = new window.google.maps.Marker({
              position: pos,
              map: map,
              draggable: true,
            });

            // Get address details when marker is dragged
            marker.addListener('dragend', () => {
              const geocoder = new window.google.maps.Geocoder();
              geocoder.geocode(
                { location: marker.getPosition() },
                (results, status) => {
                  if (status === 'OK' && results[0]) {
                    const addressComponents = results[0].address_components;
                    setFormData(prev => ({
                      ...prev,
                      city: addressComponents.find(component => 
                        component.types.includes('locality'))?.long_name || '',
                      pinCode: addressComponents.find(component => 
                        component.types.includes('postal_code'))?.long_name || '',
                      sector: addressComponents.find(component => 
                        component.types.includes('sublocality'))?.long_name || '',
                    }));
                  }
                }
              );
            });

            // Get initial address
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode(
              { location: pos },
              (results, status) => {
                if (status === 'OK' && results[0]) {
                  const addressComponents = results[0].address_components;
                  setFormData(prev => ({
                    ...prev,
                    city: addressComponents.find(component => 
                      component.types.includes('locality'))?.long_name || '',
                    pinCode: addressComponents.find(component => 
                      component.types.includes('postal_code'))?.long_name || '',
                    sector: addressComponents.find(component => 
                      component.types.includes('sublocality'))?.long_name || '',
                  }));
                }
              }
            );
          },
          (error) => {
            console.error('Error getting location:', error);
            // Default to a central location if geolocation fails
            const defaultPos = { lat: 20.5937, lng: 78.9629 }; // Center of India
            map.setCenter(defaultPos);
          }
        );
      }
    }
  }, [visible]);

  const validatePhone = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handlePhoneChange = (phone) => {
    setFormData(prev => ({ ...prev, receiverPhone: phone }));
    if (phone && !validatePhone(phone)) {
      setErrors(prev => ({
        ...prev,
        phone: 'Please enter valid phone number starting with 6, 7, 8, or 9'
      }));
    } else {
      setErrors(prev => ({ ...prev, phone: null }));
    }
  };

  const handleSave = () => {
    if (!validatePhone(formData.receiverPhone)) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid phone number starting with 6, 7, 8, or 9');
      return;
    }
    // Handle save logic here
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      presentationStyle="fullScreen"
    >
      <SafeAreaView style={styles.modalContainer}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={onClose} 
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Enter your address</Text>
        </View>

        <View style={styles.mapContainer} ref={mapRef} />

        <ScrollView style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Flat, House No., Floor, Name of Building"
            value={formData.flatNumber}
            onChangeText={(text) => setFormData(prev => ({ ...prev, flatNumber: text }))}
          />

          <TextInput
            style={styles.input}
            placeholder="Sector, locality, area"
            value={formData.sector}
            onChangeText={(text) => setFormData(prev => ({ ...prev, sector: text }))}
          />

          <TextInput
            style={styles.input}
            placeholder="Pin Code"
            value={formData.pinCode}
            onChangeText={(text) => setFormData(prev => ({ ...prev, pinCode: text }))}
            keyboardType="numeric"
            maxLength={6}
          />

          <TextInput
            style={[styles.input, styles.disabledInput]}
            placeholder="City"
            value={formData.city}
            editable={false}
          />

          <TextInput
            style={styles.input}
            placeholder="Landmark (Optional)"
            value={formData.landmark}
            onChangeText={(text) => setFormData(prev => ({ ...prev, landmark: text }))}
          />

          <View style={styles.divider}>
            <Text style={styles.dividerText}>We will use below information at the time of delivery</Text>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Receiver's Name"
            value={formData.receiverName}
            onChangeText={(text) => setFormData(prev => ({ ...prev, receiverName: text }))}
          />

          <TextInput
            style={styles.input}
            placeholder="Receiver's Phone Number"
            value={formData.receiverPhone}
            onChangeText={handlePhoneChange}
            keyboardType="numeric"
            maxLength={10}
          />
          {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
        </ScrollView>

        <TouchableOpacity 
          style={[
            styles.saveButton,
            (!formData.receiverPhone || errors.phone) && styles.saveButtonDisabled
          ]}
          onPress={handleSave}
          disabled={!formData.receiverPhone || errors.phone}
        >
          <Text style={styles.saveButtonText}>Save and continue</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    marginRight: 16,
  },
  backArrow: {
    fontSize: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  mapContainer: {
    height: 300,
    width: '100%',
    backgroundColor: '#f0f0f0',
  },
  formContainer: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  disabledInput: {
    backgroundColor: '#f5f5f5',
  },
  divider: {
    marginVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 8,
  },
  dividerText: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
  },
  errorText: {
    color: '#e91e63',
    fontSize: 12,
    marginTop: -12,
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  saveButton: {
    backgroundColor: '#e91e63',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: '#ffc0cb',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AddressForm;
