import React, {useState} from 'react'
import { View, Text, StyleSheet } from 'react-native';
import {List, Checkbox} from 'react-native-paper';

export default function ListItem({title}) {

    const [checked, setChecked] = useState(false);

    return (
        <List.Item
            title={title}
            onPress={() => setChecked(!checked)}
            left={() => <Checkbox
                status={checked ? 'checked' : 'unchecked'}
                color="#135FD2" />
            } />
    )
}

const styles = StyleSheet.create({
    checkbox: {
      
    }
  });
  