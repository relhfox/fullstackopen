import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState('')

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )  
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleMessage = (message) => {
        setMessage(message)
        setTimeout(() => {
            setMessage('')
        }, 5000)
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        console.log('logging in with', username, password)

        try {
            const user = await loginService.login({
                username,
                password
            })
            window.localStorage.setItem(
                'loggedBlogappUser',
                JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
            handleMessage('Logged in successfully')
        } catch (exception) {
            handleMessage('Sorry, wrong credentials')
        }
    }

    const handleLogoff = () => {
        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
        handleMessage('Logged out successfully')
    }

    const handleCreate = async (event) => {
        event.preventDefault()

        try {
            const response = await blogService.create({
                title,
                author,
                url
            })
            console.log(response)
            setBlogs(blogs.concat(response))
            handleMessage(`A new blog "${response.title}" by ${response.author} added`)
            setTitle('')
            setAuthor('')
            setUrl('')
        } catch (exception) {
            handleMessage('Sorry, something wrong')
        }
    }

    if (user === null) {
        return (
            <>
                <h2>Log in to the app!</h2>

                <Notification message={message} />

                <form onSubmit={handleLogin}>
                    <div>
                        username
                        <input
                            type="text"
                            value={username}
                            name="Username"
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>
                    <div>
                        password
                        <input
                            type="password"
                            value={password}
                            name="Password"
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <button type="submit">login</button>
                </form>
            </>
        )
    }

    return (
        <>
            <h2>Blogs</h2>

            <Notification message={message} />

            Logged in as <b>{user.name}</b>
            <button onClick={handleLogoff}>logoff</button>

            <br /><br />
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


            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </>
    )
}

export default App
