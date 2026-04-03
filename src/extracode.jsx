import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  ImageBackground,
} from "react-native";
import i18n from "../i18n/i18n"; 
import LanguageModal from "../Modal/LanguageModal";

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentLang, setCurrentLang] = useState(i18n.locale);

  const changeLanguage = (langCode) => {
    i18n.locale = langCode;
    setCurrentLang(langCode);
    setModalVisible(false);
  };

  const languages = [
    { label: "English", code: "en" },
    { label: "हिन्दी", code: "hi" },
    { label: "తెలుగు", code: "te" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* --- Top Banner Section --- */}
        <ImageBackground 
          source={{ uri: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80' }} 
          style={styles.imageHeader}
        >
          <View style={styles.darkOverlay} />
          
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.headerTop}>
              <Text style={styles.appTitle}>TravelGuide</Text>
              <TouchableOpacity 
                style={styles.langPicker} 
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.langPickerText}>🌐 {currentLang.toUpperCase()}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.headerBottom}>
              <Text style={styles.locationTxt}>📍 {i18n.t("home.location")}</Text>
              <Text style={styles.mainTitle}>{i18n.t("home.title")}</Text>
            </View>
          </SafeAreaView>
        </ImageBackground>

        {/* --- Content Section --- */}
        <View style={styles.contentContainer}>
          <View style={styles.indicator} />
          
          <Text style={styles.descriptionHeader}>Overview</Text>
          <Text style={styles.descriptionBody}>
            {i18n.t("home.description")}
          </Text>
          
          {/* Decorative padding to ensure scrollability */}
          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      {/* --- Action Button --- */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.bookBtn} activeOpacity={0.8}>
          <Text style={styles.bookBtnText}>{i18n.t("home.book")}</Text>
        </TouchableOpacity>
      </View>

      <LanguageModal
        visible={modalVisible}
        languages={languages}
        selectedLanguage={currentLang}
        onSelectLanguage={changeLanguage}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageHeader: {
    height: 400,
    width: '100%',
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    marginTop:40

  },
  appTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 1,
  },
  langPicker: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  langPickerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  headerBottom: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  locationTxt: {
    color: '#FFD700', // Gold color for location
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  mainTitle: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    paddingHorizontal: 25,
    paddingTop: 10,
  },
  indicator: {
    width: 40,
    height: 5,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 25,
  },
  descriptionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  descriptionBody: {
    fontSize: 16,
    lineHeight: 28,
    color: '#666',
    textAlign: 'left',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  bookBtn: {
    backgroundColor: '#1A1A1A',
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  bookBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default HomeScreen;