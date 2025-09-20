import { test, expect } from '@playwright/test';

test.describe('Pruebas de Login en Sauce Demo', () => {

  test('Login válido - standard_user', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    // Completar formulario de login
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');

    // Verificar que la vista de productos se muestre
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('Login inválido - credenciales incorrectas', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    // Completar formulario con credenciales incorrectas
    await page.fill('[data-test="username"]', 'usuario_invalido');
    await page.fill('[data-test="password"]', 'clave_invalida');
    await page.click('[data-test="login-button"]');

    // Verificar mensaje de error
    const errorMsg = page.locator('[data-test="error"]');
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText('Username and password do not match');
  });

});
