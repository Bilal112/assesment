import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  UIManager,
  Platform,
  Animated,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {View as AView} from 'react-native-animatable';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import Icons from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

//Components
import Image from '@components/Image';

///Assets
import Colors from '@utils/theme';
import {IColors, IStyles} from '@constants/Interfaces';
import DefaultStyle from '@constants/style';
import {MenuIcon, UsersIcon} from '@assets/svgIcons';
import {
  NotificationsIcon,
  ArrowLeft,
  CameraIcon,
  FireIcon,
} from '@assets/svgIcons';
import {FlatList} from 'react-native-gesture-handler';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

interface IHeaderBar {
  favoriteSports?: any;
  navigation: any;
  setShowSide: (e) => void;
  allBuzz?: number;
  totalPackages?: number;
  allPost?: number;
  likes?: number;
  isOtherProfile?: boolean;
  loading: boolean;
  user: any;
  isFriend?: boolean;
  descriptionOnly?: boolean;
  isDescriptionOnly: (e: any) => void | any;
  addFriend?: () => void;
}

const HeaderBar = ({
  favoriteSports,
  navigation,
  setShowSide,
  allBuzz,
  totalPackages,
  allPost,
  likes,
  isOtherProfile = false,
  user,
  isFriend = false,
  loading,
  descriptionOnly = false,
  isDescriptionOnly,
  addFriend = () => {},
}: IHeaderBar) => {
  const dispatch = useDispatch();
  const colors: IColors = Colors();
  const ds: IStyles = DefaultStyle(colors);
  const st = Styles(colors);
  const {t} = useTranslation();

  const maxHeight = Dimensions.get('window').height;

  const [animatedValue] = useState(new Animated.Value(0));

  useEffect(() => {
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    Animated.timing(animatedValue, {
      toValue: descriptionOnly
        ? maxHeight
        : Platform.OS === 'android'
        ? 230
        : 280,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [descriptionOnly]);

  const labelStyle = {
    height: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
  };

  const dark = useSelector((state: any) => state.utils?.dark);
  const myDetails = useSelector((state: any) => state.login.user);
  let showLabel =
    user?.role === 'freelance' || user?.role === 'venue' ? true : false;

  // let bgColor =
  //   user?.role === 'freelance'
  //     ? ['#D3D3D3', '#bababa']
  //     : user?.role === 'venue'
  //     ? ['#4379c6', '#1458b8']
  //     : ['#EE6B1C', '#F7931E'];

  let bgColor = showLabel ? ['#4379c6', '#1458b8'] : ['#EE6B1C', '#F7931E'];

  const infoLabel = [ds.subTitle, ds.cLight];

  return (
    <Animated.View style={labelStyle}>
      <LinearGradient
        style={{flex: 1}}
        colors={bgColor}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <SafeAreaView>
          <View style={st.header}>
            {/* {showLabel && (
              <View>
                <Text style={[ds.smallText, ds.cLight, ds.bold]}>
                  freelance
                </Text>
              </View>
            )} */}

            <Image
              source={user?.profile_pic ? {uri: user?.profile_pic} : null}
              type="profile"
            />

            <Text style={st.usernameText}>{user?.username}</Text>
            <Text style={[ds.descriptionText, ds.bold, {color: colors.white}]}>
              ({user?.firstName} {user?.lastName})
            </Text>

            <View style={st.topRightBarIcon}>
              <View style={[ds.row, ds.mb_8]}>
                {!isOtherProfile && (
                  <TouchableOpacity
                    style={ds.px_8}
                    onPress={() => navigation.navigate('notification')}>
                    <NotificationsIcon width={22} fill={colors.white} />
                  </TouchableOpacity>
                )}
                {loading ? null : (
                  <TouchableOpacity
                    style={ds.px_8}
                    onPress={() => setShowSide(true)}>
                    <MenuIcon width={28} fill={colors.white} />
                  </TouchableOpacity>
                )}
              </View>

              {isOtherProfile && (
                <View>
                  {isFriend && (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('chatting', {
                          senderId: user?._id,
                          title: `${user?.firstName} ${user?.lastName}`,
                          is_room: false,
                        })
                      }
                      style={[st.pills, ds.jc_center]}>
                      <Ionicons
                        name={'chatbox-ellipses'}
                        size={20}
                        color={colors.primary}
                      />
                    </TouchableOpacity>
                  )}
                  {!isFriend && (
                    <TouchableOpacity
                      onPress={() => addFriend()}
                      style={[st.pills, ds.jc_center]}>
                      <Ionicons
                        name={'person-add'}
                        size={20}
                        color={colors.primary}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              )}

              <TouchableOpacity
                onPress={() => isDescriptionOnly(!descriptionOnly)}
                style={[
                  st.pills,
                  ds.jc_center,
                  {
                    backgroundColor: descriptionOnly
                      ? colors.darkGray
                      : colors.light,
                  },
                ]}>
                <FontAwesome
                  name={'address-card'}
                  size={20}
                  color={descriptionOnly ? colors.light : colors.primary}
                />
              </TouchableOpacity>

              {totalPackages ? (
                <View style={st.pills}>
                  <FireIcon width={16} fill={colors.primary} />
                  <Text style={[ds.darkText, ds.ml_8]}>{totalPackages}</Text>
                </View>
              ) : null}
              {user?.eventsCount ? (
                <View style={st.pills}>
                  <MaterialCommunityIcons
                    name="run"
                    size={18}
                    color={colors.danger}
                  />
                  <Text style={[ds.darkText, ds.ml_8]}>
                    {user?.eventsCount}
                  </Text>
                </View>
              ) : null}
            </View>

            <View style={st.topLeftBarIcon}>
              {isOtherProfile && (
                <TouchableOpacity
                  style={[ds.pb_8, ds.row]}
                  onPress={() => navigation.goBack()}>
                  <ArrowLeft width={25} fill={colors.white} />
                  <Text style={[ds.title, ds.cLight]}>Back</Text>
                </TouchableOpacity>
              )}
              <View style={st.pills}>
                <Icons name="heart" size={16} color={colors.danger} />
                <Text style={[ds.darkText, ds.ml_8]}>{likes}</Text>
              </View>
              <View style={st.pills}>
                <CameraIcon width={16} fill={colors.primary} />
                <Text style={[ds.darkText, ds.ml_8]}>{allPost}</Text>
              </View>
              <View style={st.pills}>
                <Icons
                  name="pencil-square-o"
                  size={18}
                  color={colors.primary}
                />
                <Text style={[ds.darkText, ds.ml_8]}>{allBuzz}</Text>
              </View>

              <View style={st.pills}>
                <UsersIcon width={16} fill={colors.primary} />
                <Text style={[ds.darkText, ds.ml_8]}>
                  {user?.friends?.length}
                </Text>
              </View>
            </View>
          </View>

          {descriptionOnly && (
            <AView animation="fadeIn" style={ds.px_24}>
              <View style={[ds.ai_center, ds.mb_16, {marginTop: -8}]}>
                {/* <Text style={ds.emailText}>{user?.email}</Text> */}
              </View>

              <View style={ds.mb_16}>
                <Text style={st.sectionTitle}>{t('Profile Information')}</Text>
                <View style={st.infoItem}>
                  <Text style={infoLabel}>{t('Events Count')}:</Text>
                  <Text style={infoLabel}>{user?.eventsCount}</Text>
                </View>
                <View style={st.infoItem}>
                  <Text style={infoLabel}>{t('Events Joined')}:</Text>
                  <Text style={infoLabel}>{user?.eventsJoinCount}</Text>
                </View>
                <View style={st.infoItem}>
                  <Text style={infoLabel}>{t('Posts Count')}:</Text>
                  <Text style={infoLabel}>{user?.postsCount}</Text>
                </View>
                <View style={st.infoItem}>
                  <Text style={infoLabel}>{t('Friends')}:</Text>
                  <Text style={infoLabel}>{user?.friends.length}</Text>
                </View>
              </View>

              {favoriteSports?.length > 0 ? (
                <View style={ds.mb_16}>
                  <Text style={st.sectionTitle}>{t('Sports')}</Text>

                  <FlatList
                    horizontal
                    data={favoriteSports}
                    keyExtractor={(item, index) =>
                      `${index}${Math.floor(index)}`
                    }
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) => {
                      return (
                        <View style={[st.pills, {marginEnd: 8}]}>
                          <Text style={ds.smallText}>
                            {item?.sport_id?.name}
                          </Text>
                        </View>
                      );
                    }}
                  />
                </View>
              ) : null}

              {user?.bio ? (
                <View style={ds.mb_24}>
                  <Text style={st.sectionTitle}>{t('Bio')}</Text>
                  <Text style={infoLabel}>{user?.bio}</Text>
                </View>
              ) : null}
            </AView>
          )}
        </SafeAreaView>
      </LinearGradient>
    </Animated.View>
  );
};

export default HeaderBar;

const Styles = (colors: IColors) =>
  StyleSheet.create({
    usernameText: {
      fontSize: 16,
      color: colors.white,
      fontFamily: colors.fontBold,
      textTransform: 'lowercase',
      textAlign: colors.RTL ? 'right' : 'left',
      marginTop: 16,
    },
    sectionTitle: {
      fontSize: 20,
      color: colors.light,
      fontFamily: colors.fontSemiBold,
      fontWeight: 'bold',
      marginBottom: 12,
    },
    infoItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    header: {
      marginTop: 16,
      paddingHorizontal: 16,
      paddingBottom: 16,
      alignItems: 'center',
    },
    topRightBarIcon: {
      position: 'absolute',
      right: 16,
      alignItems: 'flex-end',
    },
    topLeftBarIcon: {
      position: 'absolute',
      left: 16,
      alignItems: 'flex-start',
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 15,
      alignItems: 'center',
    },
    pills: {
      minWidth: 50,
      marginBottom: 8,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.light,
      borderRadius: 8,
      paddingVertical: 4,
      paddingHorizontal: 8,
    },
    profileInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    stats: {
      marginLeft: 24,
    },
    statText: {
      fontSize: 14,
    },
  });
