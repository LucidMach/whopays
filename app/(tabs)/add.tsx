import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Platform,
  ScrollView,
} from "react-native";
import Slider from "@react-native-community/slider";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Contact } from "expo-contacts";
import * as Contacts from "expo-contacts";
import ContactSearch from "@/components/ContactSearch";
import SplitChart from "@/components/SplitChart";

import { background, foreground, primary } from "@/constants/colors";

export default function AddScreen() {
  const [expenseName, setExpenseName] = useState<string>("");
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [phoneContacts, setPhoneContacts] = useState<Contact[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<
    { contact: Contact; share: number; tempShare: number }[]
  >([]);
  const [searchContacts, setSearchContacts] = useState<boolean>(false);

  // Dynamically calculate series based on selectedContacts
  const series = useMemo(
    () => selectedContacts.map((entry) => entry.share),
    [selectedContacts]
  );

  // Fetch contacts from the device
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

  // Recalculate equal shares when totalAmount or selectedContacts changes
  useEffect(() => {
    if (selectedContacts.length > 0) {
      recalculateShares();
    }
  }, [totalAmount, selectedContacts.length]);

  const recalculateShares = useCallback(() => {
    const equalShare = totalAmount / selectedContacts.length;
    setSelectedContacts((prev) =>
      prev.map((entry) => ({
        ...entry,
        share: equalShare,
        tempShare: equalShare,
      }))
    );
  }, [totalAmount, selectedContacts.length]);

  const addPayee = useCallback(
    (contact: Contact) => {
      setSelectedContacts((prev) => {
        if (prev.find((entry) => entry.contact.id === contact.id)) {
          return prev; // Prevent duplicates
        }
        const equalShare = totalAmount / (prev.length + 1);
        return [
          ...prev,
          { contact, share: equalShare, tempShare: equalShare },
        ];
      });
    },
    [totalAmount]
  );

  const removePayee = useCallback((contactId: string) => {
    setSelectedContacts((prev) =>
      prev.filter((entry) => entry.contact.id !== contactId)
    );
  }, []);

  const adjustShare = useCallback(
    (contactId: string, newShare: number) => {
      setSelectedContacts((prev) => {
        const cappedNewShare = Math.min(newShare, totalAmount);
        const remainingAmount = totalAmount - cappedNewShare;

        const otherContacts = prev.filter(
          (entry) => entry.contact.id !== contactId
        );
        const totalOtherShares = otherContacts.reduce(
          (sum, entry) => sum + entry.share,
          0
        );

        const adjustedOthers = otherContacts.map((entry) => ({
          ...entry,
          share:
            totalOtherShares > 0
              ? (entry.share / totalOtherShares) * remainingAmount
              : remainingAmount / otherContacts.length,
          tempShare:
            totalOtherShares > 0
              ? (entry.share / totalOtherShares) * remainingAmount
              : remainingAmount / otherContacts.length,
        }));

        const updatedContact = prev.find(
          (entry) => entry.contact.id === contactId
        );

        return [
          ...adjustedOthers,
          { ...updatedContact, share: cappedNewShare, tempShare: cappedNewShare },
        ];
      });
    },
    [totalAmount]
  );

  const updateTempValue = useCallback((contactId: string, tempValue: number) => {
    setSelectedContacts((prev) =>
      prev.map((entry) =>
        entry.contact.id === contactId
          ? { ...entry, tempShare: tempValue }
          : entry
      )
    );
  }, []);

  const handleDateChange = useCallback((event: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  }, []);

  // Memoize FlatList renderItem to prevent unnecessary re-renders
  const renderPayeeItem = useCallback(
    ({ item }: { item: { contact: Contact; share: number; tempShare: number } }) => (
      <View
        style={{
          marginVertical: 5,
          padding: 10,
          backgroundColor: "#f0f0f0", // Softer background
          borderRadius: 8,
          borderWidth: 1,
          borderColor: "#ddd",
        }}
      >
        {/* Payee Name and Remove Button in a Row */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 5,
          }}
        >
          <Text style={{ fontSize: 14, color: primary, flex: 1 }}>
            {item.contact.name}
          </Text>
          <TouchableOpacity
            style={{
              paddingVertical: 2,
              paddingHorizontal: 10,
              backgroundColor: "#e74c3c",
              borderRadius: 5,
            }}
            onPress={() => removePayee(item.contact.id)}
          >
            <Text style={{ color: "#fff", fontSize: 12 }}>Remove</Text>
          </TouchableOpacity>
        </View>
  
        {/* Slider and Share Amount in a Row */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Slider
            style={{ flex: 1 }}
            minimumValue={0}
            maximumValue={totalAmount}
            step={1}
            value={item.tempShare}
            onValueChange={(value) => updateTempValue(item.contact.id, value)}
            onSlidingComplete={(value) => adjustShare(item.contact.id, value)}
            minimumTrackTintColor={primary}
            maximumTrackTintColor="#ddd"
            thumbTintColor={primary} // Match slider thumb color with the theme
          />
          <Text
            style={{
              marginLeft: 10,
              fontSize: 14,
              color: primary,
              fontWeight: "bold",
            }}
          >
            ${item.share.toFixed(2)}
          </Text>
        </View>
      </View>
    ),
    [totalAmount, updateTempValue, adjustShare, removePayee]
  );

  const handleSubmit = () => {
    const data = {
      expenseName,
      totalAmount,
      selectedDate: selectedDate.toISOString(), // Convert date to ISO string format
      payees: selectedContacts.map((item) => ({
        name: item.contact.name,
        phoneNumber: item.contact.phoneNumbers?.[0]?.number || "N/A",
        share: item.share,
      })),
    };
  
    console.log("Submitted Data:", JSON.stringify(data, null, 2));
    // You can also send this data to a server or use it as needed
  };
  
  return (
    <ScrollView
      style={{
        backgroundColor: background,
        flex: 1,
      }}
      contentContainerStyle={{
        padding: 15,
      }}
    >
      {/* Row for Expense Name and Date */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 15,
        }}
      >
        <View style={{ flex: 1, marginRight: 10 }}>
          <Text style={{ fontSize: 14, color: primary, marginBottom: 5 }}>
            Expense Name
          </Text>
          <TextInput
            placeholder="Enter Name"
            placeholderTextColor="#999"
            value={expenseName}
            onChangeText={setExpenseName}
            style={{
              backgroundColor: "#ddd",
              padding: 8,
              borderRadius: 8,
            }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 14, color: primary, marginBottom: 5 }}>
            Date
          </Text>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={{
              backgroundColor: "#ddd",
              padding: 10,
              borderRadius: 8,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 14, color: primary }}>
              {selectedDate.toDateString()}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={handleDateChange}
            />
          )}
        </View>
      </View>
  
      {/* Total Amount */}
      <View style={{ marginBottom: 15 }}>
        <Text style={{ fontSize: 14, color: primary, marginBottom: 5 }}>
          Total Amount
        </Text>
        <TextInput
          placeholder="Enter Total Amount"
          placeholderTextColor="#999"
          keyboardType="number-pad"
          value={totalAmount === 0 ? "" : totalAmount.toString()}
          onChangeText={(input) => setTotalAmount(parseInt(input) || 0)}
          style={{
            backgroundColor: "#ddd",
            padding: 8,
            borderRadius: 8,
          }}
        />
      </View>
  
      {/* Add People */}
      <TouchableOpacity
        style={{
          backgroundColor: primary,
          padding: 12,
          borderRadius: 8,
          marginBottom: 15,
        }}
        onPress={() => setSearchContacts(true)}
      >
        <Text style={{ color: "#fff", textAlign: "center", fontSize: 14 }}>
          Add People
        </Text>
      </TouchableOpacity>
  
      {/* Pie Chart */}
      <View style={{ alignItems: "center", marginBottom: 15 }}>
        <SplitChart
          noOfContacts={selectedContacts.length}
          splitAmount={totalAmount}
          selectedContacts={selectedContacts.map((item) => item.contact)}
          series={series}
        />
      </View>
  
      {/* Payee List */}
      {selectedContacts.length > 0 && (
        <FlatList
          data={selectedContacts}
          keyExtractor={(item) => item.contact.id}
          renderItem={renderPayeeItem}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          windowSize={5}
          getItemLayout={(_, index) => ({
            length: 80, // Approximate height of each item
            offset: 80 * index,
            index,
          })}
        />
      )}
  
      {/* Contact Search */}
      {searchContacts && (
        <ContactSearch
          searchContacts={searchContacts}
          phoneContacts={phoneContacts}
          selectContacts={(contacts) => contacts.forEach(addPayee)}
          setSearchContacts={setSearchContacts}
        />
      )}
  
      {/* Submit Button */}
      <TouchableOpacity
        style={{
          backgroundColor: primary,
          padding: 12,
          borderRadius: 8,
          marginTop: 20,
        }}
        onPress={handleSubmit}
      >
        <Text style={{ color: "#fff", textAlign: "center", fontSize: 14 }}>
          Submit
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
