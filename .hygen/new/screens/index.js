const fs = require('fs');

const features = fs.readdirSync('./src/features');

module.exports = {
    prompt: ({ inquirer }) => {
        const questions = [
            {
                type: 'select',
                name: 'feature',
                message:
                    'モデルを選択してください（src/features/* のどこに作成しますか？）',
                choices: features
            },
            {
                type: 'input',
                name: 'screen_name',
                message: 'スクリーン名を入力してください'
            }
        ];
        return inquirer.prompt(questions).then((answers) => {
            return answers;
        });
    }
};
