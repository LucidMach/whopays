import { foreground } from "@/constants/colors";
import { Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View
      style={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: foreground, margin: 20, fontSize: 64 }}>💸</Text>
    </View>
  );
}
