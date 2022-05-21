export default function Error({ content }) {
    return (
        <p className="error output" dangerouslySetInnerHTML={{ __html: content }}></p>
    )
}