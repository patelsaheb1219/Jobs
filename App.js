import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createStackNavigator,createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';

import store from './store';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import SettingScreen from './screens/SettingScreen';
import ReviewScreen from './screens/ReviewScreen';

export default class App extends React.Component {
  render() {
    const MainNavigator = createBottomTabNavigator({
      welcome: { 
        screen: WelcomeScreen,
        navigationOptions: { 
          tabBarVisible:false
        }
      },
      auth: { 
        screen: AuthScreen,
        navigationOptions: { 
          tabBarVisible:false
        } 
      },
      main: {
        screen: createBottomTabNavigator({
          map: { screen: MapScreen },
          deck: { screen: DeckScreen },
          review: {
            screen: createStackNavigator({
              review: { screen: ReviewScreen },
              settings: { screen: SettingScreen }
            })
          }
        }),
        navigationOptions: { 
          tabBarVisible:false
        }
      }
    },{
      lazyLoad: true 
    });

    const App = createAppContainer(MainNavigator);
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <App />
        </View>
      </Provider>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
