import { View, Text } from "react-native";

interface Props {
  size: number;
  color: string;
  emoji: string;
}
const Profile: React.FC<Props> = ({ size, color, emoji }) => {
  const fontSize = (size / 8) * 5;

  return (
    <View
      style={{
        height: (size * 3) / 2,
        width: (size * 3) / 2,
        borderWidth: 2,
        borderRadius: size,
        backgroundColor: color + "F1",
        borderColor: color,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color, fontSize }}>{emoji}</Text>
    </View>
  );
};

export default Profile;
