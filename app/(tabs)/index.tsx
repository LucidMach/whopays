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
      <Text style={{ color: "#f1f1f1", margin: 20, fontSize: 64 }}>💸</Text>
    </View>
  );
}
