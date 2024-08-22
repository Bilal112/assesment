import images from '@assets/images';
import React, {useState} from 'react';
import {ActivityIndicator, Image, Pressable, StyleSheet, View} from 'react-native';

interface IImage {
  source?: any;
  uri?: any;
  style?: any;
  resizeMode?: any;
  type?: string;
}

const ImageCom = ({
  source,
  uri,
  style,
  type = '',
  resizeMode = 'cover',
}: IImage) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);


    return (
      <View>
        {loading && (
          <ActivityIndicator
            style={StyleSheet.absoluteFill}
            size="small"
            color="#E35F2C"
          />
        )}
        <Image
          source={uri ? {uri: uri} : source && source}
          style={style}
          resizeMode={resizeMode}
          onError={() => setError(true)}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
        />
      </View>
    );
  
};

export default ImageCom;
