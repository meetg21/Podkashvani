import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { BookSaved, Home2, SearchStatus, Profile } from 'iconsax-react-native';

const BottomNavBar = ({ activeScreen }) => {
  const [activeIcon, setActiveIcon] = useState(activeScreen);

  const handleIconPress = (screenName) => {
    setActiveIcon(screenName);
    // You can add logic here to navigate to the selected screen
  };

  return (
    <View style={styles.navBar}>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => handleIconPress('BookSaved')}
      >
        <BookSaved size="28" color={activeIcon === 'BookSaved' ? '#64C1DE' : 'white'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => handleIconPress('Home')}
      >
        <Home2 size="28" color={activeIcon === 'Home' ? '#64C1DE' : 'white'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => handleIconPress('SearchStatus')}
      >
        <SearchStatus size="28" color={activeIcon === 'SearchStatus' ? '#64C1DE' : 'white'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => handleIconPress('Profile')}
      >
        <Profile size="28" color={activeIcon === 'Profile' ? '#64C1DE' : 'white'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: '#120537',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between', // Ensure equal distance between icons
    alignItems: 'center',
    paddingHorizontal: 15,
    // Temp
    position: 'absolute',
    width: "100%",
    bottom: 0,
    borderRadius: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  iconContainer: {
    padding: 20,
  },
});

export default BottomNavBar;
