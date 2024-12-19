import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import * as Contacts from "expo-contacts";

interface Props {
  searchContacts: boolean;
  setSearchContacts: React.Dispatch<React.SetStateAction<boolean>>;
  phoneContacts: Contacts.Contact[];
  selectContacts: React.Dispatch<React.SetStateAction<Contacts.Contact[]>>;
}

const ContactSearch: React.FC<Props> = ({
  searchContacts,
  setSearchContacts,
  phoneContacts,
  selectContacts,
}) => {
  const [searchName, setSearchName] = useState<string>("");
  const [displayContacts, setDisplayContacts] = useState(phoneContacts);

  useEffect(() => {
    setDisplayContacts(phoneContacts); // lazy way but maybe informant way to handle search name delete character while searching
    setDisplayContacts((contacts) =>
      contacts.filter((contact) => contact.name?.includes(searchName))
    );
  }, [searchName]);

  return (
    <Modal
      animationType="slide"
      visible={searchContacts}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setSearchContacts(!searchContacts);
      }}
    >
      <View
        style={{
          height: "100%",
          backgroundColor: "#1a1a1a",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            marginTop: 60,
            padding: 12,
            width: "80%",
            borderWidth: 2,
            borderRadius: 200,
            borderColor: "#5CE4C7",
            flexDirection: "row",
            gap: 16,
          }}
        >
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="#5CE4C7">
            <Path d="M23.111 20.058l-4.977-4.977c.965-1.52 1.523-3.322 1.523-5.251 0-5.42-4.409-9.83-9.829-9.83-5.42 0-9.828 4.41-9.828 9.83s4.408 9.83 9.829 9.83c1.834 0 3.552-.505 5.022-1.383l5.021 5.021c2.144 2.141 5.384-1.096 3.239-3.24zm-20.064-10.228c0-3.739 3.043-6.782 6.782-6.782s6.782 3.042 6.782 6.782-3.043 6.782-6.782 6.782-6.782-3.043-6.782-6.782zm2.01-1.764c1.984-4.599 8.664-4.066 9.922.749-2.534-2.974-6.993-3.294-9.922-.749z" />
          </Svg>
          <TextInput
            style={{ color: "#5CE4C7", flexGrow: 1 }}
            placeholder="search for contacts"
            value={searchName}
            onChangeText={setSearchName}
          ></TextInput>
        </View>
        <FlatList
          style={{ width: "100%", paddingHorizontal: 40 }}
          data={displayContacts}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                selectContacts((contacts) => [...contacts, item]);
                setSearchContacts(!searchContacts);
              }}
            >
              <Text
                style={{
                  color: "#f1f1f1",
                  margin: 16,
                  fontSize: 16,
                }}
              >
                {item.name ? item.name.toString() : ""}
              </Text>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity
          onPress={() => setSearchContacts(!searchContacts)}
          style={{ marginBottom: 32 }}
        >
          <Text
            style={{
              margin: 16,
              fontSize: 20,
              paddingHorizontal: 32,
              paddingVertical: 4,
              borderRadius: 32,
              color: "#1a1a1a",
              backgroundColor: "#5CE4C7",
            }}
          >
            close
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ContactSearch;
