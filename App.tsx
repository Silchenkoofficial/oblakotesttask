import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, Text, View, ScrollView, RefreshControl } from 'react-native';
import { FAB, Appbar, TextInput, List, IconButton } from 'react-native-paper';
import Axios from 'axios';
import {ListItem} from './components';

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Home, AddTask } from './pages';

const Stack = createStackNavigator();

const fetchData = async () =>
  await Axios.get("/list").then(response => data = response.data);
const updateTodoItem = async (listId: number, todoId: number, val: boolean) =>
  await Axios.patch(`/list/${listId}/todo/${todoId}`, {
    checked: val
  }).then(() => fetchData());
const deleteTodoItem = async (listId: number, todoId: number) =>
  await Axios.delete(`/list/${listId}/todo/${todoId}`).then(() => fetchData());

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Задачи"
        component={Home}
        options={{
          headerRight: () => <IconButton icon="cube-outline" />
        }}
      />
      <Stack.Screen
        name="Добавить задачу"
        component={AddTask}
      />
    </Stack.Navigator>
  );
};

export default function App() {

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  test: {
    backgroundColor: '#000'
  }
});
