import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CustomBottomTab from '@components/navigation/BottomTab';
import {useSelector} from 'react-redux';

import {options} from '../constants/routes';
import Colors from '@utils/theme';

import HomeScreen from '../screens/Home';
import FriendsScreen from 'src/screens/Friends';
import MapScreen from '../screens/Map';
import DealsScreen from 'src/screens/Deals';
import MyProfile from 'src/screens/MyProfile';
import {IColors} from '@constants/Interfaces';
import Loader from '@components/Loader';

const Tab = createBottomTabNavigator();
const noHeader = {headerShown: false};

function BottomHomeTab() {
  const colors: IColors = Colors();
  const reload = useSelector((state: any) => state.login.reload);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={props => <CustomBottomTab {...props} colors={colors} />}>
      {
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={({route}) => options(colors, route, 'Home')}
        />
      }

      <Tab.Screen
        name="Funds"
        component={FriendsScreen}
        options={({route}) => options(colors, route, 'Funds')}
      />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen
        name="History"
        component={DealsScreen}
        options={({route}) => options(colors, route, 'History')}
      />
      <Tab.Screen name="Withdraw" component={MyProfile} />
    </Tab.Navigator>
  );
}

export default BottomHomeTab;
