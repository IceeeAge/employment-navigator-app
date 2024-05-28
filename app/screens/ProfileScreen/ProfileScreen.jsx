import { View, Text, Button, Image } from "react-native";
import React from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { StyleSheet } from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
  const navigate = useNavigation();
  const { user } = useUser();
  const { isLoaded, signOut } = useAuth();
  if (!isLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text>Welcome to your profile!</Text>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: user?.imageUrl }}
          style={styles.profileUrlImage}
        />
        <Text style={styles.userNameText}>{user?.fullName}</Text>
        <Text style={styles.userEmailText}>
          {user?.primaryEmailAddress?.emailAddress}
        </Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.buttonContainer}>
        {/* Go to Home */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigate.navigate("Home")}
        >
          <MaterialIcons name="home" size={40} color="black" />
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>

        {/* Go to Applied */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigate.navigate("Applied")}
        >
          <MaterialIcons name="work" size={40} color="black" />
          <Text style={styles.buttonText}>Applied</Text>
        </TouchableOpacity>

        {/* User logout */}
        <TouchableOpacity style={styles.button} onPress={signOut}>
          <Feather name="log-out" size={40} color="black" />
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  profileContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  profileUrlImage: {
    width: 70,
    height: 70,
    borderRadius: 99, // Circular image
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    width: "100%",
    alignSelf: "center",
    marginVertical: 20,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 80,
  },
  button: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  buttonText: {
    marginTop: 5,
    fontSize: 12,
    color: "black",
  },
});
