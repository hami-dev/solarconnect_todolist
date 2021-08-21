import { Itodo } from "components/todo/TodoService";
import React from "react";
import { Modal, message } from "antd";
import styled from "styled-components";
import { Remove } from "../list/item/TodoItem";
import { DeleteOutlined } from "@ant-design/icons";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import {
    REMOVE_ALL_TITLE,
    REMOVE_CONTENT,
    REMOVE_OK_BUTTON,
    REMOVE_CANCEL_BUTTON,
    NOTHING_TO_REMOVE,
} from "../../../../Constant";

interface HooksTodoHeadProps {
    todos: Itodo[];
    removeAll: () => void;
}

const Todofooter = ({ todos, removeAll }: HooksTodoHeadProps) => {
    const undoneTasks = todos && todos.filter((todo) => !todo.done);
    const { confirm } = Modal;

    // const makeErrorMessage = () => {

    // }

    const handleRemoveAll = () => {
        undoneTasks.length !== 0
            ? confirm({
                  title: REMOVE_ALL_TITLE,
                  icon: <ExclamationCircleOutlined />,
                  content: REMOVE_CONTENT,
                  okText: REMOVE_OK_BUTTON,
                  okType: "danger",
                  cancelText: REMOVE_CANCEL_BUTTON,
                  onOk() {
                      removeAll();
                  },
              })
            : message.error(NOTHING_TO_REMOVE);
    };

    return (
        <TodoFooterBlock>
            <LeftText className="tasks-left">
                {undoneTasks ? undoneTasks.length : "0"} items left
            </LeftText>
            <RemoveAll onClick={handleRemoveAll}>
                <DeleteOutlined />
            </RemoveAll>
        </TodoFooterBlock>
    );
};

const RemoveAll = styled(Remove)`
    margin-right: 1rem;
    color: #a50000;
`;

const TodoFooterBlock = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 24px;
    padding-bottom: 24px;
`;

const LeftText = styled.div`
    width: 100%;
    text-align: center;
    color: #33bb77;
    font-size: 18px;
`;

export default React.memo(Todofooter);
