import { Itodo } from "components/todo/TodoService";
import React from "react";
import styled from "styled-components";
import TodoItem from "./item/TodoItem";

interface TodoListProps {
    todos: Itodo[];
    toggleTodo: (id: number) => void;
    removeTodo: (id: number) => void;
    updateTodo: (id: number, newText: string) => void;
}

const TodoList = ({
    toggleTodo,
    removeTodo,
    updateTodo,
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
