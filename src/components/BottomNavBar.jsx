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
      <View style={styles.leftIcons}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => handleIconPress('BookSaved')}
        >
          <BookSaved size="32" color={activeIcon === 'BookSaved' ? '#64C1DE' : 'white'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => handleIconPress('Home')}
        >
          <Home2 size="32" color={activeIcon === 'Home' ? '#64C1DE' : 'white'} />
        </TouchableOpacity>
      </View>
      <View style={styles.gap} />

      <View style={styles.rightIcons}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => handleIconPress('SearchStatus')}
        >
          <SearchStatus size="32" color={activeIcon === 'SearchStatus' ? '#64C1DE' : 'white'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => handleIconPress('Profile')}
        >
          <Profile size="32" color={activeIcon === 'Profile' ? '#64C1DE' : 'white'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: '#120537',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  leftIcons: {
    flexDirection: 'row',
  },
  rightIcons: {
    flexDirection: 'row',
  },
  gap: {
    width: 30,
  },
  iconContainer: {
    padding: 20,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default BottomNavBar;
