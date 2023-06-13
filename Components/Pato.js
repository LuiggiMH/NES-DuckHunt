import React, { useState } from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function Pato() {
  const [posicion, setposicion] = useState({ x: 0, y: 0 });

  function moverPato() {
    const MAX_X = 350;
    const MAX_Y = 700;

    const randomX = Math.floor(Math.random() * MAX_X);
    const randomY = Math.floor(Math.random() * MAX_Y);

    setposicion({ x: randomX, y: randomY });
  }

  return (
    <View style={{ top: posicion.y, left: posicion.x, position:"absolute" }}>
      <TouchableOpacity onPress={() => moverPato()}>
        <Image
          source={require("../assets/images/duck.png")}
          style={styles.img}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    width: 100,
    height: 100,
  },
  
});
