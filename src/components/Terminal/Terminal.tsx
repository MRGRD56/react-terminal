import React, {useEffect, useState} from 'react';
import styles from "./Terminal.module.scss";
import TerminalInput from "../TerminalInput/TerminalInput";
import useTerminal from "../../hooks/useTerminal";

const Terminal = () => {
    const [inputText, setInputText] = useState("yarn add bootstrap");
    const [inputCaretPosition, setInputCaretPosition] = useState(18);
    const [outputText, setOutputText] = useState("user@PC:/home/user$");

    const handleInput = useTerminal(inputText, setInputText, output => {
        setInputText("");
        setOutputText(state => {
            return state + " " + inputText + "\n" + output + "\n" + "user@PC:/home/user$";
        });
        setInputCaretPosition(0);
        window.scrollTo(0, document.body.scrollHeight);
    });

    useEffect(() => {
        document.addEventListener("keypress", onKeyPress);
        document.addEventListener("keydown", onKeyDown);

        return () => {
            document.removeEventListener("keypress", onKeyPress);
            document.removeEventListener("keydown", onKeyDown);
        };
    });

    function moveCaret(shift: number, inputLength: number = inputText.length) {
        setInputCaretPosition(caretPosition => {
            const newCaretPosition = caretPosition + shift;
            return newCaretPosition >= 0 && newCaretPosition <= inputLength
                ? newCaretPosition
                : caretPosition;
        });
    }

    function onKeyPress(event: KeyboardEvent) {
        event.preventDefault();
        console.log("KEYPRESS", event);
        const text = event.key;
        if (!event.ctrlKey && !event.metaKey && event.code !== "Enter") {
            setInputText(state => {
                return state.slice(0, inputCaretPosition) + text + state.slice(inputCaretPosition);
            });
            moveCaret(text.length, inputText.length + text.length);
        }
    }

    function onKeyDown(event: KeyboardEvent) {
        console.log("KEYDOWN", event);
        switch (event.code) {
            case "ArrowLeft":
                moveCaret(-1)
                break;
            case "ArrowRight":
                moveCaret(1);
                break;
            case "Backspace":
                if (inputCaretPosition === 0) return;
                setInputText(state => {
                    return state.slice(0, inputCaretPosition - 1) + state.slice(inputCaretPosition);
                });
                moveCaret(-1);
                break;
            case "Delete":
                setInputText(state => {
                    return state.slice(0, inputCaretPosition) + state.slice(inputCaretPosition + 1);
                });
                break;
            case "Enter":
                handleInput();
                break;
        }
    }

    return (
        <div className={styles.terminal}>
            <span className={styles.terminalOutput}>{outputText} </span>
            <TerminalInput text={inputText} caretPosition={inputCaretPosition}/>
        </div>
    );
};

export default Terminal;