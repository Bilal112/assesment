import LoginScreen from '../screens/common/Login';

import HeaderTitle from '@components/navigation/HeaderTitle';
import HeaderLeft from '@components/navigation/HeaderLeft';
import HeaderRight from '@components/navigation/HeaderRight';

const StartRoutes = [{name: 'login', component: LoginScreen}];

const HomeRoutes = [];
const options = (colors, route, title) => {
  return {
    headerLeft: props => (
      <HeaderLeft props={props} title={title} colors={colors} />
    ),

    headerTitle: props => <HeaderTitle />,
    headerRight: () => <HeaderRight route={route} />,
    headerStyle: {
      height: Platform.OS === 'ios' ? 105 : 70,
      shadowColor: colors.dark,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
      backgroundColor: colors.light,
    },
  };
};

export {StartRoutes, HomeRoutes, options};
