import { useState } from 'react'

const Blog = ({ blog, likeUp }) => {
    const [visible, setVisible] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const handleLike = () => {
        const id = blog.id
        const url = `/api/blogs/${id}`
        const objUpdate = {
            likes: blog.likes + 1,
            user: blog.user.id,
            author: blog.author,
            title: blog.title,
            url: blog.url
        }
        likeUp(id, url, objUpdate)
    }

    return (
        <div style={blogStyle}>
            {blog.title} / {blog.author} {" "}
            <button onClick={() => setVisible(!visible)}>
                {visible ? 'hide' : 'view'}
            </button>
            <div style={{display: visible ? '' : 'none'}}>
                {blog.url}<br />
                likes: {blog.likes} <button onClick={handleLike}>like</button><br />
                {blog.user.name}
            </div>
        </div>
    )
}

export default Blog
