import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {

    const blog = {
        title: 'Some text here for testing purposes only. Boooring',
        author: 'Testinator',
        url: 'http://address.test',
        likes: 25,
        user: { name: 'Harry', username: 'potter' }
    }
    const user = 'potter'

    let container

    beforeEach(() => {
        container = render(
            <Blog blog={blog} user={user} />
        ).container
    })

    test('renders title and author', () => {
        const div = container.querySelector('.blog')

        expect(div).toHaveTextContent(
            'Some text here for testing purposes only. Boooring'
        )
        expect(div).toHaveTextContent(
            'Testinator'
        )
    })

    test('url and likes are not displayed by default', () => {
        const div = container.querySelector('.togglable')
        expect(div).toHaveStyle('display: none')
    })
})
