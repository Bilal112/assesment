import React, {useState} from 'react';
import {Text, StyleSheet, Linking, Pressable} from 'react-native';
import {View} from 'react-native-animatable';
import {useSelector, useDispatch} from 'react-redux';
import Icons from 'react-native-vector-icons/FontAwesome';
import Share from 'react-native-share';

import {useTranslation} from 'react-i18next';

//Components
import ModalContainer from 'src/container/ModalContainer';
import Loader from '@components/Loader';

//Action
import {switchDark} from '@actions/utilSlice';
import {logout} from '@actions/loginSlice';

//Services
import {logOutApi} from '@services/auth.service';

////// Assets
import Colors from '@utils/theme';
import {IColors, IStyles} from '@constants/Interfaces';
import DefaultStyle from '@constants/style';
import {StarIcon} from '@assets/svgIcons';

const SidebarMenu = ({
  callBack,
  showSide,
  navigation,
  setShowSide,
  isOtherProfile,
  selectedSport = null,
  isFriend = false,
  user,
}: any) => {
  const dispatch = useDispatch();
  const colors: IColors = Colors();
  const ds: IStyles = DefaultStyle(colors);
  const st = Styles(colors);
  const {t} = useTranslation();

  const dark = useSelector((state: any) => state.utils?.dark);

  const [loading, isLoading] = useState(false);

  const handleLogout = async () => {
    isLoading(true);
    const responseData: any = await logOutApi();
    if (responseData) dispatch(logout());
    isLoading(false);
    setShowSide(false);
  };

  const shareUserProfile = async (type, typeName) => {
    setShowSide(false);

    let url = `https://dudiapp.com/deeplink?type=${type}&username=${user.username}`;
    let msg = typeName;

    const shareOptions = {
      message: msg,
      url: url,
    };

    await Share.open(shareOptions);
  };

  const sportMenu = [
    {
      id: 1,
      title: 'Update',
      iconType: 'edit',
      onPress: () => callBack('add-sport'),
    },
    {
      id: 2,
      title: 'Remove',
      iconType: 'trash',
      onPress: () => callBack('delete-sport'),
    },
  ];

  const profileMenu = [
    {
      id: 1,
      title: 'Edit profile',
      iconType: 'edit',
      onPress: () => [setShowSide(false), navigation.navigate('edit-profile')],
    },
    {
      id: 2,
      title: 'Purchase history',
      iconType: 'history',
      onPress: () => [
        setShowSide(false),
        navigation.navigate('purchase-History'),
      ],
    },
    {
      id: 3,
      title: dark ? 'Disable dark mode' : 'Enable dark mode',
      iconType: dark ? 'toggle-on' : 'toggle-off',
      onPress: () => dispatch(switchDark()),
    },
    {
      id: 4,
      title: 'Share user profile',
      iconType: 'share-alt',
      onPress: () =>
        shareUserProfile('user', `Check this profile on DUDI app:\n`),
    },
    // {
    //   id: 10,
    //   title: 'Copy user profile',
    //   iconType: 'null',
    //   onPress: null,
    // },
    {
      id: 5,
      title: 'Blocked users',
      iconType: 'hand-stop-o',
      onPress: () => [setShowSide(false), navigation.navigate('block-user')],
    },
    {
      id: 6,
      title: 'Update password',
      iconType: 'lock',
      onPress: () => [
        setShowSide(false),
        navigation.navigate('change-password'),
      ],
    },
    {
      id: 7,
      title: 'Share feedback',
      iconType: 'comment',
      onPress: () => [
        setShowSide(false),
        Linking.openURL('mailto:hello@dudiapp.com?subject=Share feedback'),
      ],
    },
    {
      id: 8,
      title: 'Terms & Conditions',
      iconType: 'shield',
      onPress: () => [
        setShowSide(false),
        navigation.navigate('term-conditions'),
      ],
    },
    {
      id: 9,
      title: 'Logout',
      iconType: loading ? 'loading' : 'sign-out',
      onPress: () => handleLogout(),
    },
  ];

  const otherProfileMenu = [
    {
      id: 1,
      title: 'Remove friend request',
      iconType: 'close',
      onPress: () => callBack('remove_friend'),
    },
    {
      id: 4,
      title: 'Share user profile',
      iconType: 'share-alt',
      onPress: () => callBack('share'),
    },
    {
      id: 4,
      title: 'Copy user profile',
      iconType: 'copy',
      onPress: null,
    },
    {
      id: 2,
      title: 'Report user',
      iconType: 'file-text',
      onPress: () => callBack('report_user'),
    },
    {
      id: 2,
      title: 'Block user',
      iconType: 'hand-stop-o',
      onPress: () => callBack('block_user'),
    },
  ];

  const ModalRenderRows = ({item}) => (
    <Pressable
      key={`${item.id}${Math.floor(item.id)}`}
      onPress={item.onPress}
      style={st.modalRow}>
      {item.iconType === 'loading' ? (
        <Loader size="small" center={false} />
      ) : (
        <Icons name={item.iconType} size={20} color={colors.gray} />
      )}
      <View style={ds.mx_16}>
        <Text style={ds.title}>{item.title}</Text>
      </View>
    </Pressable>
  );

  const renderData = isOtherProfile
    ? isFriend
      ? otherProfileMenu
      : otherProfileMenu.filter(val => val.id !== 1)
    : selectedSport
    ? sportMenu
    : profileMenu;

  return (
    <ModalContainer status={showSide} onClose={() => setShowSide(false)}>
      <View style={ds.px_16}>
        {renderData.map((item, index) => (
          <ModalRenderRows item={item} key={index} />
        ))}
      </View>
    </ModalContainer>
  );
};

export default SidebarMenu;

const Styles = (colors: IColors) =>
  StyleSheet.create({
    modalContainer: {
      paddingHorizontal: 16,
    },
    modalRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
  });
