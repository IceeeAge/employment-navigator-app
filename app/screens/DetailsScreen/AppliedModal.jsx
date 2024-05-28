import {
  View,
  Text,
  TextInput,
  Button,
  ToastAndroid,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import GlobalApi from "../../Graphql/GlobalApi";
import { useNavigation } from "@react-navigation/native";

export default function AppliedModal({ hideModal, companyId ,}) {
  const navigation = useNavigation();
  const { user } = useUser();
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [loading, setLoading] = useState(true);
  const validateFields = () => {
    if (!fullName.trim()) {
      setError("Full Name is required.");
      return false;
    }

    if (!address.trim()) {
      setError("Address is required.");
      return false;
    }

    setError("");
    return true;
  };

  const formatDate = (date) => {
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      month: "short", // 'Jan', 'Feb', 'Mar', etc.
      day: "numeric", // Day of the month
      year: "numeric", // Year
      hour: "numeric", // Hour (12-hour format)
      minute: "numeric", // Minute
      hour12: true, // 12-hour format with AM/PM
    }).format(date);

    return formattedDate; // Returns something like 'Oct 12, 2024, 11:11 PM'
  };

  const now = new Date();
  formatDate(now); // Outputs the date in the desired format

  const handleSubmit = () => {
    if (!validateFields()) {
      ToastAndroid.show(error, ToastAndroid.SHORT);
      return;
    }

    const now = new Date(); // Current date and time

    const data = {
      companyId,
      userName: user?.fullName,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      date: formatDate(now), // Formatted time
      address,
      note,
      fullName,
      contactNumber,
    };

    GlobalApi.appliedUser(data).then((response) => {
      console.log("User Data", response);
      ToastAndroid.show("Applied Successfully!", ToastAndroid.LONG);
      hideModal();
      navigation.navigate("Applied",loading = { loading: true });
    });
  };

  return (
    <View style={styles.modalContainer}>
      <Text style={styles.title}>Application Details</Text>

      {/* Error Message */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Full Name */}
      <Text>Full Name:</Text>
      <TextInput
        style={styles.input}
        value={fullName}
        onChangeText={(value) => setFullName(value)}
        placeholder="Enter your full name"
      />

      {/* Address */}
      <Text>Address:</Text>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={(value) => setAddress(value)}
        placeholder="Enter your address"
      />

      {/* Contact Number */}
      <Text>Contact Number:</Text>
      <TextInput
        style={styles.input}
        value={contactNumber}
        keyboardType="numeric"
        onChangeText={(value) => setContactNumber(value)}
        placeholder="Enter your Contact Number"
      />

      {/* Note */}
      <Text>Additional Note:</Text>
      <TextInput
        style={styles.input}
        value={note}
        onChangeText={(value) => setNote(value)}
        placeholder="Add a note (optional)"
        multiline
      />

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={hideModal}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.sumbitText}>Sumbit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
    marginTop: 20,
  },
  button: {
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: 120,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007bff",
  },
  sumbitText: {
    color: "white",
    fontWeight: "bold",
  },
  cancelText: {
    color: "white",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
});
