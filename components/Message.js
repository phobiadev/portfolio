export default function Message({ content }) {
    return (
        <p className="output" dangerouslySetInnerHTML={{ __html: content }}></p>
    )
}