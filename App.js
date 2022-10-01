import React, {useState, useEffect}  from "react";
import { StyleSheet, Text, View } from "react-native";

import
export default function App() {

  const [nome, setNome] = useState("Carregando...")

  return (
    <View style={styles.container}>
      <Text>{nome}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
