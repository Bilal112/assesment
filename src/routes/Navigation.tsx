import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import { jwtDecode } from "jwt-decode";

import {StartRoutes, HomeRoutes, options} from '../constants/routes';

import BottomHomeTab from './BottomHomeTab';

import Colors from '@utils/theme';
import {IColors} from '@constants/Interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {updateLogin} from '@actions/loginSlice';

const noHeader = {headerShown: false};
const Stack = createStackNavigator();

function StartStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      {StartRoutes.map(({name, component}) => (
        <Stack.Screen
          key={name + '0'}
          name={name}
          component={component}
          options={noHeader}
        />
      ))}
    </Stack.Navigator>
  );
}

function LoginUserStack() {
  const colors: IColors = Colors();

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name="home" component={BottomHomeTab} options={noHeader} />
      {HomeRoutes.map(({name, title, component, hideHeader}: any) => (
        <Stack.Screen
          key={name + '1'}
          name={name}
          component={component}
          options={({route}) =>
            hideHeader ? noHeader : options(colors, route, title)
          }
        />
      ))}
    </Stack.Navigator>
  );
}
// Define the shape of the JWT payload if needed
interface JwtPayload {
  exp: number; 
  iat: number;
}

function checkToken(token: string): boolean {
  const decoded: JwtPayload = jwtDecode<JwtPayload>(token);
  const currentTime = Date.now() / 1000; // Convert to seconds
  return decoded.exp > currentTime; // Token is valid if not expired
}

const getToken = async (dispatch: (action: any) => void): Promise<void> => {
  try {
    const token = await AsyncStorage.getItem('@accessToken');
    if (token && checkToken(token)) {
      const data = {
        access_token: token,
      };
      dispatch(updateLogin(data));
    }
  } catch (error) {
    console.log('Error', error);
  }
};


// const getToken = async dispatch => {
//   try {
//     let token: any = await AsyncStorage.getItem('@accessToken');
//     if (token &&  checkToken(token)) {
      
//       let data: any = {
//         access_token: token,
//       };
//       dispatch(updateLogin(data));
//     }
//   } catch (error) {
//     console.log('Error', error);
//   }
// };
function App() {
  let dispatch = useDispatch();

  React.useEffect(() => {
    console.log('Loooooo');
    getToken(dispatch);
  }, []);

  const loggedIn = useSelector((state: any) => state.login.loggedIn);

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        {loggedIn ? (
          <Stack.Screen
            name="loginUser"
            component={LoginUserStack}
            options={noHeader}
          />
        ) : (
          <Stack.Screen
            name="start"
            component={StartStack}
            options={noHeader}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
