import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Contact } from "expo-contacts";
import * as Contacts from "expo-contacts";
import ContactSearch from "@/components/ContactSearch";

import { background, foreground, primary } from "@/constants/colors";
import SplitChart from "@/components/SplitChart";

export default function AddScreen() {
  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [phoneContacts, setPhoneContacts] = useState<Contact[]>([]);
  const [selectedContacts, selectContacts] = useState<Contact[]>([]);
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
        backgroundColor: background,
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
        placeholderTextColor={background}
        style={{
          textAlign: "center",
          width: "80%",
          margin: 12,
          backgroundColor: foreground,
          borderWidth: 2,
          borderRadius: 200,
          padding: 12,
        }}
      />
      {/* amount input breaks when number is deleted to 0 digits */}
      <TextInput
        keyboardType="number-pad"
        value={amount === 0 ? "" : amount.toString()}
        onChangeText={(input) => setAmount(parseInt(input))}
        placeholder="enter expense amount"
        placeholderTextColor={background}
        style={{
          textAlign: "center",
          margin: 12,
          width: "80%",
          backgroundColor: foreground,
          borderWidth: 2,
          borderRadius: 200,
          padding: 12,
        }}
      />
      <TouchableOpacity
        style={{
          width: "80%",
          backgroundColor: primary,
          justifyContent: "center",
          alignItems: "center",
          padding: 12,
          margin: 12,
          borderRadius: 200,
        }}
        onPress={() => setSearchContacts((search) => !search)}
      >
        <Text>add people</Text>
      </TouchableOpacity>
      {selectedContacts.length > 0 ? (
        <SplitChart
          noOfContacts={selectedContacts.length}
          splitAmount={amount}
          selectContacts={selectContacts}
          selectedContacts={selectedContacts}
        />
      ) : null}
      {searchContacts ? (
        <ContactSearch
          searchContacts={searchContacts}
          phoneContacts={phoneContacts}
          selectContacts={selectContacts}
          setSearchContacts={setSearchContacts}
        />
      ) : null}
    </View>
  );
}
