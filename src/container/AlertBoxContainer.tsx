import React from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  DimensionValue,
} from 'react-native';
import {useSelector} from 'react-redux';
import {View as ViewAnimated} from 'react-native-animatable';
import {IColors} from '@constants/Interfaces';

const {width, height} = Dimensions.get('window');

interface IAlertBoxContainer {
  onChange?: any;
  onTheTop?: boolean;
  top?: DimensionValue | undefined;
  status: boolean;
  colors: IColors;
  children: any;
}

export default function AlertBoxContainer({
  status = false,
  onChange,
  colors,
  onTheTop = false,
  top = '10%',
  children,
}: IAlertBoxContainer) {
  const themeDark = useSelector((state: any) => state.utils.dark);
  const styles = Styles(colors);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={status}
      onRequestClose={onChange}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={onChange}
          activeOpacity={1}
          style={styles.modalLightBG}
        />

        <ViewAnimated
          animation="zoomIn"
          delay={100}
          style={[styles.modalView, onTheTop && {top: top}]}>
          <View style={styles.modalContainer}>{children}</View>
        </ViewAnimated>
      </View>
    </Modal>
  );
}

const Styles = (colors: IColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    modalLightBG: {
      backgroundColor: 'rgba(0,0,0,0.6)',
      width: width,
      height: height,
    },
    modalView: {
      position: 'absolute',
      top: '40%',
      alignSelf: 'center',
      width: '85%',
    },
    modalContainer: {
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.gray,
      padding: 24,
      backgroundColor: colors.light,
      overflow: 'hidden',
    },
  });
