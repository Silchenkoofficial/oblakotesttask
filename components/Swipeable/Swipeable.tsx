import React, { Component } from "react";
import { Animated, StyleSheet, Text, View, I18nManager } from "react-native";
import { IconButton } from "react-native-paper";

import { RectButton } from "react-native-gesture-handler";
import Swipeable from 'react-native-gesture-handler/Swipeable';

export default class AppleStyleSwipeableRow extends Component {
renderLeftActions = (progress, dragX) => {
const trans = dragX.interpolate({
    inputRange: [0, 50, 100, 101],
    outputRange: [-20, 0, 0, 1]
});
return (
    <RectButton style={styles.leftAction} onPress={this.close}>
    <Animated.Text style={[styles.actionText]}>
        Archive
    </Animated.Text>
    </RectButton>
);
};
renderRightAction = (text, color, x, progress) => {
const trans = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [x, 0]
});
const pressHandler = () => {
  this.close();
  this.props.deleteTodoItem();
};
return (
    <Animated.View
    style={{ flex: 1, transform: [{ translateX: 0 }] }}
    >
    <RectButton
        style={[
        styles.rightAction,
        { backgroundColor: color }
        ]}
        onPress={pressHandler}
    >
        <Text style={styles.actionText}>{text}</Text>
    </RectButton>
    </Animated.View>
);
};
renderRightActions = progress => (
<View
    style={{
    width: 60,
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row"
    }}
>
    {this.renderRightAction(
    <IconButton
        icon="delete-forever-outline"
        color="red"
        size={30}
    />,
    "#fff",
    0,
    progress
    )}
</View>
);
updateRef = ref => {
this._swipeableRow = ref;
};
close = () => {
this._swipeableRow.close();
};
render() {
const { children } = this.props;
return (
  <Swipeable
    ref={this.updateRef}
    friction={2}
    leftThreshold={40}
    rightThreshold={40}
    renderLeftActions={this.renderLeftActions}
    renderRightActions={this.renderRightActions}
  >
    {children}
  </Swipeable>
);
}
}

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    backgroundColor: "#497AFC",
    borderColor: "#e5e5e5",
    borderLeftWidth: 1
    // justifyContent: "center"
  },
  actionText: {
    // color: "white",
    // fontSize: 16,
    // backgroundColor: "transparent",
    // padding: 10
  },
  rightAction: {
    borderColor: "#e5e5e5",
    borderLeftWidth: 1
    //   flex: 1,
    // alignItems: "center",
    // justifyContent: "center"
  }
});
