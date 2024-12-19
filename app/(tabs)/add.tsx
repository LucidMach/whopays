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
      {selectedContacts.length > 0 ? (
        <FlatList
          style={{ flexGrow: 0, width: "80%", margin: 12 }}
          data={selectedContacts}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                selectContacts((contacts) =>
                  contacts.filter((contact) => contact !== item)
                );
              }}
            >
              <Text
                style={{
                  color: "#f1f1f1",
                  margin: 12,
                  borderColor: "#5CE4C7",
                  borderWidth: 2,
                  textAlign: "center",
                  padding: 8,
                  borderRadius: 200,
                }}
              >
                {item.name ? item.name.toString() : ""}
              </Text>
            </TouchableOpacity>
          )}
        />
      ) : null}
      <TouchableOpacity
        style={{
          width: "80%",
          backgroundColor: "#5CE4C7",
          justifyContent: "center",
          alignItems: "center",
          padding: 12,
          margin: 12,
          borderRadius: 200,
        }}
        onPress={() => setSearchContacts((search) => !search)}
      >
        <Text>select people</Text>
      </TouchableOpacity>
      {searchContacts ? (
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
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#f1f1f1", margin: 12 }}>people</Text>
            <FlatList
              data={phoneContacts}
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
      ) : null}
    </View>
  );
}
