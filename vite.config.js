import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['tests/**/*.test.js'],
    coverage: {
      provider: 'v8',
      reporter: ['html', 'text-summary'],
      reportsDirectory: './coverage',
      include: [
        'src/validation.js',
        'src/storage.js',
      ],
      exclude: [
        'src/main.js',
        'biblioteca/**',
      ],
      all: true,
    },
  },
})
