import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import CreateBlogForm from './components/CreateBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState('')

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

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

    const blogFormRef = useRef()

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

    const createBlog = async (newBlog) => {
        try {
            blogFormRef.current.toggleVisibility()
            const response = await blogService.create(newBlog)
            console.log(response)
            setBlogs(blogs.concat(response))
            handleMessage(`A new blog "${response.title}" by ${response.author} added`)
            
        } catch (exception) {
            handleMessage('Sorry, something wrong')
        }
    }

    const likeUp = async (id, url, objUpdate) => {
        const response = await blogService.update(url, objUpdate)
        console.log(response)
        const updatedBlogs = blogs.map(blog => blog.id !== id ? blog : response)
        setBlogs(updatedBlogs)
    }

    if (user === null) {
        return (<>
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
        </>)
    }

    return (<>
        <h2>Blogs</h2>

        <Notification message={message} />

        Logged in as <b>{user.name}</b>
        <button onClick={handleLogoff}>logoff</button>

        <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
            <CreateBlogForm createBlog={createBlog} />
        </Togglable>

        <br />
        {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} likeUp={likeUp} />
        )}
    </>)
}

export default App
