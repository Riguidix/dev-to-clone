export default function Button({ style, title, action }) {
    return (
        <button
            className={ style }
            onClick={ action }
        >
            { title }
        </button>
    );
}