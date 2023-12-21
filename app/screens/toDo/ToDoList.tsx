import { View, Text, FlatList } from "react-native";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import styles from "./TodoStyle";

interface ToDoListprops {
  todoList: any;
  onCrossPress: (id: string) => void;
}

const ToDoList = forwardRef((props: ToDoListprops, ref) => {
  const flatListRef = useRef(null);

  useImperativeHandle(ref, () => ({
    scrollToBottom: () => {
      flatListRef?.current?.scrollToEnd();
    },
  }));

  const renderItem = ({ item }: any) => {
    return (
      <View style={styles.listItem}>
        <Text>{item.text}</Text>
        <Text onPress={() => props?.onCrossPress(item.id)} style={styles.cross}>
          X
        </Text>
      </View>
    );
  };

  return (
    <FlatList
      ref={flatListRef}
      style={styles.flatlist}
      data={props?.todoList}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
});

export default ToDoList;
