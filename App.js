import React, { useState, useEffect } from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  FlatList,
  StatusBar,
} from "react-native";
import firebase from "./src/config/firebaseConnection";
console.disableYellowBox = true;

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");

  async function cadatrar() {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((value) => {
        alert("Usuario criado: " + value.user.email);
        setUser(value.user.email);
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

  async function logar() {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((value) => {
        alert("Bem-vindo: " + value.user.email);
        setUser(value.user.email)
      })
      .catch((error) => {
        alert("ops algo deu errado");
        return;
      });
    setEmail("");
    setPassword("");
  }

  async function logout() {
    await firebase.auth().signOut();
    setUser("");
    alert("Saiu");
  }

  return (
    <SafeAreaView
      style={[styles.container, { marginTop: StatusBar.currentHeight }]}
    >
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
      <TouchableOpacity
        onPress={logar}
        style={[
          styles.input,
          { alignItems: "center", backgroundColor: "#6ef5ff" },
        ]}
      >
        <Text>Logar</Text>
      </TouchableOpacity>

      <Text
        style={{ justifyContent: "center", fontSize: 20, textAlign: "center" }}
      >
        {user}
      </Text>

      {user.length > 0 ? (
         <TouchableOpacity
         onPress={logout}
         style={[
           styles.input,
           { alignItems: "center", backgroundColor: "#6ef5ff" },
         ]}
       >
         <Text>Sair</Text>
       </TouchableOpacity>
       ):(<Text style={{textAlign:"center"}}>Nenhum usuario logado</Text>)}
     
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#a9f1e8",
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
