import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTaskArgs = {
  taskId: number
  taskNewTitle: string
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const foundTask = tasks.find(task => task.title === newTaskTitle)

    if (foundTask) {
      return Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome')
    }

    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    setTasks(oldTasks => [...oldTasks, newTask])
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }))
    const foundTask = updatedTasks.find(task => task.id === id)

    if (!foundTask) return

    foundTask.done = !foundTask.done

    setTasks(updatedTasks)
  }

  function handleEditTask({ taskId, taskNewTitle }: EditTaskArgs) {
    const updatedTasks = tasks.map(task => ({ ...task }))
    const foundTask = updatedTasks.find(task => task.id === taskId)

    if (!foundTask) return

    foundTask.title = taskNewTitle

    setTasks(updatedTasks)
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover item', 'Tem certeza que você deseja remover esse item?',
      [
        {
          text: 'Sim',
          style: 'destructive',
          onPress: () => setTasks(tasks.filter(task => task.id !== id))
        },
        {
          text: 'Não',
          style: 'cancel'
        }
      ]
    )
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        editTask={handleEditTask}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})