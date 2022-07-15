import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SigninScreen from "./screens/SigninScreen";
import SignupScreen from "./screens/SignupScreen";
import HomeScreen from "./screens/HomeScreen";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoaderScreen from "./screens/LoaderScreen";

const Stack = createStackNavigator();

const AuthenticatedStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}
    >
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Signin" component={SigninScreen} />
    </Stack.Navigator>
  );
};

const Navigation = () => {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
};

const Root = () => {
  const [isTryingLogin, SetIsTryingLogin] = useState(true);
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        authCtx.authenticate(storedToken);
      }
      SetIsTryingLogin(false);
    };
    fetchToken();
  }, []);

  if (isTryingLogin) {
    return <LoaderScreen />;
  }

  return <Navigation />;
};

const App = () => {
  return (
    <AuthContextProvider>
      <Root />
    </AuthContextProvider>
  );
};
export default App;
