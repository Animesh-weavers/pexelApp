import { View, Image, StyleSheet } from "react-native";
import React from "react";

const LoaderScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/loading.gif")} />
    </View>
  );
};

export default LoaderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#212f3ce0",
  },
});
