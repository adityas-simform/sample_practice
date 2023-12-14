/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import ToDo from "./app/screens/toDo";
import { Provider } from "react-redux";
import { store } from "./app/redux/store";

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <Provider store={store}>
        <ToDo />
      </Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
