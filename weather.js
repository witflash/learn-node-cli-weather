#!/usr/bin/env node
import { getArgs } from './helpers/args.js'
import { getWeather } from './services/api.service.js';
import { printHelp, printSuccess, printError } from './services/log.service.js'
import { saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js'

const saveToken = async (token) => {
    if (!token.length) {
        printError('Where is no token');
        return;
    }

    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess('Token has been saved');
    } catch(e) {
        printError(e.message);
    }
}

const initCLI = () => {
    const args = getArgs(process.argv);
    console.log(process.env);

    if (args.h) {
        printHelp()
    }

    if (args.s) {
        // Save a city
    }

    if (args.t) {
        return saveToken(args.t)
    }

    getWeather('kyiv');
    // Show weathercast
}

initCLI();
