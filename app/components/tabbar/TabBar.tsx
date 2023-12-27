import { View, Text, Image, Pressable, Animated } from "react-native";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";

const TabBar = ({ index, setIndex }) => {
  const refreshScale = useSelector((state: RootState) => state.refresh.scale);
  const refreshRotate = useSelector((state: RootState) => state.refresh.rotate);

  return (
    <View
      style={{
        height: 50,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
      }}
    >
      <View style={{ width: "20%" }}>
        {index === 0 ? (
          <Image
            source={require("../../assets/images/settings.png")}
            style={{ height: 30, width: 30 }}
          />
        ) : (
          <Pressable
            onPress={() => setIndex(0)}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Text
              style={{ color: "#379AF7", fontSize: 20, right: 3, bottom: 2 }}
            >{`<`}</Text>
            <Text>Discover</Text>
          </Pressable>
        )}
      </View>
      <View
        style={{
          borderBottomColor: "#379AF7",
          borderBottomWidth: 5,
          paddingBottom: 2,
          borderRadius: 7,
        }}
      >
        <Text>{index === 0 ? "Discover" : "MyFeed"}</Text>
      </View>
      <View style={{ width: "20%", alignItems: "flex-end" }}>
        {index === 0 ? (
          <Pressable
            onPress={() => setIndex(1)}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Text>MyFeed</Text>
            <Text
              style={{ color: "#379AF7", fontSize: 20, left: 3, bottom: 2 }}
            >{`>`}</Text>
          </Pressable>
        ) : (
          <Animated.Text
            style={{
              fontSize: 35,
              color: "#379AF7",
              transform: [
                { scale: refreshScale },
                { rotate: refreshRotate !== null ? refreshRotate : "0deg" },
              ],
            }}
          >
            ⟳
          </Animated.Text>
        )}
      </View>
    </View>
  );
};

export default TabBar;
