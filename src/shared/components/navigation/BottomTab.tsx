import React from 'react';
import {
  View,
  TouchableOpacity,
  Image as ImageR,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {useDispatch, useSelector} from 'react-redux';
import images from '@assets/images';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

function CustomBottomTab({
  state,
  descriptors,
  navigation,
  insets,
  colors,
}: any) {

  const maxWidth = Dimensions.get('window').width;
  return (
    <View
      style={{
        backgroundColor: colors.light,
        height: 50,
        marginBottom: insets?.bottom,
      }}>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
        }}>
        <ImageBackground
          source={images.background1}
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            alignSelf: 'center',
          }}
          resizeMode="cover">
          <View
            style={{
              flexDirection: 'row',
              height: 65,
            }}>
            {state.routes.map((route: any, index: number) => {
              const {options} = descriptors[route.key];
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                  ? options.title
                  : route.name;

              const isFocused: boolean = state.index === index;

              let onPress = () => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                });

                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              };

              let icons;
              let routeName;
              let iconColor = isFocused ? colors.primary : colors.gray;

              if (route.name === 'Home') {
                icons = (
                  <Icon
                    name={'home-outline'}
                    size={25}
                    color={isFocused ? '#7D5FFF' : '#8E8E93'}
                  />
                );
                if (isFocused) {
                  // onPress = () => handleHome();
                }
                // routeName = 'Home';
              } else if (route.name === 'Funds') {
                icons = (
                  <Icon
                    name={'wallet-outline'}
                    size={25}
                    color={isFocused ? '#7D5FFF' : '#8E8E93'}
                  />
                );
                // routeName = 'Appointment';
              } else if (route.name === 'Map') {
                icons = (
                  <LinearGradient
                    colors={['#7D5FFF', '#7D5FFF']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={Styles(iconColor).floatingBtn}>
                    <FontAwesome name="plus" size={25} color={"white"} />
                  </LinearGradient>
                );
              } else if (route.name === 'History') {
                icons = (
                  <Icon
                    name={'stats-chart-outline'}
                    size={25}
                    color={isFocused ? '#7D5FFF' : '#8E8E93'}
                  />
                );
                // routeName = 'questions';
              } else if (route.name === 'Withdraw') {
                icons = (
                  <Icon
                    name={'download-outline'}
                    size={25}
                    color={isFocused ? '#7D5FFF' : '#8E8E93'}
                  />
                );
                
              }

              return (
                <TouchableOpacity
                  key={route.key}
                  accessibilityRole="button"
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  testID={options.tabBarTestID}
                  onPress={onPress}
                  style={[
                    {
                      width: maxWidth / 5,
                      alignItems: 'center',
                      borderTopLeftRadius: route.name === 'History' ? 20 : 0,
                      borderTopRightRadius: route.name === 'Funds' ? 20 : 0,
                      padding: 16,
                    },

                    route.name === 'Map'
                      ? {
                          marginTop: -54,
                          backgroundColor: 'transparent',
                        }
                      : null,
                  ]}>
                  {icons}
                  <Text style={{ color: isFocused ? '#7D5FFF' : '#8E8E93', fontSize: 10 }}> {label === "Map"? "":label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ImageBackground>
      </View>
    </View>
  );
}

export default CustomBottomTab;

const Styles = colors =>
  StyleSheet.create({
    floatingBtn: {
      opacity: 0.8,
      width: 50,
      height: 50,
      borderRadius: 50 / 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    mapIcon: {
      tintColor: colors,
      resizeMode: 'contain',
      width: 25,
      height: 25,
    },
    profileImage: {
      borderWidth: 2,
      borderColor: colors,
      borderRadius: 50,
      resizeMode: 'cover',
      width: 30,
      height: 30,
    },
  });
