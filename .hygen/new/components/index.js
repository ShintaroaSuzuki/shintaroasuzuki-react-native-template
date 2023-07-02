const fs = require('fs');

const features = fs
    .readdirSync('./src/features')
    .map((dir_name) => `src/features/${dir_name}/components`);

module.exports = {
    prompt: ({ inquirer }) => {
        const questions = [
            {
                type: 'select',
                name: 'dir_name',
                message: 'どこに作成しますか？',
                choices: ['src/components', ...features]
            },
            {
                type: 'select',
                name: 'category',
                message: 'コンポーネントのカテゴリを選択してください',
                choices: ['bases', 'modules']
            },
            {
                type: 'input',
                name: 'component_name',
                message: 'コンポーネント名を入力してください'
            }
        ];
        return inquirer.prompt(questions).then((answers) => {
            return answers;
        });
    }
};
