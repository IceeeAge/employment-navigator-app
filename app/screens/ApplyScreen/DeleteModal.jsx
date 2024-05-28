import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
export default function DeleteModal({ visible, onDelete, onCancel }) {
  return (
    <Modal
      transparent={true}
      animationType='fade'
      visible={visible}
      onRequestClose={onCancel}
    >
      <TouchableOpacity style={styles.modalContainer} onPress={onCancel}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            This job will permanently deleted from your Applied
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
              <MaterialIcons name="delete" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Background to indicate modal
  },
  modalContent: {
    width: "100%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 20,
    color: "red",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  deleteButton: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
});
