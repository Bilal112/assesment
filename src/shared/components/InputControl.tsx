import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  Pressable,
  Animated,
  Platform,
} from 'react-native';
import {View} from 'react-native-animatable';
import {Controller} from 'react-hook-form';
import {Cross} from '@assets/svgIcons';
import Colors from '@utils/theme';
import {useTranslation} from 'react-i18next';
import {View as AnimateView} from 'react-native-animatable';
import {IColors} from '@constants/Interfaces';

export default function InputControl(props: any) {
  const {
    secureTextEntry = false,
    placeholder = 'placeholder',
    validation = false,
    disabled = false,
    Icon,
    animation = 'fadeIn',
    delay,
    title,
    animationRef,
    control = {},
    name,
    RTL,
    multiline = false,
    numberOnly = false,
    onPress = () => {},
    required,
  } = props;
  const [focused, setFocus] = useState(false);
  const {t} = useTranslation();

  const colors: IColors = Colors();
  const st = Styles(colors, RTL, focused, validation, disabled);

  // const textAnim = useRef(new Animated.Value(0)).current;

  // const handleFocusAnimation = () => {
  //   Animated.timing(textAnim, {
  //     toValue: 1,
  //     duration: 200,
  //     useNativeDriver: false,
  //   }).start();
  // };

  // const handleBlurAnimation = () => {
  //   Animated.timing(textAnim, {
  //     toValue: 0,
  //     duration: 200,
  //     useNativeDriver: false,
  //   }).start();
  // };

  // const labelStyle = {
  //   top: textAnim.interpolate({
  //     inputRange: [0, 1],
  //     outputRange: [16, -10],
  //   }),
  //   // fontSize: textAnim.interpolate({
  //   //   inputRange: [0, 1],
  //   //   outputRange: [16, 12],
  //   // }),
  //   color: textAnim.interpolate({
  //     inputRange: [0, 1],
  //     outputRange: [colors.gray, colors.primary],
  //   }),
  // };

  // useEffect(() => {
  //   if (value || focused) {
  //     handleFocusAnimation();
  //   } else {
  //     handleBlurAnimation();
  //   }
  // }, [value, focused]);

  const numberOnlyRule = val => {
    const numericValue = val.replace(/[^0-9]/g, '');
    return numericValue;
  };

  const _renderInput = (value, onChange, onBlur) => {
    return (
      <>
        {title ? (
          <View
            style={[
              st.titleBox,
              // labelStyle
            ]}>
            <Animated.Text style={[st.title]}>{title}</Animated.Text>
          </View>
        ) : null}
        <View
          style={
          {  borderWidth:1,
            flexDirection:'row',
            display:'flex',
            alignItems:'center',
            paddingHorizontal:10,
            borderRadius:10,
            borderColor:colors.lightBlack
          }
          }>
          <TextInput
            {...props}
            autoCapitalize="none"
            secureTextEntry={secureTextEntry}
            value={String(value)}
            editable={!disabled}
            placeholder={placeholder}
            onChangeText={val => {
               onChange(val);
            }}
            onFocus={() => [
              setFocus(true),
            ]}
            onBlur={() => [
              setFocus(false),
              onBlur(),
            ]}
            placeholderTextColor={colors.gray}
            
            style={{
             borderColor:colors.lightGray,
             height:58,
             width:'90%',
             borderRadius:10
            }}
            
          />
          {disabled ? null : Icon ? (
            <Pressable onPress={onPress}>
              <Icon fill={colors.primary} width="20" />
            </Pressable>
          ) : value ? (
            <View animation="fadeIn" style={st.crossIcon}>
              <TouchableOpacity onPress={() => onChange('')}>
                <Cross width="15" fill={colors.danger} />
              </TouchableOpacity>
            </View>
          ) : null}
          
         
          

          
        </View>
      </>
    );
  };

  return (
    <AnimateView
      ref={animationRef}
      animation={animation}
      delay={delay}
      style={{marginTop: 16}}>
      <Controller
        name={name}
        control={control}
        render={({field: {value, onChange, onBlur}}) =>
          _renderInput(value, onChange, onBlur)
        }
      />
      {validation?.message ? (
        <Text style={st.error}>{t(validation.message)}</Text>
      ) : null}
    </AnimateView>
  );
}

const Styles = (colors: IColors, RTL, focused, validation, disabled) =>
  StyleSheet.create({
   container:{
    flex:1,
   },
   placeholderContainer: {
    zIndex: 11,
    position: 'absolute',
    top: Platform.OS === 'ios' ? 16 : 14,
    left: Platform.OS === 'ios' ? 16 : 20,
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
  },
  placeHolderText: {
    color: colors.gray,
    textAlign: RTL ? 'right' : 'left',
    fontSize: 12,
    fontFamily: colors.font,
  },
  requiredStar: {
    color: colors.danger,
    fontSize: 12,
    fontFamily: colors.fontBold,
  },

  titleBox: {
    backgroundColor: disabled ? colors.lightPlusGray : colors.whiteLight,
    paddingHorizontal: 4,
    position: 'absolute',
    zIndex: 1,
    marginTop: -8,
    marginLeft: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 12,
    fontFamily: colors.fontSemiBold,
    color: validation
      ? colors.danger
      : focused
      ? colors.primary
      : colors.dark,
  },
  crossIcon: {
    alignItems: 'center',
    width: '10%',
  },
  inputBoxLayout: {
    flexDirection: RTL ? 'row-reverse' : 'row',
    borderColor: validation
      ? colors.danger
      : focused
      ? colors.primary
      : colors.lightGray,
    minHeight: 50,
    // maxHeight: 100,
    paddingHorizontal: 16,
    alignItems: 'center',
    color: validation ? colors.primary : colors.danger,
    backgroundColor: disabled ? colors.lightPlusGray : colors.whiteLight,
    borderWidth: 1,
    borderRadius: 8,
  },
  error: {
    fontSize: 10,
    marginTop: 2,
    marginHorizontal: 8,
    fontFamily: colors.fontSemiBold,
    color: colors.danger,
  },
  });
