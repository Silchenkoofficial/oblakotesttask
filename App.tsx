import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, Text, View } from 'react-native';
import { FAB, Appbar, TextInput, List, Checkbox } from 'react-native-paper';
import Axios from 'axios';
import {ListItem} from './components';

export default function App() {

  Axios.defaults.baseURL = 'http://mobile-dev.oblakogroup.ru/candidate/NikitaSilchenko';
  Axios.defaults.headers.common['Authorization'] = 'JWT_TOKEN_HERE';
  Axios.defaults.headers.post['Content-Type'] = 'application/json';
  Axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

  const [lists, setLists] = useState([]);
  const [checked, setChecked] = useState(false);
  
  const fetchData = async () => {
    const response = await Axios.get('http://mobile-dev.oblakogroup.ru/candidate/NikitaSilchenko/list');

    console.log(response.data);
    setLists(response.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        {/* <Appbar.BackAction onPress={_goBack} /> */}
        <Appbar.Content title="Задачи" />
        <Appbar.Action icon="cube-outline" />
      </Appbar.Header>

      <List.Section>
          {
            !lists ? <Text>Loading...</Text> : 
            lists.map((listItem: Array, index: Number) => (
              <>
                <List.Subheader key={index}>{listItem.title}</List.Subheader>
                {
                  listItem.todos.map((todoItem: Object, index: Number) => (
                    <ListItem title={todoItem.text}/>
                  ))
                }
              </>
            ))
          }
      </List.Section>

      <FAB 
      style={styles.fab}
      icon="plus"
      onPress={() => console.log('OK')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  header: {
    backgroundColor: '#fff'
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#135FD2',
  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },
  checkbox: {
    
  }
});
