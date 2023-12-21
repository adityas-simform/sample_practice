import React, { useRef, useState } from "react";
import { Text, View, TextInput, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import styles from "./TodoStyle";
import { addTodo, removeTodo } from "../../redux/TodoSlice";
import ToDoList from "./ToDoList";

export const ToDo = () => {
  const [todoVal, setTodoVal] = useState("");
  const todoListRef = useRef();
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

  const onScrollBottomPress = () => {
    todoListRef?.current?.scrollToBottom();
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
      <Pressable
        onPress={() => onScrollBottomPress()}
        style={styles.addBtnStyle}
      >
        <Text style={styles.add}>Scroll To Bottom</Text>
      </Pressable>
      <ToDoList
        onCrossPress={(id: string) => onCrossPress(id)}
        ref={todoListRef}
        todoList={todoList}
      />
    </View>
  );
};

export default ToDo;
