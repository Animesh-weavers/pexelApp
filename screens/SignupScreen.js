import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const SignupScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateHandler = () => {
    navigation.navigate("Signin");
  };
  const submitHandler = () => {
    if (email !== "" && password !== "") {
      let headersList = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      let bodyContent = {
        email: email,
        password: password,
        returnSecureToken: "true",
      };

      let reqOptions = {
        url: "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBmunXZi1nkmO5Q_wEp2RefQpFRD_pJl1o",
        method: "POST",
        headers: headersList,
        data: bodyContent,
      };

      axios(reqOptions)
        .then((res) => {
          console.log(res.data.idToken);
        })
        .catch((error) => {
          // console.log(error);
        });
      setEmail("");
      setPassword("");
    } else {
      if (email === "" && password === "") {
        alert("Enter your credentials...");
      }
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Pexel</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.emailContainer}>
            <TextInput
              placeholder="Email"
              style={styles.input}
              value={email}
              onChangeText={(e) => setEmail(e)}
            />
          </View>
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Password"
              secureTextEntry={true}
              style={styles.input}
              value={password}
              onChangeText={(e) => setPassword(e)}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            style={({ pressed }) => [styles.btn, pressed && styles.pressable]}
            onPress={submitHandler}
          >
            <Text style={styles.btnText}>Signup</Text>
          </Pressable>
        </View>
        <View style={styles.navigateContainer}>
          <Text style={styles.navigateText} onPress={navigateHandler}>
            Have an accout?
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212f3ce0",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#212F3C",
    width: "85%",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 35,

    paddingBottom: 30,
  },
  titleContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
  form: {
    marginBottom: 15,
  },
  emailContainer: {
    marginBottom: 11,
  },
  passwordContainer: {
    marginBottom: 12,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 30,
    paddingLeft: 20,
    color: "black",
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    backgroundColor: "grey",
    width: 125,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 30,
  },
  btnText: {
    color: "white",
    fontSize: 18,
  },
  pressable: {
    opacity: 0.8,
  },
  navigateContainer: {
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  navigateText: {
    color: "white",
  },
});
