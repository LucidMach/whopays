import {
  Alert,
  Modal,
  TouchableOpacity,
  View,
  Text,
  TextInput,
} from "react-native";
import ColorInput from "./ColorInput";
import { background, foreground, primary } from "@/constants/colors";

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
          backgroundColor: background,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ color: foreground, fontSize: 16 }}>select emoji:</Text>
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
              backgroundColor: foreground,
              borderWidth: 2,
              borderRadius: 100,
              padding: 4,
            }}
          />
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ color: foreground, fontSize: 16 }}>select color:</Text>
          <ColorInput color={color} setColor={setColor} />
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ color: foreground, fontSize: 16 }}>
            select username:
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
              backgroundColor: foreground,
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
              color: background,
              backgroundColor: primary,
            }}
          >
            update
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default EditProfile;
