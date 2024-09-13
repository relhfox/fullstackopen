const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {

    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: {
                name: 'Testing Bot',
                username: 'tester',
                password: '123'
            }
        })
        await page.goto('/')
    })

    test('Login form is shown', async ({ page }) => {
        const locator = await page.getByText('Log in to the app!')
        await expect(locator).toBeVisible()
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await loginWith(page, 'tester', '123')

            await expect(page.getByText('Logged in successfully')).toBeVisible()
            await expect(page.getByText('Sorry, wrong credentials')).not.toBeVisible()

            const notifiDiv = await page.locator('.notification')
            await expect(notifiDiv).toHaveCSS('color', 'rgb(0, 128, 0)')
        })

        test('fails with wrong credentials', async ({ page }) => {
            await loginWith(page, 'tester', 'wrongpass')

            await expect(page.getByText('Sorry, wrong credentials')).toBeVisible()
            await expect(page.getByText('Logged in successfully')).not.toBeVisible()

            const notifiDiv = await page.locator('.notification')
            await expect(notifiDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
        })
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'tester', '123')
        })

        test('a new blog can be created', async ({ page }) => {
            await createBlog(page, 'Posted by Playwright bot', 'Testinator', 'http://some.test')
            await expect(page.getByTestId('blog')).toContainText('Posted by Playwright bot')
        })

        test('a blog can be liked', async ({ page }) => {
            await createBlog(page, 'Posted by Playwright bot', 'Testinator', 'http://some.test')
            await page.getByRole('button', { name: 'view' }).click()
            await page.getByRole('button', { name: 'like' }).click()

            await expect(page.getByTestId('blog')).toContainText('likes: 1')
        })

        test('a user who added the blog can delete the blog', async ({ page }) => {
            await createBlog(page, 'Posted by Playwright bot', 'Testinator', 'http://some.test')
            await page.getByRole('button', { name: 'view' }).click()

            page.on('dialog', dialog => dialog.accept())
            await page.getByRole('button', { name: 'remove' }).click()

            await expect(page.locator('.notification')).toContainText('has been deleted')
            await expect(page.getByText('Posted by Playwright bot')).not.toBeVisible()
        })

        test('only the user who added the blog sees the delete button', async ({ page, request }) => {
            await createBlog(page, 'Posted by Playwright bot', 'Testinator', 'http://some.test')
            await page.getByRole('button', { name: 'view' }).click()

            await expect(page.getByRole('button', { name: 'remove' })).toBeVisible()

            await page.getByRole('button', { name: 'logoff' }).click()

            await request.post('/api/users', {
                data: {
                    name: 'Another Bot',
                    username: 'imposter',
                    password: '456'
                }
            })
            await loginWith(page, 'imposter', '456')
            await page.getByRole('button', { name: 'view' }).click()

            await expect(page.getByText('Logged in as Another Bot')).toBeVisible()
            await expect(page.getByText('Posted by Playwright bot / Testinator')).toBeVisible()
            await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
        })
    })
})
