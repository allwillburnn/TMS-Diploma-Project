import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/tests/*.unit.spec.ts', '**/tests/*.api.spec.ts']
};

export default config;