import { useState } from 'react'

const Blog = ({ blog, user, likeUp, deleteBlog }) => {
    const [visible, setVisible] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const url = `/api/blogs/${blog.id}`

    const handleLike = () => {
        const objUpdate = {
            likes: blog.likes + 1,
            user: blog.user.id,
            author: blog.author,
            title: blog.title,
            url: blog.url
        }
        likeUp(blog.id, url, objUpdate)
    }

    return (
        <div style={blogStyle}>
            {blog.title} / {blog.author} {' '}
            <button onClick={() => setVisible(!visible)}>
                {visible ? 'hide' : 'view'}
            </button>
            <div style={{display: visible ? '' : 'none'}}>
                {blog.url}<br />
                likes: {blog.likes} <button onClick={handleLike}>like</button><br />
                {blog.user.name}<br />
                <button 
                    onClick={() => deleteBlog(blog.id, url, blog.title, blog.author)}
                    style={{display: blog.user.username === user ? '' : 'none', backgroundColor: 'red'}}
                >
                    remove
                </button>
            </div>
        </div>
    )
}

export default Blog
