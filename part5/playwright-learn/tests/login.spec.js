const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {

    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3003/api/testing/reset')
        await request.post('http://localhost:3003/api/users', {
            data: {
                name: 'Testing Bot',
                username: 'tester',
                password: '123'
            }
        })
        await page.goto('http://localhost:5173')
    })

    test('Login form is shown', async ({ page }) => {
        const locator = await page.getByText('Log in to the app!')
        await expect(locator).toBeVisible()
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await page.getByTestId('username').fill('tester')
            await page.getByTestId('password').fill('123')
            await page.getByRole('button', { name: 'login' }).click()
        
            await expect(page.getByText('Logged in successfully')).toBeVisible()
            await expect(page.getByText('Sorry, wrong credentials')).not.toBeVisible()

            const notifiDiv = await page.locator('.notification')
            await expect(notifiDiv).toHaveCSS('color', 'rgb(0, 128, 0)')
        })

        test('fails with wrong credentials', async ({ page }) => {
            await page.getByTestId('username').fill('tester')
            await page.getByTestId('password').fill('wrong')
            await page.getByRole('button', { name: 'login' }).click()
        
            await expect(page.getByText('Sorry, wrong credentials')).toBeVisible()
            await expect(page.getByText('Logged in successfully')).not.toBeVisible()

            const notifiDiv = await page.locator('.notification')
            await expect(notifiDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
        })
    })
})
