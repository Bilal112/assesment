import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

///Assets
import Colors from '@utils/theme';

import {IColors, IStyles} from '@constants/Interfaces';
import DefaultStyle from '@constants/style';

///Assets
import {NotificationsIcon, InboxIcon, CameraIcon} from '@assets/svgIcons';

const HomeHeader = () => {
  const navigation: any = useNavigation();
  const colors: IColors = Colors();
  const ds: IStyles = DefaultStyle(colors);
  const st = Styles(colors);

  const themeDark = useSelector((state: any) => state.utils.dark);
  const user = useSelector((state: any) => state.login.user);
  const hasNotification = useSelector(
    (state: any) => state?.login?.hasNotification ?? false,
  );
  const fill = themeDark ? colors.dark : colors.primary;

  let admin =
    user?.role === 'freelance' || user?.role === 'venue' ? true : false;

  return (
    <View style={ds.px_16}>
      <View style={st.rightBox}>
        <TouchableOpacity
          style={ds.ml_16}
          onPress={() => navigation.navigate('notification')}>
          <NotificationsIcon width={18} fill={fill} />
          {hasNotification && <View style={st.notificationCircle} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={ds.ml_16}
          onPress={() => navigation.navigate('inbox')}>
          <InboxIcon width={22} fill={fill} />
        </TouchableOpacity>
        {admin && (
          <TouchableOpacity
            style={ds.ml_16}
            onPress={() => navigation.navigate('qrScanner')}>
            <MaterialIcon name="qrcode-scan" size={20} color={colors.primary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const Styles = (colors: IColors) =>
  StyleSheet.create({
    icons: {
      marginHorizontal: 4,
    },
    logo: {
      width: 80,
      height: '100%',
    },
    rightBox: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    notificationCircle: {
      width: 6,
      height: 6,
      backgroundColor: 'red',
      borderRadius: 5,
      position: 'absolute',
      left: 15,
    },
  });

export default HomeHeader;
