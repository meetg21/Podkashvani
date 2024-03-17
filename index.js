/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import PodcastPlayer from './src/screens/PodcastPlayer';
import Profile from './src/screens/Profile';
import Upload from './src/screens/Upload';
import PlayPodcast from './src/screens/PlayPodcast';
import Customize from './src/screens/Customize';
import Home from './src/screens/Home';


const Stack = createNativeStackNavigator();

export default function Main() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          {/* <Stack.Screen name="Home" component={App} /> */}
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          {/* <Stack.Screen name="Customize" component={Customize} /> */}
          {/* <Stack.Screen name="PodcastPlayer" component={PodcastPlayer} /> */}
          {/* <Stack.Screen name="PlayPodcast" component={PlayPodcast} /> */}
          {/* <Stack.Screen name="Profile" component={Profile} /> */}
          {/* <Stack.Screen name="Home" component={Home} /> */}
          {/* <Stack.Screen name="Customize" component={Customize} /> */}
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent(appName, () => Main);
