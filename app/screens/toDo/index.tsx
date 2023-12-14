import React, { useState } from "react";
import { Text, View, TextInput, Pressable, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import styles from "./todoStyles";
import { addTodo, removeTodo } from "../../redux/todoSlice";

export const ToDo = () => {
  const [todoVal, setTodoVal] = useState("");
  const todoList = useSelector((state: RootState) => state.todo.todoList);
  const dispatch = useDispatch();

  const onAddPress = () => {
    if (todoVal !== "") {
      dispatch(addTodo(todoVal));
      setTodoVal("");
    }
  };

  const onCrossPress = (id: string) => {
    dispatch(removeTodo(id));
  };

  const renderItem = ({ item }: any) => {
    return (
      <View style={styles.listItem}>
        <Text>{item.text}</Text>
        <Text onPress={() => onCrossPress(item.id)} style={styles.cross}>
          X
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text> TODO LIST </Text>
      <TextInput
        style={styles.txtInput}
        placeholder="Enter your todo....."
        placeholderTextColor="grey"
        value={todoVal}
        onChangeText={(txt) => setTodoVal(txt)}
      />
      <Pressable onPress={() => onAddPress()} style={styles.addBtnStyle}>
        <Text style={styles.add}>ADD</Text>
      </Pressable>
      <FlatList
        style={styles.flatlist}
        data={todoList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default ToDo;
