import React, { useState } from "react";

import { Itodo } from "components/todo/TodoService";
import { InsertForm, Input } from "../../create/TodoCreate";

import { Modal, DatePicker } from "antd";
import {
    ExclamationCircleOutlined,
    CheckOutlined,
    DeleteOutlined,
    EditOutlined,
} from "@ant-design/icons";
import styled, { css } from "styled-components";
import "../../../../../styles/editDatePicker.css";

interface TodoItemProps {
    toggleTodo: (id: number) => void;
    removeTodo: (id: number) => void;
    updateTodo: (id: number, newText: string) => void;
    updateDate: (id: number, newDate: string) => void;
    done: boolean;
    todo: Itodo;
}

const TodoItem = ({
    toggleTodo,
    removeTodo,
    updateTodo,
    updateDate,
    todo,
    done,
}: TodoItemProps) => {
    const { confirm } = Modal;
    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState("");

    const handleToggle = () => {
        toggleTodo(todo.id);
    };

    const handleRemove = () => {
        checkBeforeRemove();
    };

    const handleEdit = () => {
        setEdit(!edit);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // 새로고침 방지
        updateTodo(todo.id, value);
        setEdit(false);
    };

    const handleDateChange = (date, dateString) => {
        updateDate(todo.id, dateString);
    };

    const checkBeforeRemove = () => {
        confirm({
            title: "정말 지우시겠어요?",
            icon: <ExclamationCircleOutlined />,
            content: "삭제하면 되돌릴 수 없습니다!",
            okText: "삭제할래요",
            okType: "danger",
            cancelText: "취소",
            onOk() {
                removeTodo(todo.id);
            },
        });
    };

    return (
        <TodoItemBlock>
            <CheckCircle done={done} onClick={handleToggle}>
                {done && <CheckOutlined />}
            </CheckCircle>
            {edit ? (
                <InsertForm2 onSubmit={handleSubmit}>
                    <Input2
                        autoFocus
                        placeholder={todo.text}
                        onChange={handleChange}
                        value={value}
                    />
                </InsertForm2>
            ) : (
                <Text done={done}>{todo.text}</Text>
            )}
            <Limit done={done}>
                {todo.limit !== "" &&
                    (done ? (
                        <>deadline : {todo.limit}</>
                    ) : (
                        <div className="edit-date">
                            <DatePicker
                                bordered={false}
                                onChange={handleDateChange}
                                allowClear={false}
                            />
                            deadline : {todo.limit}
                        </div>
                    ))}
            </Limit>

            <Edit done={done} onClick={handleEdit}>
                {!done && <EditOutlined />}
            </Edit>
            <Remove onClick={handleRemove}>
                <DeleteOutlined />
            </Remove>
        </TodoItemBlock>
    );
};

const InsertForm2 = styled(InsertForm)`
    width: 60%;
    padding: 0;
`;
const Input2 = styled(Input)`
    width: 100%;
    height: 35px;
    font-size: 14px;
    padding: 0 10px;
`;

const Remove = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #119955;
    font-size: 16px;
    cursor: pointer;
`;

const Edit = styled(Remove)`
    color: #a9edcb;
    margin-right: 0.5rem;
`;

const TodoItemBlock = styled.div`
    display: flex;
    align-items: center;
    padding-top: 6px;
    padding-bottom: 6px;
    border-bottom: 1px solid #dce6d296;
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
    line-height: 35px;
    color: #119955;
    max-width: 55%;
    word-break: break-all;
    ${(props) =>
        props.done &&
        css`
            color: #ced4da;
            text-decoration: line-through;
        `}
`;

const Limit = styled(Text)<{ done: boolean }>`
    flex: 1;
    font-size: 14px;
    text-align: right;
    color: #a1c0b1;
    min-width: 180px;
    max-width: fit-content;
    padding-right: 25px;
    ${(props) =>
        props.done &&
        css`
            color: #ced4da;
            text-decoration: line-through;
            margin-right: 1rem;
        `}
`;

export default React.memo(TodoItem);
