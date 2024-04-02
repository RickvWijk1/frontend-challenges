import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', () => {

   const todoList = ref<Array<TodoItem>>([]);

   const addTodoItem = (todo: TodoItem) => {
      todoList.value.push(todo);
   }

   const deleteTodoItem = (id: number) => {
    todoList.value = todoList.value.filter(item => item.id !== id);
}

    return {
        todoList,
        addTodoItem,
        deleteTodoItem
    }
});