/**
 * Centralised test data for the SauceDemo suite.
 * Keeping credentials and reusable data here avoids
 * duplicating "magic strings" across test files.
 */

export const users = {
  standard: { username: 'standard_user', password: 'secret_sauce' },
  lockedOut: { username: 'locked_out_user', password: 'secret_sauce' },
  problem: { username: 'problem_user', password: 'secret_sauce' },
  performanceGlitch: { username: 'performance_glitch_user', password: 'secret_sauce' },
  invalid: { username: 'not_a_real_user', password: 'wrong_password' },
};

export const checkoutInfo = {
  valid: { firstName: 'Mikhail', lastName: 'Kaneko', postalCode: '10001' },
  missingLastName: { firstName: 'Mikhail', lastName: '', postalCode: '10001' },
};

export const products = {
  backpack: 'Sauce Labs Backpack',
  bikeLight: 'Sauce Labs Bike Light',
  boltTShirt: 'Sauce Labs Bolt T-Shirt',
};
