import { useState } from 'react'

const CreateBlogForm = ({ createBlog }) => {
    const [ title, setTitle ] = useState('')
    const [ author, setAuthor ] = useState('')
    const [ url, setUrl ] = useState('')

    const handleCreate = (event) => {
        event.preventDefault()

        createBlog({
            title,
            author,
            url
        })

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (<>
        <h2>Create a new one:</h2>

        <form onSubmit={handleCreate}>
            <div>
                Title:
                <input
                    type="text"
                    value={title}
                    name="Title"
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>
            <div>
                Author:
                <input
                    type="text"
                    value={author}
                    name="Author"
                    onChange={({ target }) => setAuthor(target.value)}
                />
            </div>
            <div>
                Url:
                <input
                    type="text"
                    value={url}
                    name="Url"
                    onChange={({ target }) => setUrl(target.value)}
                />
            </div>
            <button type="submit">submit</button>
        </form>
    </>)
}

export default CreateBlogForm
