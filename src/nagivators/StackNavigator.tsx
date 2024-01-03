
import { createStackNavigator } from '@react-navigation/stack';
import { PosterDetailsScreen } from "../modules/home/screens/PosterDetailsScreen";
import { HomeBottomTabs } from ".";
import { Post } from "../interfaces/interfaces";

export type RootStackParams = {
  homeBottomTabs: undefined
  posterDetails: Post
}

const Stack = createStackNavigator<RootStackParams>();

const { Navigator, Screen } = Stack

export const StackNavigation = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="homeBottomTabs" component={ HomeBottomTabs } />
      <Screen name="posterDetails" component={ PosterDetailsScreen } />
    </Navigator>
  );
}