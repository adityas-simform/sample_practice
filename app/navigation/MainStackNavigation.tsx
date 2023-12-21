import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ROUTES } from "../constants/NavigationRoutes";
import ToDo from "../screens/ToDo";
import Login from "../screens/Login";
import { navigationRef } from "../utils/NavigatorUtils";

const RootStack = createNativeStackNavigator();

const MainStackNavigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <RootStack.Screen name={ROUTES.ToDo} component={ToDo} />
        <RootStack.Screen name={ROUTES.Login} component={Login} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackNavigation;
