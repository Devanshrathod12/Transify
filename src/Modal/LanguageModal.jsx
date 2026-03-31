import React, { useState, useEffect, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';

const { height: screenHeight } = Dimensions.get('window');

// Mocking scale functions if not imported (Aap apne stylesconfig se import kar rahe hain)
const scale = (size) => size; 
const verticalScale = (size) => size;
const fontScale = (size) => size;

const LanguageModal = ({
  visible,
  languages = [],
  selectedLanguage,
  onSelectLanguage,
  onClose,
  isLoading = false,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [localSelected, setLocalSelected] = useState(selectedLanguage);

  const slideAnim = useRef(new Animated.Value(screenHeight)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const lastGestureDy = useRef(0);

  useEffect(() => {
    if (visible) {
      setLocalSelected(selectedLanguage);
      setSearchInput('');
      // Open animation
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // Close animation
      Animated.timing(slideAnim, {
        toValue: screenHeight,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  // PanResponder for drag-to-close gesture
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dy) > 5,
      onPanResponderGrant: () => {
        translateY.setOffset(lastGestureDy.current);
        translateY.setValue(0);
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 150 || gestureState.vy > 0.5) {
          Animated.timing(translateY, {
            toValue: screenHeight,
            duration: 200,
            useNativeDriver: true,
          }).start(onClose);
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            tension: 50,
            friction: 8,
          }).start();
        }
        lastGestureDy.current = 0;
      },
    })
  ).current;

  const filteredLanguages = languages.filter(item =>
    item.label.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleApply = () => {
    if (localSelected) {
      onSelectLanguage(localSelected);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <View style={styles.mainWrapper}>
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose} />
        
        <Animated.View
          style={[
            styles.modalContainer,
            { transform: [{ translateY: slideAnim }, { translateY: translateY }] },
          ]}
          {...panResponder.panHandlers}
        >
          {/* Drag Handle */}
          <View style={styles.dragHandleContainer}>
            <View style={styles.dragHandle} />
          </View>

          <View style={styles.modalContent}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={onClose} style={styles.backArrow}>
                {/* <OrangeBack width={scale(18)} height={scale(18)} /> */}
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Select Language</Text>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search language..."
                value={searchInput}
                onChangeText={setSearchInput}
                placeholderTextColor="#999"
              />
              {searchInput.length > 0 && (
                <TouchableOpacity onPress={() => setSearchInput('')}>
                   <Text style={{fontSize: 16}}>✕</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Language List */}
            <View style={styles.listContainer}>
              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
                {filteredLanguages.map((item) => {
                  const isSelected = item.code === localSelected;
                  return (
                    <TouchableOpacity
                      key={item.code}
                      style={styles.langItem}
                      activeOpacity={0.7}
                      onPress={() => setLocalSelected(item.code)}
                    >
                      <View style={[styles.radioCircle, isSelected && styles.radioCircleSelected]}>
                        {isSelected && <View style={styles.radioInnerCircle} />}
                      </View>
                      <Text style={[styles.langText, isSelected && styles.langTextSelected]}>
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>

            {/* Apply Button */}
            <TouchableOpacity 
              style={[styles.applyButton, isLoading && { opacity: 0.7 }]} 
              onPress={handleApply}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <View style={styles.btnContent}>
                  <Text style={styles.applyButtonText}>Confirm Language</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainWrapper: { flex: 1, justifyContent: 'flex-end' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: scale(25),
    borderTopRightRadius: scale(25),
    maxHeight: '80%',
    minHeight: '50%',
    paddingBottom: verticalScale(30),
  },
  dragHandleContainer: {
    paddingVertical: verticalScale(15),
    alignItems: 'center',
  },
  dragHandle: {
    width: scale(50),
    height: scale(5),
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
  },
  modalContent: { paddingHorizontal: scale(20) },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  backArrow: { paddingRight: scale(10) },
  modalTitle: {
    fontSize: fontScale(20),
    fontWeight: 'bold',
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: scale(12),
    paddingHorizontal: scale(12),
    height: verticalScale(50),
    marginBottom: verticalScale(15),
  },
  searchIcon: { marginRight: scale(10) },
  searchInput: { flex: 1, fontSize: fontScale(16), color: '#333' },
  listContainer: { maxHeight: screenHeight * 0.4 },
  langItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(15),
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  radioCircle: {
    width: scale(22),
    height: scale(22),
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#CCC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(15),
  },
  radioCircleSelected: { borderColor: '#4CAF50' },
  radioInnerCircle: {
    width: scale(12),
    height: scale(12),
    borderRadius: 6,
    backgroundColor: '#4CAF50',
  },
  langText: { fontSize: fontScale(18), color: '#444' },
  langTextSelected: { color: '#4CAF50', fontWeight: 'bold' },
  applyButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: verticalScale(15),
    borderRadius: scale(30),
    marginTop: verticalScale(20),
    alignItems: 'center',
    elevation: 4,
  },
  applyButtonText: { color: '#fff', fontSize: fontScale(18), fontWeight: 'bold' },
  btnContent: { flexDirection: 'row', alignItems: 'center' },
});

export default LanguageModal;