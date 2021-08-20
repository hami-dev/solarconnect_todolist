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

    //지금 선택한 아이디 넘버와 같은 걸 걸러내고 재출력(==삭제)
    const removeTodo = (id: number) => {
        setTodoState((prevState) =>
            prevState.filter((todo: Itodo) => todo.id !== id)
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

    // const loadInitialData = () => {};

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
        createTodo,
    };
};
