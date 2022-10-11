import chalk from 'chalk';
import dedent from 'dedent-js';

const printError = error => {
    console.log(chalk.bgRed(' ERROR ') + ` ${error}`);
}

const printSuccess = message => {
    console.log(chalk.bgGreen(' SUCCESS ') + ` ${message}`)
}

const printHelp = () => {
    console.log(
        dedent`${chalk.bgCyan(' HELP ')}
        Without params: show weather
        -c [CITY] to set the city
        -h to view help
        -t [API_KEY] to save the token
        `
    );
}

const printForecast = data => {
    const { name, sys, weather, main } = data;
    const { temp, humidity } = main;

    console.log(
        dedent`
        ${chalk.bgMagenta(`${name}, ${sys.country}`)}
        ${weather[0].main}
        ${temp}\u2103
        ${humidity}% humidity
        ` 
    )
}

export { printError, printSuccess, printHelp, printForecast }