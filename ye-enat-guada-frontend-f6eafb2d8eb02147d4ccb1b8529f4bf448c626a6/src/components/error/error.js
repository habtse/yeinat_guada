export const ErrorPage = ({ code, message }) => {
    return (
        <div>
            <h1>Error</h1>
            <p>{code}</p>
            <p>{message}</p>
        </div>
    )
}