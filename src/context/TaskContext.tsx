import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Task {
  title: string;
  details: string;
  isDone?: boolean;
}

interface TaskContextType {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  removeTask: (taskToRemove: Task) => void;
  updateTasks: (updatedTasks: Task[]) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      const savedTasks = await AsyncStorage.getItem("tasks");
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    };
    loadTasks();
  }, []);

//   const updateTasks = (updatedTasks: Task[]) => {
//     setTasks(updatedTasks);
//     AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
//   };

const updateTasks = (updateFunction) => {
    setTasks((prevTasks) => {
      const newTasks = updateFunction(prevTasks);
      AsyncStorage.setItem("tasks", JSON.stringify(newTasks)); // Persist changes
      return newTasks;
    });
  };
  

  const removeTask = (taskToRemove) => {
    updateTasks((prevTasks) => prevTasks.filter((task) => task.title !== taskToRemove.title));
  };
  
  return (
    <TaskContext.Provider value={{ tasks, setTasks, removeTask, updateTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};
