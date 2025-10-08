import { test, expect } from '@playwright/test'

test.describe('Role Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/roles')
  })

  test('should display roles page', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'مدیریت نقش‌ها و دسترسی‌ها' })).toBeVisible()
    await expect(page.getByRole('table')).toBeVisible()
  })

  test('should add new role', async ({ page }) => {
    await page.getByText('افزودن نقش').click()
    await page.getByLabel('نام نقش *').fill('نقش تست')
    await page.getByLabel('شناسه نقش *').fill('test-role')
    await page.getByLabel('توضیحات').fill('نقش تست برای تست')
    await page.getByRole('button', { name: 'افزودن' }).click()
    await page.waitForTimeout(800)
    await expect(page.getByText('نقش تست')).toBeVisible()
  })

  test('should edit existing role', async ({ page }) => {
    await page.click('[data-testid="edit-role-1"]')
    await page.getByLabel('نام نقش *').fill('نقش ویرایش شده')
    await page.getByRole('button', { name: 'ویرایش' }).click()
    await page.waitForTimeout(800)
    await expect(page.getByText('نقش ویرایش شده')).toBeVisible()
  })

  test('should delete role with confirmation', async ({ page }) => {
    await page.click('[data-testid="delete-role-1"]')
    await page.click('[data-testid="confirm-delete"]')
    await page.waitForTimeout(800)
    await expect(page.locator('[data-testid="edit-role-1"]')).toHaveCount(0)
  })

  test('should search roles', async ({ page }) => {
    const rolesPanel = page.getByRole('tabpanel', { name: 'نقش‌ها' })
    const table = rolesPanel.getByRole('table')

    await rolesPanel.getByPlaceholder('جستجو…').fill('مدیر')
    await expect(table.getByRole('cell', { name: 'مدیر سیستم' })).toBeVisible()
    await expect(table.getByRole('cell', { name: 'کاربر حقیقی' })).toHaveCount(0)
  })

  test('should switch between tabs', async ({ page }) => {
    await page.click('[data-testid="permissions-tab"]')
    await expect(page.getByRole('tabpanel', { name: 'دسترسی‌ها' })).toBeVisible()

    await page.click('[data-testid="categories-tab"]')
    await expect(page.getByRole('tabpanel', { name: 'گروه‌بندی دسترسی‌ها' })).toBeVisible()

    await page.click('[data-testid="roles-tab"]')
    await expect(page.getByRole('tabpanel', { name: 'نقش‌ها' })).toBeVisible()
  })
})

// Permission Categories CRUD
test.describe('Permission Categories - CRUD', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/roles')
    await page.click('[data-testid="categories-tab"]')
  })

  test('should load categories list', async ({ page }) => {
    const panel = page.getByRole('tabpanel', { name: 'گروه‌بندی دسترسی‌ها' })
    await expect(panel.getByRole('table')).toBeVisible()
    const thead = panel.locator('thead')
    await expect(thead.getByRole('button', { name: 'عنوان' })).toBeVisible()
    await expect(thead.getByRole('button', { name: 'نام (name)' })).toBeVisible()
  })

  test('should add a new category', async ({ page }) => {
    await page.getByText('افزودن گروه').click()
    await page.getByLabel('عنوان گروه *').fill('گروه تست')
    await page.getByLabel('نام گروه (name) *').fill('test-category')
    await page.getByRole('button', { name: 'افزودن' }).click()
    await page.waitForTimeout(800)
    await expect(page.getByText('گروه تست')).toBeVisible()
  })

  test('should edit a category', async ({ page }) => {
    await page.click('[data-testid="edit-category-1"]')
    await page.getByLabel('عنوان گروه *').fill('گروه ویرایش‌شده')
    await page.getByRole('button', { name: 'ویرایش' }).click()
    await page.waitForTimeout(800)
    await expect(page.getByText('گروه ویرایش‌شده')).toBeVisible()
  })

  test('should delete a category', async ({ page }) => {
    await page.click('[data-testid="delete-category-1"]')
    await page.click('[data-testid="confirm-delete"]')
    await page.waitForTimeout(800)
    await expect(page.locator('[data-testid="edit-category-1"]')).toHaveCount(0)
  })
})
