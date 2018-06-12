var chalk = require('chalk');
var fs = require('fs');
var path = require('path');
var useDefaultConfig = require('@ionic/app-scripts/config/webpack.config.js');
var tsconfig = require('../tsconfig.json');

var aliases = {};
var env = process.env.IONIC_ENV;

// Retrieve aliases from tsconfig and build array for webpack aliases
let pathKeyArray = Object.keys(tsconfig.compilerOptions.paths);
pathKeyArray.forEach(currentPath => {
    let correctPath = currentPath.replace("/*", "");
    let currentPathValue = tsconfig.compilerOptions.paths[currentPath][0].replace('*', '');
    aliases[correctPath] = path.resolve(tsconfig.compilerOptions.baseUrl + '/' + currentPathValue);
})

// Set default env if none/improper set
if (env !== 'prod' && env !== 'dev') {
    // Default to dev config
    useDefaultConfig[env] = useDefaultConfig.dev;
    aliases['@app/env'] = path.resolve(environmentPath(env));
}

// Set webpack resolve config to use new aliases
useDefaultConfig.dev.resolve = useDefaultConfig.prod.resolve = {
    extensions: ['.ts', '.js', '.json'],
    modules: [
        path.resolve('node_modules'),
        path.resolve(tsconfig.compilerOptions.baseUrl)
    ],
    alias: aliases
}

// Set environment path aliases
useDefaultConfig.prod.resolve.alias['@app/env'] = path.resolve(environmentPath('prod'));
useDefaultConfig.dev.resolve.alias['@app/env'] = path.resolve(environmentPath('dev'));

function environmentPath(env) {
    var filePath = './src/environments/environment' + (env === 'prod' ? '' : '.' + env) + '.ts';
    if (!fs.existsSync(filePath)) {
        console.log(chalk.red('\n' + filePath + ' does not exist!'));
    } else {
        return filePath;
    }
}

module.exports = function () {
    return useDefaultConfig;
};