import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Button,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';

import Colors from '@utils/theme';
import {IColors, IStyles} from '@constants/Interfaces';
import DefaultStyle from '@constants/style';
import Icon from 'react-native-vector-icons/Feather';
import {Setting} from '@assets/svgIcons';
import Icon1 from 'react-native-vector-icons/Feather';
import ImageCom from '@components/Image';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

const Friends: React.FC = () => {
  const colors: IColors = Colors();
  const ds: IStyles = DefaultStyle(colors);

  interface ListingResponse {
    token: string;
  }
  const user = useSelector((state: any) => state.login.user);
  console.log(user,'--------')
  const LisingApi = async (): Promise<ListingResponse> => {
    let config = {
      headers: {
        Authorization: user?.access_token,
      },
    };
    const response = await axios.get<ListingResponse>(
      'https://api.getharvest.app/funds/all',
      config,
    );
    return response.data;
  };

  const {
    isLoading,
    isError,
    data: dataValue,
    error,
  }: any = useQuery({
    queryKey: ['ListingTransistion'],
    queryFn: LisingApi,
  });

  if (isError) {
    Alert.alert('Error', error.message);
  }

  const SearchBar = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 16,
          marginTop: 16,
        }}>
        {/* Search Input Section */}
        <View
          style={[
            styles.filterCSS,
            {
              borderColor: colors.gray,
            },
          ]}>
          <Icon name="search" size={24} color={colors.gray} />
          <TextInput
            style={{
              flex: 1,
              marginLeft: 8,
              fontSize: 14,
            }}
            placeholder="Search Funds"
            placeholderTextColor={colors.gray}
          />
        </View>

        {/* Filter Button Section */}
        <View
          style={[
            styles.filterBox,
            {
              borderColor: colors.gray,
            },
          ]}>
          <Setting width={18} fill={colors.gray} />
          <Icon name="chevron-down" size={26} color={colors.gray} />
        </View>
      </View>
    );
  };

  const renderFundItem = ({item}) => {
    const fund = item;
    return (
      <View key={item.id}>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <View style={styles.logoContainer}>
              <ImageCom
                source={{
                  uri:
                    fund?.bankId == 1
                      ? 'data:image/png;base64,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'
                      : 'https://mir-s3-cdn-cf.behance.net/project_modules/hd/83033d110351411.5feaf5980dcfb.png',
                }}
                style={styles.logo}
              />
            </View>
            <View style={styles.details}>
              <Text style={styles.fundName}>{fund.name}</Text>
              <View style={styles.returnSection}>
                <Text style={styles.returnLabel}>Annual Return</Text>
                <View
                  style={[
                    styles.returnValueContainer,
                    {
                      borderColor: colors.grayLight,
                    },
                  ]}>
                  <Icon1
                    name={
                      fund.returnType === 'up'
                        ? 'arrow-up-right'
                        : 'arrow-down-right'
                    }
                    size={16}
                    color={fund.returnType === 'up' ? 'green' : 'red'}
                  />
                  <Text
                    style={{
                      color: fund.returnType === 'up' ? 'green' : 'red',
                      marginLeft: 4,
                    }}>
                    {fund.NAV}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <Button title="View Details" onPress={() => {}} color="#D0D5DD" />
        </View>
      </View>
    );
  };

  const FundList = () => {
    return (
      <FlatList
        data={dataValue}
        renderItem={renderFundItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{paddingVertical: 16}}
        ListFooterComponent={() => {
          return isLoading ? <ActivityIndicator color={'red'} /> : null;
        }}
      />
    );
  };
  return (
    <View style={ds.flex}>
      <SearchBar />
      <FundList />
    </View>
  );
};
const styles = StyleSheet.create({
  totalFundsText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    flex: 1,
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  logoContainer: {
    flex: 0.45,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  details: {
    flex: 3,
    marginLeft: 10,
    flexDirection: 'row',
  },
  fundName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    width: '60%',
  },
  returnSection: {
    alignItems: 'flex-end',
    flex: 1,
  },
  returnLabel: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
  returnValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.25,
  },
  filterCSS: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginRight: 8,
    flex: 1,
  },
  filterBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});

export default Friends;
