import {
  View,
  Text,
  Alert,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useSyncExternalStore } from "react";

import { getAuth, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../Components/Config";
import Pato from "../Components/Pato";

export default function Juego({ navigation }) {
  const [tiempo, settiempo] = useState(10);

  useEffect(() => {
    //   const temporizador = setInterval(() => {
    //     settiempo((tiempoAnterior) => tiempoAnterior - 1);
    //   }, 1000);

    const temporizador = setInterval(() => {
      settiempo((tiempoAnterior) => {
        if (tiempoAnterior == 1) {
          clearInterval(temporizador);
        }
        return tiempoAnterior - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    if (tiempo == 0) {
      Alert.alert("Game Over", "Su puntación es: ");
      settiempo(10);
    }
  }, [tiempo]);

  function logout() {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    signOut(auth)
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => {
        Alert.alert("Error");
      });
  }

  return (
    <View style={styles.principal}>
      <ImageBackground
        source={require("../assets/images/Stage01.png")}
        style={styles.img}
      >
        <TouchableOpacity style={styles.btn} onPress={() => logout()}>
          <Text style={styles.txt}>Exit</Text>
        </TouchableOpacity>

        <Text style={styles.tmp}>{tiempo}</Text>

        <Pato></Pato>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  principal: {
    flex: 1,
  },
  img: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
  },
  btn: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    width: 70,
    alignSelf: "flex-end",
    marginTop:30,
  },
  txt: {
    fontStyle: "italic",
    color: "skyblue",
    fontWeight: "bold",
    fontSize: 16
  },
  tmp: {
    color: "white",
    fontWeight: "bold",
    fontSize: 32,
  },
});
