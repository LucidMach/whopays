import { TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";

interface Props {
  size: number;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}
const EditButton: React.FC<Props> = ({ size, setEditMode }) => {
  return (
    <TouchableOpacity
      style={{
        zIndex: 1,
        left: size / 2,
        top: size / 3,
        height: (size * 3) / 10,
        width: (size * 3) / 10,
        padding: 10,
        borderRadius: size,
        backgroundColor: "#5CE4C7",
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={() => setEditMode((mode) => !mode)}
    >
      <Svg fill="#000" viewBox="0 0 24 24">
        <Path d="m4.481 15.659c-1.334 3.916-1.48 4.232-1.48 4.587 0 .528.46.749.749.749.352 0 .668-.137 4.574-1.492zm1.06-1.061 3.846 3.846 11.321-11.311c.195-.195.293-.45.293-.707 0-.255-.098-.51-.293-.706-.692-.691-1.742-1.74-2.435-2.432-.195-.195-.451-.293-.707-.293-.254 0-.51.098-.706.293z" />
      </Svg>
    </TouchableOpacity>
  );
};

export default EditButton;
