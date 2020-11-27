import React, {useState, useEffect} from 'react';
import { View, Text, ScrollView, RefreshControl, StyleSheet } from 'react-native';
import Axios from 'axios';

import {Appbar, List, FAB} from 'react-native-paper';
import { ListItem } from '../components';

const Home = ({navigation, route}) => {

    Axios.defaults.baseURL =
      "http://mobile-dev.oblakogroup.ru/candidate/NikitaSilchenko";
    Axios.defaults.headers.common["Authorization"] = "JWT_TOKEN_HERE";
    Axios.defaults.headers.post["Content-Type"] = "application/json";
    Axios.defaults.headers.get["Access-Control-Allow-Origin"] = "*";
    
    const [refreshing, setRefreshing] = React.useState(false);
    const [lists, setLists] = useState([]);

    const fetchData = async () =>
      await Axios.get("/list").then(response => setLists(response.data));
    const updateTodoItem = async (listId: number, todoId: number, val: boolean) => await Axios.patch(`/list/${listId}/todo/${todoId}`, {checked: val}).then(() => fetchData());
    const addNewTask = async (listId: number, body: object) => await Axios.post(`/list/${listId}/todo`, body);
    const deleteTodoItem = async (listId: number, todoId: number) =>
      await Axios.delete(`/list/${listId}/todo/${todoId}`).then(() =>
        fetchData()
      );

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      fetchData().then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
      fetchData();
      if (route.params.newTaskText) {
        addNewTask(route.params.listIdTask, {
          checked: false,
          list_id: route.params.listIdTask,
          text: route.params.newTaskText
        });
      } else {
        console.log("oops");
      }
    }, [route.params.newTaskText]);

    return (
      <View
        style={{
          backgroundColor: "#ffffff",
          height: "100%"
        }}
      >
        {/* <Appbar.Header style={styles.header}>
          <Appbar.BackAction />
          <Appbar.Content title="Задачи" />
          <Appbar.Action icon="cube-outline" />
        </Appbar.Header> */}
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {!lists ? (
            <View style={styles.loading}>
              <Text>Loading...</Text>
            </View>
          ) : (
            lists.map((listItem: any, index: number) => (
              <List.Section key={index}>
                <List.Subheader key={index}>{listItem.title}</List.Subheader>
                {listItem.todos.map(
                  (todoItem: any, index: number) =>
                    !todoItem.checked && (
                      <ListItem
                        key={index}
                        title={todoItem.text + ' ' + route.params.newTaskText}
                        onChecked={updateTodoItem}
                        listId={listItem.id}
                        todoId={todoItem.id}
                        checked={todoItem.checked}
                        deleteTodoItem={deleteTodoItem}
                      />
                    )
                )}
                <List.Accordion title="Завершенные">
                  {listItem.todos.map(
                    (todoItem: any, index: number) =>
                      todoItem.checked && (
                        <ListItem
                          key={index}
                          title={todoItem.text}
                          listId={listItem.id}
                          todoId={todoItem.id}
                          onChecked={updateTodoItem}
                          checked={todoItem.checked}
                          deleteTodoItem={deleteTodoItem}
                        />
                      )
                  )}
                </List.Accordion>
              </List.Section>
            ))
          )}
        </ScrollView>
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() =>
            navigation.navigate("Добавить задачу", {
              data: lists
            })
          }
        />
      </View>
    );
}

export default Home;

const styles = StyleSheet.create({
  loading: {
    width: "100%",
    height: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    backgroundColor: "#fff"
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#135FD2"
  },
});