import EditProfile from "@/components/EditProfile";
import { useState } from "react";
import { View, Text, TouchableOpacity, Modal, Alert } from "react-native";
import Svg, { Path } from "react-native-svg";

export default function SettingsScreen() {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [emoji, setEmoji] = useState<string>("👀");
  const [color, setColor] = useState<string>("#f1f1f1");
  const [username, setUsername] = useState<string>("lucidmach");

  return (
    <View
      style={{
        height: "100%",
        justifyContent: "center",
        backgroundColor: "#1a1a1a",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        style={{ zIndex: 1 }}
        // onPress={() => setEmoji(emoji == "👀" ? "😁" : "👀")}
        onPress={() => setEditMode((mode) => !mode)}
      >
        <View
          style={{
            left: 128 / 2,
            top: 128 / 3,
            height: (128 * 3) / 10,
            width: (128 * 3) / 10,
            padding: 10,
            borderRadius: 128,
            backgroundColor: "#5CE4C7",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Svg fill="#000" viewBox="0 0 24 24">
            <Path d="m4.481 15.659c-1.334 3.916-1.48 4.232-1.48 4.587 0 .528.46.749.749.749.352 0 .668-.137 4.574-1.492zm1.06-1.061 3.846 3.846 11.321-11.311c.195-.195.293-.45.293-.707 0-.255-.098-.51-.293-.706-.692-.691-1.742-1.74-2.435-2.432-.195-.195-.451-.293-.707-.293-.254 0-.51.098-.706.293z" />
          </Svg>
        </View>
      </TouchableOpacity>
      <View
        style={{
          height: (128 * 3) / 2,
          width: (128 * 3) / 2,
          borderWidth: 2,
          borderRadius: 128,
          backgroundColor: color + "F1",
          borderColor: color,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color, fontSize: 80 }}>{emoji}</Text>
      </View>
      <Text style={{ color: "#f1f1f1", fontSize: 24, margin: 24 }}>
        {username}
      </Text>
      {editMode ? (
        <EditProfile
          editMode
          setEmoji={setEmoji}
          emoji={emoji}
          setEditMode={setEditMode}
          color={color}
          setColor={setColor}
          username={username}
          setUsername={setUsername}
        />
      ) : null}
    </View>
  );
}
