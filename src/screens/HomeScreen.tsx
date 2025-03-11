import React, { useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native"; 
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTasks } from "../context/TaskContext";
import AsyncStorage from "@react-native-async-storage/async-storage"; 

export default function HomeScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused(); 
  const { tasks, setTasks } = useTasks(); 

  
  useEffect(() => {
    if (isFocused) {
      AsyncStorage.getItem("tasks").then((savedTasks) => {
        if (savedTasks) {
          setTasks(JSON.parse(savedTasks));
        }
      });
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <Text style={styles.title}>All List</Text>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("TaskDetail", { task: item })}
            style={[styles.taskItem, item.isDone && styles.taskDone]}
          >
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text style={styles.taskDetails}>{item.details}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate("AddTask")}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#f0f8ff", 
    paddingTop: 80, 
    paddingHorizontal: 20 
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
    color: "white" 
  },
  taskItem: { 
    backgroundColor: "white", 
    padding: 15, 
    marginVertical: 5, 
    borderRadius: 5, 
    elevation: 2 
  },
  taskDone: { 
    backgroundColor: "#d4edda" 
  },
  floatingButton: { 
    position: "absolute", 
    bottom: 20, 
    right: 20, 
    backgroundColor: "#1e90ff", 
    padding: 15, 
    borderRadius: 50 
  },
});
