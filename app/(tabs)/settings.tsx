import EditButton from "@/components/EditButton";
import EditProfile from "@/components/EditProfile";
import Profile from "@/components/Profile";
import { background, foreground } from "@/constants/colors";
import { useState } from "react";
import { View, Text } from "react-native";

export default function SettingsScreen() {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [emoji, setEmoji] = useState<string>("👀");
  const [color, setColor] = useState<string>(foreground);
  const [username, setUsername] = useState<string>("lucidmach");

  return (
    <View
      style={{
        height: "100%",
        justifyContent: "center",
        backgroundColor: background,
        alignItems: "center",
      }}
    >
      <EditButton setEditMode={setEditMode} size={128} />
      <Profile color={color} emoji={emoji} size={128} />
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
