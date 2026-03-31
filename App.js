import { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { CheckBox, Button, Text, Input, ThemeProvider } from '@rneui/themed';
import { MaterialIcons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'hsl(210, 43%, 92%)',
    padding: 20,
  },
  header: {
    backgroundColor: 'hsl(207, 26%, 55%)',
    padding: 12,
    borderRadius: 6,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  listContainer: {
    backgroundColor: 'hsl(180, 6%, 97%)',
    borderRadius: 6,
    padding: 12,
    flex: 1,
  },
  input: {
    padding: 12,
    marginVertical: 10,
    borderRadius: 6,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkBox: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 0,
    margin: 0,
    padding: 0,
  },
  taskText: {
    fontSize: 16,
  },
  completedText: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: 'gray',
  },
  deleteBtn: {
    marginLeft: 10,
    padding: 3,
  },
});

export default function App() {
  const [tasks, setTasks] = useState([
    { key: '1',
      completed: false,
      description: 'sort out presents', 
    },
    { key: '2',
      completed: true,
      description: 'cook dinner', 
    },
  ]);

  const [newTask, setNewTask] = useState('');

  const markCompleted = (key) => {
    setTasks(tasks.map(task =>
      task.key === key ? { ...task, completed: !task.completed } : task
    ));
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([...tasks, { key: Date.now().toString(), description: newTask, completed: false }]);
    setNewTask('');
  };

  const deleteTask = (key) => {
    setTasks(tasks.filter(task => task.key !== key));
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <CheckBox
        title={item.description}
        checked={item.completed}
        onPress={() => markCompleted(item.key)}
        checkedIcon={
          <MaterialIcons 
            name="check-box"
            size={25}
            color="hsl(207, 26%, 55%)" 
          />
        }
        uncheckedIcon={
          <MaterialIcons 
            name="check-box-outline-blank"
            size={25}
            color="hsl(207, 26%, 55%)" 
          />
        }
        containerStyle={styles.checkBox}
        textStyle={[
          styles.taskText,
          item.completed && styles.completedText
        ]}
      />

      <View style={styles.deleteBtn}>
        <Button
          title="Delete"
          color="hsl(207, 26%, 55%)"
          onPress={() => deleteTask(item.key)}
          buttonStyle={{ marginLeft: 10 }}
        />
      </View>
    </View>
  );
  
  return (
    <ThemeProvider>
      <View style={styles.container}>
        
        <View style={styles.header}>
          <Text style={styles.headerText}>ToDo List</Text>
        </View>
            
        <View style={styles.listContainer}>
          <FlatList
            data={tasks}
            renderItem={renderItem}
            keyExtractor={(item) => item.key}
          />
        </View>
            
        <Input
          placeholder="Enter a task"
          value={newTask}
          onChangeText={setNewTask}
          containerStyle={{ paddingHorizontal: 0 }}
          style={styles.input}
        />
            
        <Button
          title="Add Task"
          onPress={addTask}
          color="hsl(207, 26%, 55%)"
        />
          
      </View>          
    </ThemeProvider>     
  );
}