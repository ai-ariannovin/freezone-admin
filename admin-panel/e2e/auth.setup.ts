import { chromium, type FullConfig } from '@playwright/test'

export default async function globalSetup(config: FullConfig) {
  const { baseURL } = config.projects[0].use
  const browser = await chromium.launch()
  const context = await browser.newContext()
  const page = await context.newPage()

  await page.goto(`${baseURL}/login`)
  await page.fill('#phone', '09123456789')
  await page.fill('#password', 'password')
  await page.getByRole('button', { name: 'ورود' }).click()
  await page.waitForURL(`${baseURL}/`)

  await context.storageState({ path: '.auth/user.json' })
  await browser.close()
}

