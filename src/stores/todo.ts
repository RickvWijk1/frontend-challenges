import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getApiData } from '@/api/todo';

export const useTodoStore = defineStore('todo', () => {
    const todoList = ref<Array<TodoItem>>([]);
    
    const addTodoItem = (todo: TodoItem) => {
      todoList.value.unshift(todo);
    }
    
    const deleteTodoItem = (id: number) => {
    todoList.value = todoList.value.filter(item => item.id !== id)
    }

    const getTodoItems = async () => {
        try {
            const apiTodoList = await getApiData('https://dummyapi.online/api/todos');
            todoList.value = apiTodoList.map(todo => ({
                id: todo.id,
                text: todo.title,
                completed: todo.completed,
            }));
        }
        catch (error) {
            console.log('Error fetching todo items:', error);
        }
    }

    return {
        todoList,
        addTodoItem,
        deleteTodoItem,
        getTodoItems
    }
});