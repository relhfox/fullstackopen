import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
    const mockHandler = vi.fn()
    let container

    beforeEach(() => {
        container = render(
            <Blog
                blog={blog}
                user={user}
                likeUp={mockHandler}
            />
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

    test('after clicking the button, url and likes are displayed', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)

        const div = container.querySelector('.togglable')
        expect(div).not.toHaveStyle('display: none')
    })

    test('clicking the like button twice calls event handler twice', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('like')

        await user.click(button)
        await user.click(button)

        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})
