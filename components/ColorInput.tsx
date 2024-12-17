import React, { useState } from "react";

import {
  KeyboardAvoidingView,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import ColorPicker, {
  Panel2,
  OpacitySlider,
  colorKit,
  BrightnessSlider,
  InputWidget,
} from "reanimated-color-picker";

import type { returnedResults } from "reanimated-color-picker";

interface Props {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
}

const ColorInput: React.FC<Props> = ({ color, setColor }) => {
  const [showModal, setShowModal] = useState(false);

  const selectedColor = useSharedValue(color);

  const backgroundColorStyle = useAnimatedStyle(() => ({
    backgroundColor: selectedColor.value,
  }));

  const onColorSelect = (color: returnedResults) => {
    "worklet";
    selectedColor.value = color.hex;
  };

  return (
    <>
      <Pressable
        style={{
          width: 120,
          borderRadius: 20,
          padding: 4,
          margin: 10,
          backgroundColor: color,
        }}
        onPress={() => setShowModal(true)}
      >
        <Text style={{ textAlign: "center" }}>{color}</Text>
      </Pressable>

      <Modal
        onRequestClose={() => setShowModal(false)}
        visible={showModal}
        animationType="slide"
      >
        <Animated.View style={[styles.container, backgroundColorStyle]}>
          <KeyboardAvoidingView behavior="position">
            <View style={styles.pickerContainer}>
              <ColorPicker
                value={selectedColor.value}
                sliderThickness={25}
                thumbSize={30}
                thumbShape="rect"
                onChange={onColorSelect}
              >
                <Panel2
                  style={styles.panelStyle}
                  thumbShape="ring"
                  reverseVerticalChannel
                />

                <BrightnessSlider style={styles.sliderStyle} />

                <OpacitySlider style={styles.sliderStyle} />

                <View style={styles.previewTxtContainer}>
                  <InputWidget
                    inputStyle={{
                      color: "#fff",
                      paddingVertical: 2,
                      borderColor: "#707070",
                      fontSize: 12,
                      marginLeft: 5,
                    }}
                    iconColor="#707070"
                  />
                </View>
              </ColorPicker>
            </View>
          </KeyboardAvoidingView>

          <Pressable
            style={styles.closeButton}
            onPress={() => {
              setColor(selectedColor.value);
              setShowModal(false);
            }}
          >
            <Text style={{ color: "#707070", fontWeight: "bold" }}>Close</Text>
          </Pressable>
        </Animated.View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  pickerContainer: {
    alignSelf: "center",
    width: 300,
    backgroundColor: "#202124",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  panelStyle: {
    borderRadius: 16,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  sliderStyle: {
    borderRadius: 20,
    marginTop: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  previewTxtContainer: {
    paddingTop: 20,
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: "#bebdbe",
  },
  closeButton: {
    margin: 32,
    borderRadius: 20,
    paddingHorizontal: 40,
    paddingVertical: 10,
    alignSelf: "center",
    backgroundColor: "#fff",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default ColorInput;
