import {
  Alert,
  Modal,
  TouchableOpacity,
  View,
  Text,
  TextInput,
} from "react-native";
import ColorInput from "./ColorInput";

interface Props {
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  emoji: string;
  setEmoji: React.Dispatch<React.SetStateAction<string>>;
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}

const EditProfile: React.FC<Props> = ({
  editMode,
  setEditMode,
  emoji,
  setEmoji,
  color,
  setColor,
  username,
  setUsername,
}) => {
  return (
    <Modal
      animationType="slide"
      visible={editMode}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setEditMode(!editMode);
      }}
    >
      <View
        style={{
          height: "100%",
          backgroundColor: "#1a1a1a",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ color: "#f1f1f1", fontSize: 16 }}>Select Emoji:</Text>
          <TextInput
            keyboardType="default"
            value={emoji}
            onFocus={() => setEmoji("")}
            onChangeText={setEmoji}
            style={{
              //   height: 40,
              textAlign: "center",
              margin: 12,
              width: 120,
              backgroundColor: "#f1f1f1",
              borderWidth: 2,
              borderRadius: 100,
              padding: 4,
            }}
          />
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ color: "#f1f1f1", fontSize: 16 }}>Select Color:</Text>
          <ColorInput color={color} setColor={setColor} />
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ color: "#f1f1f1", fontSize: 16 }}>
            Select Username:
          </Text>
          <TextInput
            keyboardType="default"
            value={username}
            onChangeText={setUsername}
            style={{
              //   height: 40,
              textAlign: "center",
              margin: 12,
              width: 120,
              backgroundColor: "#f1f1f1",
              borderWidth: 2,
              borderRadius: 100,
              padding: 4,
            }}
          />
        </View>
        <TouchableOpacity onPress={() => setEditMode(!editMode)}>
          <Text
            style={{
              margin: 16,
              fontSize: 20,
              paddingHorizontal: 32,
              paddingVertical: 4,
              borderRadius: 32,
              color: "#1a1a1a",
              backgroundColor: "#88DDFF",
            }}
          >
            UPDATE
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default EditProfile;
