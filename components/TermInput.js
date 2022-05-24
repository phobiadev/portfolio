import { useState, useRef, useEffect } from "react"

const useFocus = () => {
    const htmlElRef = useRef(null)
    const setFocus = () => {htmlElRef.current &&  htmlElRef.current.focus()}

    return [ htmlElRef, setFocus ] 
}

export default function TermInput({ handleSubmit }) {
    const [line, setLine] = useState("")
    const [inputRef, setInputFocus] = useFocus()

    useEffect(() => {
        setInputFocus()
    },[])

    return (
        <div className="terminal-input-container" onClick={setInputFocus} >
            <style>{`
                .prevent-inline-custom {
                    width: ${line.length}ch;
                }
            `}</style>
            <form className="terminal-input-form" onSubmit={(event) => {
                    event.preventDefault()
                    handleSubmit(line)
                    setLine("")
                    
                }}
            >
                <p className="terminal-input-prompt">
                    <a className="terminal-input-prompt-user">guest</a>
                    @
                    <a className="terminal-input-prompt-domain">phobia.dev</a>
                    :
                    <a className="terminal-input-prompt-folder">~</a>
                    $
                </p>
                <input ref={inputRef} spellcheck="false" type="text" className="terminal-input terminal-input-active prevent-inline-custom" onChange={
                    (event) => setLine(event.target.value)
                } value={line}></input>
            </form>
        </div>
    )
}