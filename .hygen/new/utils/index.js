module.exports = {
    prompt: ({ inquirer }) => {
        const questions = [
            {
                type: 'input',
                name: 'function_name',
                message: '関数名を入力してください'
            }
        ];
        return inquirer.prompt(questions).then((answers) => {
            return answers;
        });
    }
};
