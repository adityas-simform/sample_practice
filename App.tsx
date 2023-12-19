/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { store } from "./app/redux/Store";
import MainStackNavigation from "./app/navigation/MainStackNavigation";

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <Provider store={store}>
        <MainStackNavigation />
      </Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default App;
