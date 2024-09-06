import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlogForm from './CreateBlogForm'

test('<CreateBlogForm /> calls the event handler with the right details on submit', async () => {
    const user = userEvent.setup()
    const mockHandler = vi.fn()

    const { container } = render(<CreateBlogForm createBlog={mockHandler} />)

    const inputTitle = container.querySelector('#title-input')
    const inputAuthor = container.querySelector('#author-input')
    const inputUrl = container.querySelector('#url-input')
    const sendButton = screen.getByText('submit')

    await user.type(inputTitle, 'Some testing title here, bla-bla')
    await user.type(inputAuthor, 'Testinator')
    await user.type(inputUrl, 'http://address.test')
    await user.click(sendButton)

    console.log(mockHandler.mock.calls)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].title).toBe('Some testing title here, bla-bla')
    expect(mockHandler.mock.calls[0][0].author).toBe('Testinator')
    expect(mockHandler.mock.calls[0][0].url).toBe('http://address.test')
})
