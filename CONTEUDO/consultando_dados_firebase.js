import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";

import firebase from "./src/config/firebaseConnection";

export default function App() {
  const [nome, setNome] = useState("Carregando...");
  const [idade, setIdade] = useState("");

  useEffect(() => {
    async function dados() {
      // await firebase.database().ref("nome").on("value", (snapshot) => {
      //   setNome(snapshot.val());
      // });

      await firebase
        .database()
        .ref("usuarios/2")
        .on("value", (snapshot) => {
          setNome(snapshot.val().nome);
          setIdade(snapshot.val().idade)
        });



 // useEffect(() => {
  //   async function dados() {
      // Cria um nó, tambem atualiza o valor do nó
      // await firebase.database().ref("tipo").set("Cliente");
      // como remover um nó
      // await firebase.database().ref("tipo").remove()
      // como criar filhas em um nó
      // await firebase.database().ref('usuarios').child(2).set({
      //   nome: 'Vih',
      //   cargo:'dev'
      // })
      // como atualizar uma filha de uma nó
      // await firebase.database().ref('usuarios').child(2).update({
      //   nome:'Karol'
      // })
  //   }
  //   dados();
  // }, []);


    }
    dados();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Olá {nome} Idade: {idade}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    margin: 30,
  },
});


