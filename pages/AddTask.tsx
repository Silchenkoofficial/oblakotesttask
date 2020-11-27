import React, {useState} from 'react';
import { View, Text } from 'react-native';

import {TextInput, List, RadioButton, IconButton} from 'react-native-paper';

const AddTask = ({navigation, route}) => {
    const lists = route.params.data;
    const addNewTask = route.params.addTask;

    const [newTask, setNewTask] = useState('');
    const [value, setValue] = useState(lists[0].title);
    const [listId, setListId] = useState(lists[0].id);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <IconButton icon='check' onPress={() => navigation.navigate('Задачи', {
                    newTaskText: newTask,
                    listIdTask: listId
                })} />
            )
        });
    }, [navigation]);

    const completeTask = () => {

    }

    return (
      <View
        style={{
          backgroundColor: "#ffffff",
          height: "100%"
        }}
      >
        <TextInput
          label="Название задачи"
          style={{
            backgroundColor: "#fff",
            fontSize: 28
          }}
          value={newTask}
          onChangeText={text => setNewTask(text)}
          mode="flat"
        />

        <List.Section>
          <List.Subheader style={{ textTransform: "uppercase" }}>
            Категория
          </List.Subheader>

          {lists.map((list, index) => (
            <List.Item
                key={index}
              title={list.title}
              onPress={() => {
                  setListId(list.id);
                  setValue(list.title);
              }}
              right={() => (
                <RadioButton
                  value={list.title}
                  status={value === list.title ? "checked" : "unchecked"}
                  onPress={() => {
                      setListId(list.id);
                      setValue(list.title);
                  }}
                />
              )}
            />
          ))}
        </List.Section>
      </View>
    );
}

export default AddTask;
