import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "./LoginStyle";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const { formik } = useLogin();
  const { values, handleChange, handleSubmit, errors } = formik;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Eamil"
        onChangeText={handleChange("email")}
        value={values.email}
      />
      <Text>{errors.email}</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={handleChange("password")}
        value={values.password}
      />
      <Text>{errors.password}</Text>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
