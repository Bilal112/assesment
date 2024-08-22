import React, {Children, useState} from 'react';
import {
  Text,
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

///Assets
import {Cross} from '@assets/svgIcons';
import Colors from '@utils/theme';
import {IColors} from '@constants/Interfaces';

const {width, height} = Dimensions.get('window');

export default function ModalContainer({status, onClose, children}) {
  const themeDark = useSelector((state: any) => state.utils.dark);
  const colors: IColors = Colors();
  const styles = Styles(colors);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={status}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <KeyboardAvoidingView
          style={{flex: 1, justifyContent: 'flex-end', zIndex: -9999}}
          behavior="position"
          >
          <TouchableOpacity
            onPress={onClose}
            activeOpacity={1}
            style={styles.modalLightBG}
          />
          <View style={styles.modalView}>
            <View style={styles.modalContainer}>
              <TouchableOpacity
                onPress={onClose}
                activeOpacity={1}
                style={styles.crossBtn}>
                <Cross fill={colors.danger} />
              </TouchableOpacity>

              {/* <Text style={styles.Filter}>Filter</Text> */}

              {children}
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const Styles = (colors: IColors) =>
  StyleSheet.create({
    icon: {
      marginHorizontal: 16,
    },

    Filter: {
      marginHorizontal: 16,
      color: colors.primary,
      fontSize: 16,
      fontFamily: colors.fontSemiBold,
    },
    centeredView: {
      flex: 1,
    },

    modalView: {
      // flex: 1,
      position: 'absolute',
      bottom: 0,
      width: width,
      maxHeight: height - 120,
      justifyContent: 'flex-end',
    },
    modalLightBG: {
      backgroundColor: 'rgba(0,0,0,0.6)',
      width: width,
      height: height,
    },
    modalContainer: {
      // flex: 1,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      borderWidth: 1,
      borderColor: colors.gray,
      backgroundColor: colors.light,
      paddingTop: 34,
      paddingBottom: 24,
      marginBottom: -1,
      marginHorizontal: -1,
      // maxHeight: height - 50,
    },
    crossBtn: {
      backgroundColor: colors.light,
      justifyContent: 'center',
      position: 'absolute',
      alignItems: 'center',
      borderRadius: 100,
      padding: 8,
      right: 16,
      top: -12,
      // width: 25,
      // height: 25,
      // backgroundColor: 'rgba(0,0,0,0.5)',
      // borderColor: colors.gray,
      // borderWidth: 1,
    },
  });
