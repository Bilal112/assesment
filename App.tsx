import React, {useEffect} from 'react';
import {View, StatusBar} from 'react-native';
import Navigation from './src/routes/Navigation';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
const queryClient = new QueryClient();
export default function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <>
          <StatusBar
            backgroundColor={'white'}
            animated={true}
            showHideTransition={'fade'}
            barStyle={'light-content'}
          />

          <Navigation />
        </>
      </View>
    </QueryClientProvider>
  );
}
