import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('should navigate through sidebar menu', async ({ page }) => {
    await page.goto('/')
    
    await page.click('[data-testid="dashboard-menu"]')
    await expect(page.getByRole('heading', { name: 'داشبورد' })).toBeVisible()
    
    await page.click('[data-testid="roles-menu"]')
    await expect(page.getByRole('heading', { name: 'مدیریت نقش‌ها و دسترسی‌ها' })).toBeVisible()
    
    await page.click('[data-testid="users-menu"]')
    await expect(page.getByRole('heading', { name: 'مدیریت کاربران' })).toBeVisible()
    
    await page.click('[data-testid="businesses-menu"]')
    await expect(page.getByRole('heading', { name: 'مدیریت کسب‌وکارها' })).toBeVisible()
  })

  test('should show active menu item', async ({ page }) => {
    await page.goto('/roles')

    // assert aria-current instead of CSS class
    await expect(page.getByTestId('roles-menu')).toHaveAttribute('aria-current', 'page')
  })

  test.describe('unauthorized', () => {
    test.use({ storageState: undefined })
    test('should handle unauthorized access', async ({ page }) => {
      // ensure client-side session is cleared
      await page.addInitScript(() => {
        localStorage.removeItem('admin_token')
        localStorage.removeItem('admin_user')
      })

      await page.goto('/roles')
      await page.waitForURL('**/login')
      await expect(page.getByRole('heading', { name: 'ورود به پنل ادمین' })).toBeVisible()
    })
  })
})
