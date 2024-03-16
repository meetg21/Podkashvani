import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import { BookSaved,Home2,SearchStatus,Profile } from 'iconsax-react-native';
const BottomNavBar = () => {
  return (
    <View style={styles.navBar}>
      <View style={styles.leftIcons}>
        <TouchableOpacity style={styles.iconContainer}>
         
          <BookSaved size="32" color="#64C1DE" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
        <Home2 size="32" color="#64C1DE"/>
        </TouchableOpacity>
      </View>
      <View style={styles.gap} />

      <View style={styles.rightIcons}>
        <TouchableOpacity style={styles.iconContainer}>
        <SearchStatus size="32" color="#64C1DE"/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
        <Profile size="32" color="#64C1DE"/>
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
