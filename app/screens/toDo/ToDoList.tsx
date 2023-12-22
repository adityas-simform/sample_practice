import { View, Text, FlatList } from "react-native";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import styles from "./TodoStyle";

export interface ToDoListprops {
  todoList: any;
  onCrossPress: (id: string) => void;
}

interface TodoItem {
  text: string;
  id: string;
}

const ToDoList = forwardRef((props: ToDoListprops, ref) => {
  const flatListRef = useRef<FlatList | null>(null);

  useImperativeHandle(ref, () => ({
    scrollToBottom: () => {
      flatListRef?.current?.scrollToEnd();
    },
  }));

  const renderItem = ({ item }: { item: TodoItem }) => {
    return (
      <View style={styles.listItem}>
        <Text>{item.text}</Text>
        <Text onPress={() => props?.onCrossPress(item.id)} style={styles.cross}>
          Delete
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
