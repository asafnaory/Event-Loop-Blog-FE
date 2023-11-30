import styles from "./EditorButton.module.css";

export function EditorButton({text, onClick}: {text: string, onClick: () => void}){
    return(
        <button className={styles["editor-button"]} onClick={onClick}>{text}</button>
    )
}