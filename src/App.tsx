import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen"; // Ensure correct import path
import AddTaskScreen from "./screens/AddTaskScreen"; // Ensure correct import path
import TaskDetailScreen from "./screens/TaskDetailScreen";
import { TaskProvider } from "./context/TaskContext"; // Import TaskProvider

const Stack = createStackNavigator();

export default function App() {
  return (
    <TaskProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddTask" component={AddTaskScreen} />
        <Stack.Screen name="TaskDetail" component={TaskDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </TaskProvider>
  );
}
