import React, {useState} from 'react';
import Axios from 'axios';
import { View, Text, StyleSheet, CheckBox } from 'react-native';
import {List, Checkbox} from 'react-native-paper';
import Swipeable from '../Swipeable/Swipeable';

export default function ListItem({todoId, listId, onChecked, title, checked, deleteTodoItem}: any) {
  const [isChecked, setIsChecked] = useState(checked);

  return (
      <Swipeable deleteTodoItem={() => deleteTodoItem(listId, todoId)}>
        <List.Item
          style={styles.listItem}
          checked={isChecked}
          title={title}
          onPress={() => {
            setIsChecked(!isChecked);
            onChecked(listId, todoId, !isChecked);
          }}
          left={() => (
            <Checkbox
              status={isChecked ? "checked" : "unchecked"}
              color="#135FD2"
            />
          )}
        />
      </Swipeable>
  );
}

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: "#ffffff",
    borderColor: "#e5e5e5",
    borderRightWidth: 1
  }
});