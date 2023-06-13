import {
  View,
  TextInput,
  StyleSheet,
  ImageBackground,
  Image,
  Alert,
  Text,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../Components/Config";

export default function Login({ navigation }) {
  const [correo, setcorreo] = useState("");
  const [pass, setpass] = useState("");

  function login() {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, correo, pass)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        navigation.navigate("Juego");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === "auth/wrong-password") {
          Alert.alert("Error", "Verifique las credenciales");
        } else {
          Alert.alert("Error");
        }
        console.log(errorCode);
      });

    limpiar();
  }

  function limpiar() {
    setcorreo("");
    setpass("");
  }

  function registrar() {
    navigation.navigate("Registro");
  }

  return (
    <View style={styles.principal}>
      <ImageBackground
        source={require("../assets/images/Stage01.png")}
        style={styles.img}
      >
        <StatusBar style="auto" />

        <Image
          source={require("../assets/images/title.png")}
          style={styles.logo}
        />

        <TextInput
          style={styles.inputs}
          placeholder="Ingrese login"
          keyboardType="email-address"
          multiline={true}
          borderBottomColor="red"
          borderBottomWidth={2}
          onChangeText={(text) => setcorreo(text)}
          value={correo}
        />
        <TextInput
          style={styles.inputs}
          placeholder="Ingrese contraseña"
          multiline={true}
          borderBottomColor="red"
          borderBottomWidth={2}
          onChangeText={(text) => setpass(text)}
          value={pass}
        />

        <TouchableOpacity style={styles.btn} onPress={() => login()}>
          <Text style={styles.txt}>Iniciar Sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn1} onPress={() => registrar()}>
          <Text style={styles.txt} >Nuevo Registro</Text>
        </TouchableOpacity>
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
    justifyContent: "center",
  },
  logo: {
    width: 400,
    height: 100,
    resizeMode: "stretch",
    marginBottom: 50,
  },
  inputs: {
    width: 300,
    textAlign: "center",
    marginBottom: 50,
    fontWeight: 'bold',
    fontSize: 16,
   
  },
  btn: {
    alignItems: "center",
    backgroundColor: "#19CA0C",
    padding: 10,
    marginBottom: 30,
    width: 140,
  },
  btn1: {
    alignItems: "center",
    backgroundColor: "#A24100",
    padding: 10,
    marginBottom: 30,
    width: 140,
  },
  txt:{
    fontStyle:"italic",
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
 
  }
});
