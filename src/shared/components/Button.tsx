import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Colors from '@utils/theme';
import {IColors} from '@constants/Interfaces';

interface IButton {
  name: String;
  onPress: any;
  loading?: Boolean;
  disable?: Boolean;
  small?: Boolean;
  outline?: Boolean;
  noShadow?: Boolean;
  Icon?: any;
  style?: any;
  customButtonProps?:any
  customText?:any
}

export default function Button({
  name,
  onPress,
  loading = false,
  disable = false,
  small = false,
  outline = false,
  noShadow = false,
  Icon,
  style,
  customButtonProps={},
  customText={}
}: IButton) {
  const colors: IColors = Colors();
  const st = Styles(colors, small);
  if (disable)
    return (
      <View style={[st.layout, style]}>
        <View
          style={[st.btnLayoutDisabled, st.btnLayout, small && st.smallBtn]}>
          <Text style={st.btnText}>{name}</Text>
        </View>
      </View>
    );
  else
    return (
      <View style={[st.layout, style]}>
        <TouchableOpacity
          onPress={loading ? null : onPress}
          activeOpacity={0.7}
          style={[
            outline ? st.btnOutlineLayout : st.btnSoldLayout,
            st.btnLayout,
            noShadow ? null : st.shadow,
            small && st.smallBtn,
            customButtonProps,
          ]}>
          {Icon ? Icon : null}
          <Text style={[outline ? st.btnOutlineText : st.btnText,
          customText,
          ]}>{name}</Text>
          {loading ? (
            <ActivityIndicator
              size="small"
              color={outline ? colors.primary : colors.white}
              style={{marginLeft: 16}}
            />
          ) : null}
        </TouchableOpacity>
      </View>
    );
}

const Styles = (colors: IColors, small: Boolean) =>
  StyleSheet.create({
    smallBtn: {
      padding: 6,
      paddingHorizontal: 16,
    },
    btnOutlineLayout: {
      backgroundColor: colors.white,
      borderColor: colors.primary,
      borderWidth: 1.2,
      color: colors.primary,
    },
    btnSoldLayout: {
      backgroundColor: colors.primary,
    },
    btnLayout: {
      borderRadius: 8,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      padding: 14,
    },
    btnLayoutDisabled: {
      backgroundColor: colors.gray,
    },
    btnOutlineText: {
      color: colors.primary,
      // letterSpacing: 1,
      // textTransform: 'uppercase',
      fontSize: small ? 11 : 14,
      fontFamily: colors.fontSemiBold,
    },
    btnText: {
      color: colors.textWhite,
      // letterSpacing: 1,
      // textTransform: 'uppercase',
      fontSize: small ? 11 : 14,
      fontFamily: colors.fontSemiBold,
    },
    layout: {
      paddingVertical: 8,
      // paddingHorizontal: 16,
      justifyContent: 'center',
    },
    shadow: {
      shadowColor: colors.primary,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,

      elevation: 7,
    },
  });
