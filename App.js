import PostListScreen from './screens/PostListScreen';
import UserDetail from './screens/UserDetail';
import PostDetail from './screens/PostDetail';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Posts'>
          <Stack.Screen name="Posts" component={PostListScreen} />
          <Stack.Screen name="User Details" component={UserDetail} />
          <Stack.Screen name="Post Details" component={PostDetail} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}