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
            return getAllItems.value;
        } else if (currentFilter.value === 'Active') {
            return getUncompletedItems.value;
        } else if (currentFilter.value === 'Completed') {
            return getCompletedItems.value;
        }
        return [];
    });
    
    const getAllItems = computed(() => todoList.value);

    const getCompletedItems = computed(() => {
        return todoList.value.filter((item: TodoItem) => item.completed);
    });

    const getUncompletedItems = computed(() => {
        return todoList.value.filter((item: TodoItem) => !item.completed);
    });

    // actions
    const addTodoItem = (todo: TodoItem) => {
      todoList.value.unshift(todo);
    }
    
    const deleteTodoItem = (id: number) => {
        todoList.value = todoList.value.filter((item: TodoItem) => item.id !== id)
    }

    const deleteCompletedItems = () => {
        todoList.value = todoList.value.filter((item: TodoItem) => !item.completed);
    }

    const getTodoItems = async () => {
        try {
            const response: { todos: Array<{ id: number; todo: string; completed: boolean }> } = 
                await getApiData('https://dummyjson.com/todos');
    
            // Extract the first 10 todos
            const apiTodoList = response.todos.slice(0, 10); 
    
            todoList.value = apiTodoList.map(todo => ({
                id: todo.id,
                text: todo.todo,
                completed: todo.completed
            }));
        } catch (error) {
            console.error('Error fetching todo items:', error);
        }
    };
    
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
