declare interface TodoItem {
    id: number,
    text: string,
    completed: boolean
}

declare type Filters = 'All' | 'Active' | 'Completed';