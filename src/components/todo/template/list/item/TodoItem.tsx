import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";

import { Itodo } from "components/todo/TodoService";
import React from "react";
import styled, { css } from "styled-components";

interface TodoItemProps {
    toggleTodo: (id: number) => void;
    removeTodo: (id: number) => void;
    done: boolean;
    todo: Itodo;
}

const TodoItem = ({ toggleTodo, removeTodo, todo, done }: TodoItemProps) => {
    const handleToggle = () => {
        //todo sth
        toggleTodo(todo.id);
    };

    const handleRemove = () => {
        //todo sth
        removeTodo(todo.id);
    };

    return (
        <TodoItemBlock>
            <CheckCircle done={done} onClick={handleToggle}>
                {done && <CheckOutlined />}
            </CheckCircle>
            <Text done={done}>{todo.text}</Text>
            <Text2 done={done}>
                {todo.limit !== "" && (done ? "deadline : " : "⏰deadline : ")}
                {todo.limit}
            </Text2>
            <Remove onClick={handleRemove}>
                <DeleteOutlined />
            </Remove>
        </TodoItemBlock>
    );
};

const Remove = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #119955;
    font-size: 16px;
`;

const TodoItemBlock = styled.div`
    display: flex;
    align-items: center;
    padding-top: 12px;
    padding-bottom: 12px;
    &:hover {
        ${Remove} {
            display: initial;
        }
    }
`;

const CheckCircle = styled.div<{ done: boolean }>`
    width: 20px;
    height: 20px;
    border-radius: 16px;
    border: 1px solid #33bb77;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    cursor: pointer;
    ${(props) =>
        props.done &&
        css`
            border: 1px solid #dddddd;
            color: #dddddd;
        `}
`;

const Text = styled.div<{ done: boolean }>`
    flex: 2;
    font-size: 16px;
    color: #119955;
    ${(props) =>
        props.done &&
        css`
            color: #ced4da;
            text-decoration: line-through;
        `}
`;

const Text2 = styled(Text)<{ done: boolean }>`
    flex: 1;
    font-size: 14px;
    text-align: right;
    padding-right: 1rem;
    color: #a1c0b1;
    ${(props) =>
        props.done &&
        css`
            color: #ced4da;
            text-decoration: line-through;
        `}
`;

export default React.memo(TodoItem);
