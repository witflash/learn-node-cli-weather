#!/usr/bin/env node
import { getArgs } from './helpers/args.js'
import { getWeather } from './services/api.service.js';
import { printHelp, printSuccess, printError, printForecast } from './services/log.service.js'
import { saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js'

const saveParam = async (name, value) => {
    if (!name.length) {
        printError(`You have not set ${name}`);
        return;
    }

    try {
        await saveKeyValue(TOKEN_DICTIONARY[name], value);
        printSuccess(`${name.charAt(0).toUpperCase()}${name.substring(1)} has been saved`);
    } catch (e) {
        printError(e.message);
    }
}

const saveToken = async (token) => {
    await saveParam(TOKEN_DICTIONARY.token, token);
}

const saveCity = async (city) => {
    await saveParam(TOKEN_DICTIONARY.city, city);
}

const getForecast = async () => {
    try {
        const weather = await getWeather();
        printForecast(weather);
    } catch (e) {
        if (e?.response?.status == 404) {
            printError('Incorrect city');
        } else if (e?.response?.status == 401) {
            printError('Incorrect token');
        } else {
            printError(e.message);
        }
    }
}

const initCLI = async () => {
    const args = getArgs(process.argv);

    if (args.h) {
        printHelp()
    }

    if (args.c) {
        await saveCity(args.c)
    }

    if (args.t) {
        await saveToken(args.t)
    }

    getForecast();
}

initCLI();
