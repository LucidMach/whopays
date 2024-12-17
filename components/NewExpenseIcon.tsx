import { Text, View } from "react-native";
import { DarkTheme } from "@react-navigation/native";

interface Props {
  focused: boolean;
}

const NewExpenseIcon: React.FC<Props> = ({ focused }) => {
  return (
    <View
      style={{
        height: 90,
        width: 90,
        borderRadius: 50,
        backgroundColor: DarkTheme.colors.card,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: focused ? "#f1f1f1" : "#a1a1a1", fontSize: 32 }}>
        +
      </Text>
    </View>
  );
};

export default NewExpenseIcon;
