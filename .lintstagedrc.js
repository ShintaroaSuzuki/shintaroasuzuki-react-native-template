const { ESLint } = require('eslint');

const removeIgnoredFiles = async (files) => {
    const eslint = new ESLint();
    const isIgnored = await Promise.all(
        files.map((file) => {
            return eslint.isPathIgnored(file);
        })
    );
    const filteredFiles = files.filter((_, i) => !isIgnored[i]);
    return filteredFiles.join(' ');
};

module.exports = {
    'src/**/*.{ts,tsx,js,jsx}': async (files) => {
        const filesToLint = await removeIgnoredFiles(files);
        if (filesToLint.length === 0) {
            return [];
        }
        return [
            `prettier --write ${filesToLint}`,
            `eslint --fix --max-warnings=0 ${filesToLint}`,
            `prh --verify ${filesToLint}`
        ];
    }
};
