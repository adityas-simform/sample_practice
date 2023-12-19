import * as React from "react";
import { Text, View } from "react-native";
import styles from "./HomeStyle";

interface HomeProps {}

const Home = (props: HomeProps) => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
};

export default Home;
