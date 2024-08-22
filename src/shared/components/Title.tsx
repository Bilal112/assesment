import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '@utils/theme';
import {IColors} from '@constants/Interfaces';

interface ITitle {
  title: String;
  titleMid?: String;
  titleEnd?: String;
  subHeading?: any;
  subHeadingType?: String;
  color?: String;
  size?: Number;
  bold?: Boolean;
  center?: Boolean;
}

export default function Title({
  title,
  titleMid,
  titleEnd,
  subHeading,
  subHeadingType,
  color,
  size = 20,
  bold = false,
  center = false,
}: ITitle) {
  const colors: IColors = Colors();
  const styles = Styles(colors);
  // color = colors.textSecondary

  // let st: any = [];
  // if (bold) st.push(styles.titleBold);
  // if (size) st.push({fontSize: size});
  // if (color) st.push({color: color});

  const titleStyle: any = [
    styles.title,
    styles.titleBold,
    {fontSize: size},
    color && {color: color},
  ];

  return (
    <View
      style={{
        alignItems: center ? 'center' : 'flex-start',
      }}>
      <View style={styles.row}>
        <Text style={titleStyle}>
          {title}
          <Text style={styles.titleMid}> {titleMid} </Text>
          {titleEnd}
        </Text>
      </View>
      {subHeading ? (
        // <Animatable animation="fadeIn">
        <Text style={styles.subHeading}>{subHeading}</Text>
      ) : // </Animatable>
      null}
    </View>
  );
}

const Styles = (colors: IColors) =>
  StyleSheet.create({
    title: {
      color: colors.secondary,
      fontFamily: colors.fontMedium,
    },
    titleBold: {
      fontFamily: colors.fontSemiBold,
    },
    titleMid: {
      color: colors.primary,
      fontSize: 20,
      fontFamily: colors.fontMedium,
    },
    subHeading: {
      marginTop: 4,
      color: colors.gray,
      fontSize: 13,
      lineHeight: 18,
      fontFamily: colors.font,
    },
    row: {flexWrap: 'wrap', flexDirection: 'row'},
  });
