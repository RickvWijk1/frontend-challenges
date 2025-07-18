import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { getApiData } from '@/api/todo';

export const useTodoStore = defineStore('todo', () => {
    // state
    const todoList = ref<Array<TodoItem>>([]);
    const currentFilter = ref<Filters>('All');
    const currentId = ref(1);

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
    const addTodoItem = (todo: Omit<TodoItem, 'id'>) => {
        const newTodo: TodoItem = {
            ...todo,
            id: currentId.value++
        };
        todoList.value.unshift(newTodo);
    };

    const deleteTodoItem = (id: number) => {
        todoList.value = todoList.value.filter((item: TodoItem) => item.id !== id)
    }

    const deleteCompletedItems = () => {
        todoList.value = todoList.value.filter((item: TodoItem) => !item.completed);
    }

    const getTodoItems = async () => {
        try {
            // Fetch data from API
            const response: { todos: Array<{ id: number; todo: string; completed: boolean }> } =
                await getApiData('https://dummyjson.com/todos');

            // Extract the first 10 todos
            const apiTodoList = response.todos.slice(0, 10);

            // Map the API response to match your TodoItem structure
            todoList.value = apiTodoList.map(todo => ({
                id: todo.id,
                text: todo.todo,
                completed: todo.completed,
                imagePath: null
            })) as TodoItem[];

            const maxId = Math.max(...todoList.value.map(todo => todo.id), 0);
            currentId.value = maxId + 1;
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