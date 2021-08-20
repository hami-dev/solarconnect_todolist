import React, { useState } from "react";
import styled from "styled-components";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Itodo } from "components/todo/TodoService";
import { DatePicker, Space, Modal, Button } from "antd";
import "../../../../styles/datepicker.css";

interface TodoCreateProps {
    nextId: number;
    createTodo: (todo: Itodo) => void;
    incrementNextId: () => void;
}

const TodoCreate = ({
    nextId,
    createTodo,
    incrementNextId,
}: TodoCreateProps) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const [date, setDate] = useState("");

    const handleToggle = () => setOpen(!open);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setValue(e.target.value);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // 새로고침 방지

        if (checkBlank()) {
            makeWarning();
            return;
        }

        createTodo({
            id: nextId,
            text: value,
            done: false,
            limit: date,
        });
        incrementNextId(); // nextId 하나 증가

        setValue(""); // input 초기화
        setOpen(false); // open 닫기
    };

    const checkBlank = () => {
        const flag = value === "" ? true : false;
        return flag;
    };

    const handleDate = (date, dateString) => {
        setDate(dateString);
    };

    const makeWarning = () => {
        Modal.warning({
            title: "내용을 입력해주세요!",
            content: "빈 내용은 입력할 수 없습니다📃",
        });
    };

    return (
        <>
            <InsertFormPositioner>
                <InsertForm onSubmit={handleSubmit}>
                    <Input
                        autoFocus
                        placeholder="What's need to be done?"
                        onChange={handleChange}
                        value={value}
                    />
                    <Space direction="vertical">
                        <DatePicker
                            bordered={false}
                            onChange={handleDate}
                            inputReadOnly
                        />
                    </Space>
                    <CircleButton onClick={handleToggle} open={open}>
                        <PlusCircleOutlined />
                    </CircleButton>
                </InsertForm>
            </InsertFormPositioner>
        </>
    );
};

const CircleButton = styled.button<{ open: boolean }>`
    background: #33bb77;
    width: 40px;
    height: 40px;
    align-items: center;
    justify-content: center;
    font-size: 50px;
    color: white;
    border-radius: 50%;
    border: none;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

const InsertFormPositioner = styled.div`
    width: 100%;
    border-bottom: 1px solid #eeeeee;
`;

const InsertForm = styled.form`
    display: flex;
    align-items: center;
    background: #eeeeee;
    padding-left: 40px;
    padding-top: 36px;
    padding-right: 50px;
    padding-bottom: 36px;
`;

const Input = styled.input`
    padding: 12px;
    border: 1px solid #dddddd;
    width: 90%;
    outline: none;
    font-size: 21px;
    box-sizing: border-box;
    color: #119955;
    &::placeholder {
        color: #dddddd;
        font-size: 16px;
    }
`;

export default React.memo(TodoCreate);
