declare interface TodoItem {
    id: number,
    text: string,
    imagePath: string | null,
    completed: boolean
}

declare type Filters = 'All' | 'Active' | 'Completed';