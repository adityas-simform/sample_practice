import {
  View,
  Text,
  PanResponder,
  Animated,
  Image,
  Dimensions,
} from "react-native";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/Store";
import { rotateRefresh, sacleRefresh } from "../../redux/RefreshSlice";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const feeds = [
  { id: 1, uri: require("../../assets/images/feeds/1.jpg") },
  { id: 2, uri: require("../../assets/images/feeds/2.jpg") },
  { id: 3, uri: require("../../assets/images/feeds/3.jpg") },
  { id: 4, uri: require("../../assets/images/feeds/4.jpg") },
  { id: 5, uri: require("../../assets/images/feeds/5.jpg") },
];

const MyFeedScreen = () => {
  const cardposition = useRef(
    new Animated.ValueXY({
      x: 0,
      y: 0,
    })
  ).current;

  const swipedcardposition = useRef(
    new Animated.ValueXY({
      x: 0,
      y: -SCREEN_HEIGHT,
    })
  ).current;

  const feedview = useRef(
    new Animated.ValueXY({
      x: 0,
      y: 0,
    })
  ).current;

  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch<AppDispatch>();

  const panResponder = PanResponder.create({
    // Ask to be the responder:
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

    onPanResponderGrant: (evt, gestureState) => {
      // The gesture has started. Show visual feedback so the user knows
      // what is happening!
      // gestureState.d{x,y} will be set to zero now
    },
    onPanResponderMove: (evt, gestureState) => {
      console.log(gestureState.dy);

      if (currentIndex === 0 && gestureState.dy > 0) {
        feedview.setValue({
          x: 0,
          y: gestureState.dy,
        });
        dispatch(sacleRefresh(feedview));
        dispatch(rotateRefresh(feedview));
      } else if (gestureState.dy > 0 && currentIndex > 0) {
        swipedcardposition.setValue({
          x: 0,
          y: -SCREEN_HEIGHT + gestureState.dy,
        });
      } else {
        cardposition.setValue({
          x: 0,
          y: gestureState.dy,
        });
      }
      // The most recent move distance is gestureState.move{X,Y}
      // The accumulated gesture distance since becoming responder is
      // gestureState.d{x,y}
    },
    onPanResponderTerminationRequest: (evt, gestureState) => true,
    onPanResponderRelease: (evt, gestureState) => {
      // The user has released all touches while this view is the
      // responder. This typically means a gesture has succeeded
      if (currentIndex === 0 && gestureState.dy > 0) {
        Animated.spring(feedview, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      } else if (
        currentIndex > 0 &&
        gestureState.dy > 50 &&
        gestureState.vy > 0.3
      ) {
        Animated.timing(swipedcardposition, {
          toValue: { x: 0, y: 0 },
          duration: 300,
          useNativeDriver: false,
        }).start(() => {
          setCurrentIndex((previousIndex) => previousIndex - 1);
          swipedcardposition.setValue({ x: 0, y: -SCREEN_HEIGHT });
        });
      } else if (
        -gestureState.dy > 50 &&
        -gestureState.vy > 0.7 &&
        currentIndex < feeds.length - 1
      ) {
        Animated.timing(cardposition, {
          toValue: { x: 0, y: -SCREEN_HEIGHT },
          duration: 300,
          useNativeDriver: false,
        }).start(() => {
          setCurrentIndex((previousIndex) => previousIndex + 1);
          cardposition.setValue({ x: 0, y: 0 });
        });
      } else {
        Animated.spring(cardposition, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      }
    },
    onPanResponderTerminate: (evt, gestureState) => {
      // Another component has become the responder, so this gesture
      // should be cancelled
    },
    onShouldBlockNativeResponder: (evt, gestureState) => {
      // Returns whether this component should block native components from becoming the JS
      // responder. Returns true by default. Is currently only supported on android.
      return true;
    },
  });

  return (
    <Animated.View style={feedview.getLayout()} {...panResponder.panHandlers}>
      {/* <Animated.Text
        style={{
          fontSize: 30,
          color: "#379AF7",
          position: "absolute",
          zIndex: 100,
          top: 20,
          left: 200,
          transform: [{ rotate: refreshrotate }, { scale: refreshscale }],
        }}
      >
        ⟳
      </Animated.Text> */}
      {feeds
        .map((feed, index) => {
          if (index === currentIndex - 1) {
            return (
              <Animated.View
                key={feed.id}
                style={swipedcardposition.getLayout()}
                {...panResponder.panHandlers}
              >
                <View
                  style={{
                    flex: 1,
                    position: "absolute",
                    height: SCREEN_HEIGHT,
                    width: SCREEN_WIDTH,
                    backgroundColor: "white",
                  }}
                >
                  <View style={{ flex: 2 }}>
                    <Image source={feed.uri} style={{ flex: 1 }} />
                  </View>
                  <View style={{ flex: 3, padding: 5 }}>
                    <Text>
                      {feed.id} Lorem Ipsum is simply dummy text of the printing
                      and typesetting industry. Lorem Ipsum has been the
                      industry's standard dummy text ever since the 1500s, when
                      an unknown printer took a galley of type and scrambled it
                      to make a type specimen book. It has survived not only
                      five centuries, but also the leap into electronic
                      typesetting, remaining essentially unchanged. It was
                      popularised in the 1960s with the release of Letraset
                      sheets containing Lorem Ipsum passages, and more recently
                      with desktop publishing software like Aldus PageMaker
                      including versions of Lorem Ipsum. Lorem Ipsum is simply
                      dummy text of the printing and typesetting industry. Lorem
                      Ipsum has been the industry's standard dummy text ever
                      since the 1500s, when an unknown printer took a galley of
                      type and scrambled it to make a type specimen book. It has
                      survived not only five centuries, but also the leap into
                      electronic typesetting, remaining essentially unchanged.
                      It was popularised in the {feed.id}
                    </Text>
                  </View>
                </View>
              </Animated.View>
            );
          } else if (index < currentIndex) return null;
          if (index === currentIndex) {
            return (
              <Animated.View
                key={feed.id}
                style={cardposition.getLayout()}
                {...panResponder.panHandlers}
              >
                <View
                  style={{
                    flex: 1,
                    position: "absolute",
                    height: SCREEN_HEIGHT,
                    width: SCREEN_WIDTH,
                    backgroundColor: "white",
                  }}
                >
                  <View style={{ flex: 2 }}>
                    <Image source={feed.uri} style={{ flex: 1 }} />
                  </View>
                  <View style={{ flex: 3, padding: 5 }}>
                    <Text>
                      {feed.id} Lorem Ipsum is simply dummy text of the printing
                      and typesetting industry. Lorem Ipsum has been the
                      industry's standard dummy text ever since the 1500s, when
                      an unknown printer took a galley of type and scrambled it
                      to make a type specimen book. It has survived not only
                      five centuries, but also the leap into electronic
                      typesetting, remaining essentially unchanged. It was
                      popularised in the 1960s with the release of Letraset
                      sheets containing Lorem Ipsum passages, and more recently
                      with desktop publishing software like Aldus PageMaker
                      including versions of Lorem Ipsum. Lorem Ipsum is simply
                      dummy text of the printing and typesetting industry. Lorem
                      Ipsum has been the industry's standard dummy text ever
                      since the 1500s, when an unknown printer took a galley of
                      type and scrambled it to make a type specimen book. It has
                      survived not only five centuries, but also the leap into
                      electronic typesetting, remaining essentially unchanged.
                      It was popularised in the {feed.id}
                    </Text>
                  </View>
                </View>
              </Animated.View>
            );
          } else {
            return (
              <Animated.View key={feed.id}>
                <View
                  style={{
                    flex: 1,
                    position: "absolute",
                    height: SCREEN_HEIGHT,
                    width: SCREEN_WIDTH,
                    backgroundColor: "white",
                  }}
                >
                  <View style={{ flex: 2 }}>
                    <Image source={feed.uri} style={{ flex: 1 }} />
                  </View>
                  <View style={{ flex: 3, padding: 5 }}>
                    <Text>
                      {feed.id} Lorem Ipsum is simply dummy text of the printing
                      and typesetting industry. Lorem Ipsum has been the
                      industry's standard dummy text ever since the 1500s, when
                      an unknown printer took a galley of type and scrambled it
                      to make a type specimen book. It has survived not only
                      five centuries, but also the leap into electronic
                      typesetting, remaining essentially unchanged. It was
                      popularised in the 1960s with the release of Letraset
                      sheets containing Lorem Ipsum passages, and more recently
                      with desktop publishing software like Aldus PageMaker
                      including versions of Lorem Ipsum. Lorem Ipsum is simply
                      dummy text of the printing and typesetting industry. Lorem
                      Ipsum has been the industry's standard dummy text ever
                      since the 1500s, when an unknown printer took a galley of
                      type and scrambled it to make a type specimen book. It has
                      survived not only five centuries, but also the leap into
                      electronic typesetting, remaining essentially unchanged.
                      It was popularised in the {feed.id}
                    </Text>
                  </View>
                </View>
              </Animated.View>
            );
          }
        })
        .reverse()}
    </Animated.View>
  );
};

export default MyFeedScreen;
