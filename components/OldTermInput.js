export default function OldTermInput({ content }) {
    return (
        <div className="terminal-input-container">
            <p className="terminal-input-prompt">
                <a className="terminal-input-prompt-user">visitor</a>
                @
                <a className="terminal-input-prompt-domain">phobia.dev</a>
                :
                <a className="terminal-input-prompt-folder">~</a>
                $
            </p>
            <p className="terminal-input terminal-input-old">{content}</p>
        </div>
    )
}