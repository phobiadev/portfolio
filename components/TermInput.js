import { useState, useCallback } from "react"

export default function TermInput({ handleSubmit }) {
    const [line, setLine] = useState("")
    const autoFocusFn = useCallback(element => (element ? element.focus() : null), []);

    return (
        <div className="terminal-input-container">
            <form className="terminal-input-form" onSubmit={(event) => {
                event.preventDefault()
                if (line) {
                    handleSubmit(line)
                    setLine("")
                }
                
            }}>
                <p className="terminal-input-prompt">
                    <a className="terminal-input-prompt-user">visitor</a>
                    @
                    <a className="terminal-input-prompt-domain">phobia.dev</a>
                    :
                    <a className="terminal-input-prompt-folder">~</a>
                    $
                </p>
                <input ref={autoFocusFn} spellcheck="false" type="text" className="terminal-input" onChange={
                    (event) => setLine(event.target.value)
                } value={line}></input>
            </form>
        </div>
    )
}