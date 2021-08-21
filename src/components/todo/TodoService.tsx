import { useState, useEffect } from "react";

export type Itodo = {
    id: number;
    text: string;
    done: boolean;
    limit: string;
};

let initialTodos: Itodo[] = [];

export const useTodo = () => {
    const [todoState, setTodoState] = useState(initialTodos);
    let nextIdState = 0;

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        saveData();
    }, [todoState]);

    const incrementNextId = () => {
        nextIdState = nextIdState + 1;
    };

    const toggleTodo = (id: number) => {
        //@TODO
        setTodoState((prevState) =>
            prevState.map((todo: Itodo) =>
                todo.id === id ? { ...todo, done: !todo.done } : todo
            )
        );
    };

    const removeTodo = (id: number) => {
        setTodoState((prevState) =>
            prevState.filter((todo: Itodo) => todo.id !== id)
        );
    };

    const removeAll = () => {
        setTodoState([]);
    };

    const updateTodo = (id: number, newText: string) => {
        setTodoState((prevState) =>
            prevState.map((todo: Itodo) =>
                todo.id === id ? { ...todo, text: newText } : todo
            )
        );
    };

    const updateDate = (id: number, newDate: string) => {
        setTodoState((prevState) =>
            prevState.map((todo: Itodo) =>
                todo.id === id ? { ...todo, limit: newDate } : todo
            )
        );
    };

    const getBiggestId = () => {
        let id = 0;
        for (let i = 0; i < todoState.length; i++) {
            id = Math.max(id, todoState[i].id);
        }
        return id;
    };

    const createTodo = (todo: Itodo) => {
        // const nextId = todoState.length + 1;
        const nextId = getBiggestId();
        setTodoState((prevState) =>
            prevState.concat({
                ...todo,
                id: nextId + 1,
            })
        );
    };

    const loadData = () => {
        let data = localStorage.getItem("todos");
        if (data === null) data = "[]";
        initialTodos = JSON.parse(data);
        if (initialTodos && initialTodos.length >= 1) {
            incrementNextId();
        }
        setTodoState(initialTodos);
    };

    const saveData = () => {
        localStorage.setItem("todos", JSON.stringify(todoState));
    };

    return {
        todoState,
        nextIdState,
        incrementNextId,
        toggleTodo,
        removeTodo,
        updateTodo,
        updateDate,
        createTodo,
        removeAll,
    };
};
