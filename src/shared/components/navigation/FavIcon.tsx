import React from 'react';
import {Image} from 'react-native';
import {useSelector} from 'react-redux';

///Assets
import images from '@assets/images';

export default function FavIcon() {
  const themeDark = useSelector((state: any) => state.utils.dark);

  return (
    <Image
      style={{height: 35, width: 50}}
      source={images.logo}
      resizeMode="contain"
    />
  );
}
