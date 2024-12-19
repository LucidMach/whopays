import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
  FlatList,
} from "react-native";
import * as Contacts from "expo-contacts";

export default function AddScreen() {
  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [phoneContacts, setPhoneContacts] = useState<Contacts.Contact[]>([]);
  const [selectedContacts, selectContacts] = useState<Contacts.Contact[]>([]);
  const [searchContacts, setSearchContacts] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          setPhoneContacts(data);
        }
      }
    })();
  }, []);

  return (
    <View
      style={{
        backgroundColor: "#1a1a1a",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TextInput
        keyboardType="default"
        value={name}
        onChangeText={setName}
        placeholder="enter expense name"
        placeholderTextColor="#1a1a1a"
        style={{
          textAlign: "center",
          width: "80%",
          margin: 12,
          backgroundColor: "#f1f1f1",
          borderWidth: 2,
          borderRadius: 200,
          padding: 12,
        }}
      />
      <TextInput
        keyboardType="number-pad"
        value={amount === 0 ? "" : amount.toString()}
        onChangeText={(input) => setAmount(parseInt(input))}
        placeholder="enter expense amount"
        placeholderTextColor="#1a1a1a"
        style={{
          textAlign: "center",
          margin: 12,
          width: "80%",
          backgroundColor: "#f1f1f1",
          borderWidth: 2,
          borderRadius: 200,
          padding: 12,
        }}
      />
    </View>
  );
}
