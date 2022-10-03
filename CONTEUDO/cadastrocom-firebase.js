import { findRelativeConfig } from "@babel/core/lib/config/files";
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
import Listagem from "./src/pages/Listagem";

console.disableYellowBox = true;

export default function App() {
  const [nome, setNome] = useState("");
  const [cargo, setCargo] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [loadging, setLoading] = useState(true);

  async function cadatrar() {
    if (nome !== "" || cargo !== "") {
      let usuarios = await firebase.database().ref("usuarios");
      let chave = usuarios.push().key;

      usuarios.child(chave).set({
        nome: nome,
        cargo: cargo,
      });
      alert("Cadastrado");
      setCargo("");
      setNome("");
    }
  }

  useEffect(() => {
    async function dados() {
      await firebase
        .database()
        .ref("usuarios")
        .on("value", (snapshot) => {
          setUsuarios([]);
          snapshot.forEach((childItem) => {
            let data = {
              key: childItem.key,
              nome: childItem.val().nome,
              cargo: childItem.val().cargo,
            };
            setUsuarios((oldArray) => [...oldArray, data].reverse());
          });
          setLoading(false);
        });
    }
    dados();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.textoInf}>Nome:</Text>

      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        onChangeText={(texto) => setNome(texto)}
        placeholder="Nome"
        value={nome}
      />

      <Text style={styles.textoInf}>Cargo:</Text>

      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        onChangeText={(texto) => setCargo(texto)}
        placeholder="Cargo"
        value={cargo}
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
      {loadging ? (
        <ActivityIndicator color="#121212" size={50} />
      ) : (
        <FlatList
          keyExtractor={(item) => item.key}
          data={usuarios}
          renderItem={({ item }) => <Listagem data={item} />}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#a9f1e8",
  },

  textoInf: {
    color: "#000",
    fontSize: 20,
    marginLeft: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#a5b0b3",
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    width: "70%",
    fontSize: 18,
  },
  button: {
    borderWidth: 1,
    borderColor: "#000",
    alignItems: "center",
  },
});
