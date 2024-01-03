import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from "../modules/home/screens";
import { FavoritesScreen } from "../modules/favorites/screens";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from "../theme/colors";
import { Dimensions, View } from "react-native";

type BottomTabsParamList = {
  Home: undefined
  Favorites: undefined
}

const { height } = Dimensions.get("window")

const tabs = createBottomTabNavigator<BottomTabsParamList>();

const { Navigator, Screen } = tabs

export const HomeBottomTabs = () => {
  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.secondary,
        tabBarInactiveTintColor: COLORS.tertiary,
        tabBarLabelStyle: {
          fontSize: 14
        },
        tabBarStyle: {
          backgroundColor: COLORS.light,
          borderTopEndRadius: 20,
          borderTopStartRadius: 20,
        },
      }}
    >
      <Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarIcon: ({ color }) => <Icon name="home" color={color} size={30} /> }}
      />
      <Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{ tabBarIcon: ({ color }) => <Icon name="favorite" color={color} size={30} />}}
      />
    </Navigator>
  );
}