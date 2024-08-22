import SearchBar from '@components/SearchBar';
import {IColors} from '@constants/Interfaces';
import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  getFriendRequestList,
  requestAcceptReject,
} from '@services/friends.service';
import ListSingle from '@components/ListSingle';
import NoRecordFound from '@components/NoRecordFound';
import Loader from '@components/Loader';
import {requestUserListUpdate} from '@actions/loginSlice';

const FriendRequest = ({loading, colors}) => {
  const dispatch = useDispatch();

  const navigation: any = useNavigation();

  const [search, setSearch] = useState('');
  const requestUser = useSelector((state: any) => state.login.requestUserList);

  async function onPressAccept(id: String) {
    let data = {
      request_id: id,
      status: 'accepted',
    };
    let acceptUser = await requestAcceptReject(data);
    if (acceptUser?.status === 'success') {
      let getNotificationUser = await getFriendRequestList();
      dispatch(requestUserListUpdate(getNotificationUser));
    }
  }

  async function onPressReject(id: String) {
    let data = {
      request_id: id,
      status: 'declined',
    };
    let acceptUser = await requestAcceptReject(data);
    if (acceptUser?.status === 'success') {
      let getNotificationUser = await getFriendRequestList();
      dispatch(requestUserListUpdate(getNotificationUser));
    }
  }

  const _renderItem = ({item}) => {
    return (
      <ListSingle
        item={item?.sender_id}
        type="request"
        onPress1={() => onPressAccept(item?._id)}
        onPress2={() => onPressReject(item?._id)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={{marginTop: 10, marginHorizontal: 10}}>
        {/* <SearchBar
          colors={colors}
          filterBy={() => null}
          searchValue={search}
          onChangeSearch={setSearch}
          showFilterIcon={false}
        /> */}
        <FlatList
          contentContainerStyle={{marginTop: 20}}
          data={requestUser}
          renderItem={_renderItem}
          ListEmptyComponent={() =>
            !loading && <NoRecordFound colors={colors} />
          }
          ListFooterComponent={() => loading && <Loader center={false} />}
        />
      </View>
    </View>
  );
};

export default FriendRequest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
