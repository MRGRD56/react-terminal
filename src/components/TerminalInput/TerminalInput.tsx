import React, {FC, useMemo} from 'react';
import {classes} from "mg-values";
import styles from "./TerminalInput.module.scss";

interface Props {
    text: string,
    caretPosition: number
}

interface TextPart {
    text: string | null,
    isCaret: boolean
}

const TerminalInput: FC<Props> = props => {
    const textParts: TextPart[] = useMemo(() => {
        if (props.caretPosition >= props.text.length) {
            return [
                {
                    text: props.text,
                    isCaret: false
                },
                {
                    text: null,
                    isCaret: true
                }
            ];
        }
        return [
            {
                text: props.text.substring(0, props.caretPosition),
                isCaret: false
            },
            {
                text: props.text[props.caretPosition],
                isCaret: true
            },
            {
                text: props.text.substring(props.caretPosition + 1),
                isCaret: false
            }
        ];
    }, [props.text, props.caretPosition]);

    return (
        <span>
            {textParts.map(tp => (
                <span className={classes({
                    [styles.caret]: () => tp.isCaret,
                    [styles["no-text"]]: () => tp.text === null
                })}>
                    {tp.text ?? "_"}
                </span>
            ))}
        </span>
    );
};

export default TerminalInput;