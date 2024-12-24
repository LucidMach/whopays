import { foreground, foregroundTint } from "@/constants/colors";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";

interface Props {
  focused: boolean;
}

const HomeIcon: React.FC<Props> = ({ focused }) => {
  return (
    <View style={{ top: 10 }}>
      <Svg
        // xmlns="http://www.w3.org/2000/svg"
        fill={focused ? foreground : foregroundTint}
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <Path d="M12 6.453l9 8.375v9.172h-6v-6h-6v6h-6v-9.172l9-8.375zm12 5.695l-12-11.148-12 11.133 1.361 1.465 10.639-9.868 10.639 9.883 1.361-1.465z" />
      </Svg>
    </View>
  );
};

export default HomeIcon;
