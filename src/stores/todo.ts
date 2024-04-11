import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { getApiData } from '@/api/todo';

export const useTodoStore = defineStore('todo', () => {
    // state
    const todoList = ref<Array<TodoItem>>([]);
    const currentFilter = ref<Filters>('All');
    
    //getters
    const filteredList = computed(() => {
        if (currentFilter.value === 'All') {
            return todoList.value;
        } else if (currentFilter.value === 'Active') {
            return todoList.value.filter(item => !item.completed);
        } else if (currentFilter.value === 'Completed') {
            return todoList.value.filter(item => item.completed);
        }
        return [];
    });
    
    const getAllItems = () => todoList.value;

    const getCompletedItems = () => {
        todoList.value = todoList.value.filter(item => item.completed);
    }

    const getUncompletedItems = () => {
        todoList.value = todoList.value.filter((item) => !item.completed);
    }

    // actions
    const addTodoItem = (todo: TodoItem) => {
      todoList.value.unshift(todo);
    }
    
    const deleteTodoItem = (id: number) => {
        todoList.value = todoList.value.filter(item => item.id !== id)
    }

    const deleteCompletedItems = () => {
        todoList.value = todoList.value.filter(item => !item.completed);
    }

    const getTodoItems = async () => {
        try {
            const apiTodoList = (await getApiData('https://dummyapi.online/api/todos')).slice(0, 10);
            todoList.value = apiTodoList.map(todo => ({
                id: todo.id,
                text: todo.title,
                completed: todo.completed,
                priority: todo.priority,
            }));
        }
        catch (error) {
            console.log('Error fetching todo items:', error);
        }
    }

    return {
        todoList,
        currentFilter,
        filteredList,
        getAllItems,
        getCompletedItems,
        getUncompletedItems,
        addTodoItem,
        deleteTodoItem,
        deleteCompletedItems,
        getTodoItems,
    }
});