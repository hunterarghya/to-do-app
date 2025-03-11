import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage"; 

export default function AddTaskScreen() {
  const navigation = useNavigation();

  // State to hold input values
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [tasks, setTasks] = useState([]);

  // Load saved tasks from AsyncStorage
  useEffect(() => {
    AsyncStorage.getItem("tasks").then((savedTasks) => {
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks)); 
      }
    });
  }, []);

  // Function to add a new task
  const handleAddTask = async () => {
    if (title.trim()) {
      const newTask = { title, details };
      const updatedTasks = [...tasks, newTask];

      await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks)); 

      navigation.navigate("Home", { newTask }); 
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.appBar}>

              <Text style={styles.title}>Add Task</Text>
            </View>

      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.detailsInput]}
        placeholder="Details"
        value={details}
        onChangeText={setDetails}
        multiline
      />

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.addButton]}
          onPress={handleAddTask}
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f8ff",
    paddingTop: 80 + 20,
    paddingHorizontal: 20,
  },
  appBar: {
    height: 80, 
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1e90ff",
    marginBottom: 20,
    borderRadius: 0,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  detailsInput: {
    height: 80,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#dc143c",
  },
  addButton: {
    backgroundColor: "#228b22",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

