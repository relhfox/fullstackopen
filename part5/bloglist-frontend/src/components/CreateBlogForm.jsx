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
                    id='title-input'
                    data-testid='title-input'
                />
            </div>
            <div>
                Author:
                <input
                    type="text"
                    value={author}
                    name="Author"
                    onChange={({ target }) => setAuthor(target.value)}
                    id='author-input'
                    data-testid='author-input'
                />
            </div>
            <div>
                Url:
                <input
                    type="text"
                    value={url}
                    name="Url"
                    onChange={({ target }) => setUrl(target.value)}
                    id='url-input'
                    data-testid='url-input'
                />
            </div>
            <button type="submit">submit</button>
        </form>
    </>)
}

export default CreateBlogForm
