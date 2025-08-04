
import { browser } from 'k6/browser';
import { sleep, check } from 'k6';

export const options = {
  scenarios: {
    ui: {
      executor: 'constant-vus',
      vus: 3,
      duration: '10s',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
  thresholds: {
    checks: ['rate==1.0'],
  },
};

export default async function () {
  const page = await browser.newPage();

  try {
    await page.goto('https://test.k6.io/my_messages.php');

    page.locator('input[name="login"]').type('admin');
    page.locator('input[name="password"]').type('123');

    const submitButton = page.locator('input[type="submit"]');

    await Promise.all([submitButton.click(), page.waitForNavigation()]);

    //console.log(await page.content());
    //console.log(await page.locator('h2').textContent());

    const h2Text = await page.locator('h2').textContent();
    check(h2Text, {
        'Welcome message is correct': (txt) => txt.includes('Welcome, admin!')
    });

    // check(page, {
    //     header: async (p) => (await p.locator('h2').textContent()) === 'Welcome, admin!',
    // });

    sleep(1)
  } finally {
    await page.close();
  }
}