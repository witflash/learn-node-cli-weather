#!/usr/bin/env node
import { getArgs } from './helpers/args.js'

const initCLI = () => {
    const args = getArgs(process.argv);
    console.log(args);

    if (args.h) {
        // Help view
    }

    if (args.s) {
        // Save a city
    }

    if (args.t) {
        // Save token
    }

    // Show weathercast
}

initCLI();
