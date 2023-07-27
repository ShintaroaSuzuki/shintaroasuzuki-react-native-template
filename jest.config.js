module.exports = {
    moduleNameMapper: {
        '#(.*)': '<rootDir>/node_modules/$1',
        '@/(.*)': '<rootDir>/src/$1'
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    collectCoverageFrom: [
        'src/logics/**/*.{ts,tsx,js,jsx}',
        '!src/logics/index.ts',
        '!src/logics/**/index.ts',
        'src/utils/**/*.{ts,tsx,js,jsx}',
        '!src/utils/index.ts',
        '!src/utils/**/index.ts'
    ],
    coverageReporters: [
        ['text', { file: 'coverage.txt' }],
        ['html'],
        ['json-summary', { file: 'coverage-summary.json' }]
    ],
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100
        }
    }
};
