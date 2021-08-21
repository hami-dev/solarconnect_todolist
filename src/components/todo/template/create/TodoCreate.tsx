import React, { useState } from "react";

import { Itodo } from "../../../todo/TodoService";
import { CheckDate, GetNowDateString } from "../../../common/CheckDate";

import { PlusCircleOutlined } from "@ant-design/icons";
import { DatePicker, Space, Modal } from "antd";
import styled from "styled-components";
import "../../../../styles/datepicker.css";

import {
    INPUT_BLANK,
    INPUT_CONTENTS,
    DATE_BEFORE_TODAY,
    DATE_CONTENTS,
} from "../../../../Constant";

interface TodoCreateProps {
    nextId: number;
    createTodo: (todo: Itodo) => void;
    incrementNextId: () => void;
}

const TodoCreate = ({ nextId, createTodo }: TodoCreateProps) => {
    const [value, setValue] = useState("");
    const [date, setDate] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setValue(e.target.value);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // 새로고침 방지

        if (checkBlank()) {
            makeWarning(INPUT_BLANK, INPUT_CONTENTS);
            return;
        }

        createTodo({
            id: nextId,
            text: value,
            done: false,
            limit: date,
        });
        setValue(""); // input 초기화
    };

    const checkBlank = () => {
        const flag = value === "" ? true : false;
        return flag;
    };

    const handleDate = (date: any, dateString: string) => {
        if (CheckDate(dateString)) {
            makeWarning(DATE_BEFORE_TODAY, DATE_CONTENTS);
            const today = GetNowDateString();
            console.log(today);
            setDate(today);
            return;
        }
        setDate(dateString);
    };

    const makeWarning = (title: string, content: string) => {
        Modal.warning({
            title: title,
            content: content,
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
                    <CircleButton>
                        <PlusCircleOutlined />
                    </CircleButton>
                </InsertForm>
            </InsertFormPositioner>
        </>
    );
};

const CircleButton = styled.button`
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

export const InsertForm = styled.form`
    display: flex;
    align-items: center;
    background: #eeeeee;
    padding-left: 40px;
    padding-top: 36px;
    padding-right: 50px;
    padding-bottom: 36px;
`;

export const Input = styled.input`
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
