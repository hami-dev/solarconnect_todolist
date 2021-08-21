import React from "react";

import { Itodo } from "../../../todo/TodoService";

import TodoItem from "./item/TodoItem";
import styled from "styled-components";

interface TodoListProps {
    todos: Itodo[];
    toggleTodo: (id: number) => void;
    removeTodo: (id: number) => void;
    updateTodo: (id: number, newText: string) => void;
    updateDate: (id: number, newDate: string) => void;
}

const TodoList = ({
    toggleTodo,
    removeTodo,
    updateTodo,
    updateDate,
    todos,
}: TodoListProps) => {
    return (
        <TodoListBlock>
            {todos &&
                todos.map((todo) => (
                    <TodoItem
                        toggleTodo={toggleTodo}
                        removeTodo={removeTodo}
                        updateTodo={updateTodo}
                        updateDate={updateDate}
                        key={todo.id}
                        todo={todo}
                        done={todo.done}
                    />
                ))}
        </TodoListBlock>
    );
};

const TodoListBlock = styled.div`
    flex: 1;
    padding: 20px 32px;
    padding-bottom: 48px;
    overflow-y: auto;
`;

export default React.memo(TodoList);
