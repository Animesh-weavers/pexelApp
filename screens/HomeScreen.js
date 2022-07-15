import { View, Text, Button } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../store/auth-context";

const HomeScreen = () => {
  const authCtx = useContext(AuthContext);
  const logoutHandler = () => {
    authCtx.logout();
    console.log("logout");
  };
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button title="Logout" onPress={logoutHandler} />
    </View>
  );
};

export default HomeScreen;
