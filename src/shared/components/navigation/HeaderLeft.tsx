import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import Image from '@components/Image';

///Assets
import images from '@assets/images';
import {ArrowLeft} from '@assets/svgIcons';
import DefaultStyle from '@constants/style';
import {IColors, IStyles} from '@constants/Interfaces';

export default function HeaderLeft(props) {
  const {title} = props;
  const navigation: any = useNavigation();
  const colors: IColors = props.colors;
  const ds: IStyles = DefaultStyle(colors);
  const {t} = useTranslation();
  const canGoBack = navigation.canGoBack();

  const themeDark = useSelector((state: any) => state.utils.dark);
  const fill = themeDark ? colors.dark : colors.primary;

  return (
    <View style={{ marginLeft:20}}>
      {title !== 'Home' && canGoBack ? (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[ds.row, {width: 200}]}>
          <ArrowLeft width={20} fill={fill} style={{marginEnd: 8}} />
          <Text style={[ds.title, {color: fill}]}>{t(title)}</Text>
        </TouchableOpacity>
      ) : (
        <Image
          style={{width: 50, height: '100%',marginTop:4}}
          source={images.logo}
          resizeMode="contain"
        />
      )}
    </View>
  );
}
