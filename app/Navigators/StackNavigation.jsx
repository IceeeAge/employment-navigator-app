import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/Home/HomeScreen";
import DetailsScreen from "../screens/DetailsScreen/DetailsScreen";
import ApplyScreen from "../screens/ApplyScreen/ApplyScreen";

const Stack = createStackNavigator();
export default function StackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home-Stack"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={{
          headerTitle: "Details",
        }}
      />
      <Stack.Screen
        name="ApplyScreen"
        component={ApplyScreen}
        options={{
          headerTitle: "Details",
        }}
      />
    </Stack.Navigator>
  );
}
