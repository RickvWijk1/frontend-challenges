export default async function getUsers(amount: number){
    const url = "https://jsonplaceholder.typicode.com/users";

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const users = await response.json();
        return users.slice(0, amount);
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
}
