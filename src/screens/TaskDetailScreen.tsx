import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTasks } from "../context/TaskContext";

const TaskDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { task } = route.params as { task: { title: string; details: string } };
  const { removeTask, updateTasks } = useTasks();

  // Function to mark task as done
  const markTaskAsDone = () => {
    const updatedTask = { ...task, isDone: true };
    updateTasks((prevTasks) => prevTasks.map((t) => (t.title === task.title ? updatedTask : t)));
    navigation.goBack();
  };

  // Function to confirm and remove task
  const confirmRemoveTask = () => {
    Alert.alert("Confirm Delete", "Are you sure you want to delete this task?", [
      { text: "No", style: "cancel" },
      {
        text: "Yes",
        onPress: () => {
          removeTask(task);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.taskTitle}>{task.title}</Text>
        <Text style={styles.taskDetails}>{task.details}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.doneButton]} onPress={markTaskAsDone}>
          <Text style={styles.buttonText}>✔ Done</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.removeButton]} onPress={confirmRemoveTask}>
          <Text style={styles.buttonText}>🗑 Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles (same as before)
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f8ff", padding: 20, alignItems: "center", justifyContent: "center" },
  card: { backgroundColor: "white", padding: 20, borderRadius: 10, elevation: 4, width: "90%", alignItems: "flex-start", marginBottom: 30 },
  buttonContainer: { flexDirection: "row", justifyContent: "space-between", width: "90%" },
  button: { flex: 1, minWidth: 100, paddingVertical: 12, alignItems: "center", justifyContent: "center", borderRadius: 5, marginHorizontal: 5 },
  doneButton: { backgroundColor: "green" },
  removeButton: { backgroundColor: "red" },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});

export default TaskDetailScreen;
