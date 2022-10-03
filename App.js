import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  FlatList,
} from "react-native";
import firebase from "./src/config/firebaseConnection";
console.disableYellowBox = true;

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function cadatrar() {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((value) => {
        alert("Usuario criado: " + value.user.email);
      })
      .catch((error) => {
        if (error.code === "auth/weak-password") {
          alert("Sua senha deve ter pelo menos 6 caracteres");
          return;
        }
        if (error.code === "auth/invalid-email") {
          alert("Email invalido");
          return;
        } else {
          alert("ops algo deu errado");
          return;
        }
      });
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textoInf}>Email:</Text>

      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        onChangeText={(texto) => setEmail(texto)}
        placeholder="Email"
        value={email}
      />

      <Text style={styles.textoInf}>Password:</Text>

      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        onChangeText={(texto) => setPassword(texto)}
        placeholder="Password"
        value={password}
      />
      <TouchableOpacity
        onPress={cadatrar}
        style={[
          styles.input,
          { alignItems: "center", backgroundColor: "#6ef5ff" },
        ]}
      >
        <Text>Cadastrar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#a9f1e8",
    marginTop: "10%",
    justifyContent: "center",
  },

  textoInf: {
    color: "#000",
    fontSize: 20,
    marginLeft: "10%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#a5b0b3",
    marginBottom: 10,
    marginLeft: "10%",
    padding: 10,
    borderRadius: 10,
    width: "80%",
    fontSize: 18,
  },
  button: {
    borderWidth: 1,
    borderColor: "#000",
    alignItems: "center",
  },
});
