import React, { useState, useEffect } from "react";
import styled from "styled-components";

const TodoHead = () => {
    //@TODO 현재 시간을 표시해야합니다.
    const [timeString, setTimeString] = useState("");

    useEffect(() => {
        setNowTime();
    }, []);

    const date = new Date();

    const optionsForDate = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    const optionForDay = {
        weekday: "long",
    };

    const dayString: string = date.toLocaleDateString("en-US", optionForDay);
    const dateString: string = date.toLocaleDateString("en-US", optionsForDate);

    function getNowTime() {
        const date = new Date();
        let hour = date.getHours();
        let min = date.getMinutes();
        let sec = date.getSeconds();
        const ampm = hour <= 12 ? "am" : "pm";

        hour = hour % 12;
        hour = hour ? hour : 12;
        min = min < 10 ? "0" + min : min;
        sec = sec < 10 ? "0" + sec : sec;

        return `${ampm} ${hour} : ${min} : ${sec}`;
    }

    function setNowTime() {
        const time = getNowTime();
        setTimeString(time);

        setInterval(() => {
            const time = getNowTime();
            setTimeString(time);
        }, 1000);
    }

    return (
        <TodoHeadBlock>
            <Text>{dayString}</Text>
            <DateText>{dateString}</DateText>
            <Text>{timeString}</Text>
        </TodoHeadBlock>
    );
};

const TodoHeadBlock = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 52px;
    padding-bottom: 24px;
    border-bottom: 3px solid #33bb77;
`;

const DateText = styled.div`
    font-size: 26px;
    color: #119955;
    padding: 0 10px;
`;

const Text = styled.div`
    font-size: 22px;
    color: #119955;
    padding-top: 5px;
`;

export default React.memo(TodoHead);
