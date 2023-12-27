import React, { useState } from "react";
import {
  Animated,
  PanResponder,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import styles from "./HomeStyle";
import { TabView, SceneMap } from "react-native-tab-view";
import MyFeedScreen from "../myfeed/MyFeedScreen";
import DiscoverScreen from "../discover/DiscoverScreen";
import TabBar from "../../components/tabbar/TabBar";

interface HomeProps {}

const Home = (props: HomeProps) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Discover" },
    { key: "second", title: "MyFeed" },
  ]);

  const renderScene = SceneMap({
    first: DiscoverScreen,
    second: MyFeedScreen,
  });

  return (
    <View style={styles.container}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={() => <TabBar index={index} setIndex={setIndex} />}
      />
    </View>
  );
};

export default Home;
