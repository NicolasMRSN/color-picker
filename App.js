import { setStatusBarBackgroundColor, StatusBar, setStatusBarTranslucent } from 'expo-status-bar';
import * as Font from "expo-font"
import { useKeepAwake } from "expo-keep-awake";
import { AppLoading } from "expo"

import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { Slider } from "react-native-elements"

const loadFonts = () => {
  return Font.loadAsync({
    TypeWriter: require('./assets/fonts/BohemianTypewriter.ttf'),
  });
};

export default function App() {

  useKeepAwake();

  const [fontsLoaded, setFontsLoaded] = useState(false)

  const [R, setR] = useState(0)
  const [hexaR, setHexaR] = useState("00")

  const [G, setG] = useState(0)
  const [hexaG, setHexaG] = useState("00")

  const [B, setB] = useState(0)
  const [hexaB, setHexaB] = useState("00")
  
  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setFontsLoaded(true)}
      />
    )
  }

  const modifyColor = (color, value) => {
    switch (color) {
      case "R":
        setR(value)
        setHexaR(`${value < 16 ? "0" : ""}${value.toString(16)}`)
        break;
      case "G":
        setG(value)
        setHexaG(`${value < 16 ? "0" : ""}${value.toString(16)}`)
        break;
      case "B":
        setB(value)
        setHexaB(`${value < 16 ? "0" : ""}${value.toString(16)}`)
        break;
    }
    setStatusBarBackgroundColor(`#${hexaR}${hexaG}${hexaB}`, false)
  }
  
  return (
    <View style={{...styles.container,  backgroundColor: `#${hexaR}${hexaG}${hexaB}` }}>
      <View style={styles.hexaContainer}>
        <Text style={styles.hexaText}>{`#${hexaR}${hexaG}${hexaB}`}</Text>
      </View>
      <View style={styles.sliderContainer}>
        <View style={styles.info}>
          <Text style={styles.colorHexa}>{R}</Text>
          <Slider
            orientation={"vertical"}
            step={1}
            maximumValue={255}
            minimumValue={0}
            value={R}
            onValueChange={(value) => modifyColor("R", value)}
            style={styles.slider}
            thumbStyle={styles.thumbStyle}
          />
        </View>
        <View style={styles.info}>
          <Text style={styles.colorHexa}>{G}</Text>
          <Slider
            orientation={"vertical"}
            step={1}
            maximumValue={255}
            minimumValue={0}
            value={G}
            onValueChange={(value) => modifyColor("G", value)}
            style={styles.slider}
            thumbStyle={styles.thumbStyle}
          />
        </View>
        <View style={styles.info}>
          <Text style={styles.colorHexa}>{B}</Text>
          <Slider orientation={"vertical"}
            step={1}
            maximumValue={255}
            minimumValue={0}
            value={B}
            onValueChange={(value) => modifyColor("B", value)}
            style={styles.slider}
            thumbStyle={styles.thumbStyle}
          />
        </View>
      </View>
      <StatusBar style="auto"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hexaContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  hexaText: {
    fontSize: 40,
    fontFamily: "TypeWriter",
    color: "#1c1c1c",
  },
  sliderContainer: {
    flex: 2,
    marginTop: 40,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center"
  },
  info: {
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10
  },
  colorHexa: {
    fontSize: 15,
    color: "#1c1c1c",
    fontFamily: "TypeWriter",
    marginBottom: 15
  },
  slider: {
    width: 50,
    height: "40%",
  },
  thumbStyle: {
    width: 25,
    height: 25,
    borderStyle: "solid",
    borderColor: "rgba(0,0,0,0.08)",
    borderWidth: 1,
    backgroundColor: "white"
  }
});