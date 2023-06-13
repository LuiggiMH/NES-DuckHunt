import {
  View,
  TextInput,
  Alert,
  Button,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig, db } from "../Components/Config";
import { ref, set, onValue, remove, getDatabase } from "firebase/database";

export default function Registro({ navigation }) {
  const [correo, setcorreo] = useState("");
  const [pass, setpass] = useState("");
  const [nick, setnick] = useState("");
  const [edad, setedad] = useState("");

  const [datos, setdatos] = useState([]);

  function registrar() {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, correo, pass)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        Alert.alert("Mensaje", "Usuario registrado con éxito");
        navigation.navigate("Juego");
        guardar(correo, nick, edad);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        Alert.alert("Error");
      });
  }

  function guardar(correo, nick, edad) {
    set(ref(db, "jugadores/" + nick), {
      email: correo,
      nick: nick,
      age: edad,
    });
  }

  function leer() {
    const starCountRef = ref(db, "jugadores/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();

      const dataArray = Object.entries(data).map(([key, value]) => ({
        key,
        ...value,
      }));

      setdatos(dataArray);

      console.log(datos);
    });
  }

  function eliminar(id) {
    remove(ref(set(db, "jugadores/" + id)));
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
          placeholder="Ingrese email"
          keyboardType="email-address"
          multiline={true}
          borderBottomColor="lawngreen"
          borderBottomWidth={2}
          onChangeText={(text) => setcorreo(text)}
        />

        <TextInput
          style={styles.inputs}
          placeholder="Ingrese un nick"
          multiline={true}
          borderBottomColor="lawngreen"
          borderBottomWidth={2}
          onChangeText={(text) => setnick(text)}
        />

        <TextInput
          style={styles.inputs}
          placeholder="Ingrese edad"
          multiline={true}
          borderBottomColor="lawngreen"
          borderBottomWidth={2}
          onChangeText={(text) => setedad(text)}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.inputs}
          placeholder="Ingrese contraseña"
          multiline={true}
          borderBottomColor="lawngreen"
          borderBottomWidth={2}
          onChangeText={(text) => setpass(text)}
        />

        <TouchableOpacity style={styles.btn1} onPress={() => registrar()}>
          <Text style={styles.txt}>Registrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={() => leer()}>
          <Text style={styles.txt}>Leer</Text>
        </TouchableOpacity>
      </ImageBackground>
      {/* <FlatList
        data={datos}
        renderItem={({ item }) =>
          <View>
            <Text>{item.nombre}</Text>
            
            <Button title='Eliminar' 
            
            onPress={()=>eliminar(item.key)}
            
            />
          </View>
        }
      /> */}
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
    marginBottom: 40,
  },
  inputs: {
    width: 300,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 50,
  },
  btn: {
    alignItems: "center",
    backgroundColor: "#000",
    padding: 10,
    marginBottom: 30,
    width: 100,
  },
  btn1: {
    alignItems: "center",
    backgroundColor: "#A24100",
    padding: 10,
    marginBottom: 30,
    width: 140,
  },
  txt: {
    fontStyle: "italic",
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
