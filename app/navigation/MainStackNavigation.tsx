import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigationRef } from "../utils";
import { ROUTES } from "../constants/NavigationRoutes";
import ToDo from "../screens/toDo";

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
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackNavigation;
