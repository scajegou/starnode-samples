/*
 * Copyright 2019 ScaleDynamics SAS. All rights reserved.
 * Licensed under the MIT license.
 */

'use strict';

const warp = require('warp');
const path = require('path');
const humanizeDuration = require('humanize-duration');

// Check Warp runtime
if (!warp.getRuntimeCapabilities().starnode) {
    console.log(`Need to run with Starnode. Launch with:`);
    console.log(`starnode --user=<user-id> ${path.relative('', process.argv[1])}`);
    process.exit(1);
}

// Main processing function
function computePrimeFactorization(value) {
  const result = { value, factors: [] };

  let i = 2;
  while (i * i < value) {
    while (value % i === 0) {
      result.factors.push(i);
      value = value / i;
    }
    i++;
  }

  if (value > 1 || result.factors.length == 0) {
    result.factors.push(value);
  }

  return result;
}

async function run() {
  // Init data
  const numberOfFactorization = 256;
  console.log(`Computing ${numberOfFactorization} prime factorizations...`);

  //
  // Start of processing
  //

  let start = Date.now();
  let promises = [];
  let results = [];
  for (let idx = 0; idx < numberOfFactorization; idx++) {
    promises.push(warp.callAsPromise(computePrimeFactorization, 9007199254040991 + idx)
        .then((result) => results.push(result)));
  }
  await Promise.all(promises);
  let end = Date.now();

  //
  // End of processing
  //

  // Display results
  results.forEach((it) => {
    console.error(`Prime factors of ${it.value} are ${it.factors}`
      + (it.factors.reduce((acc, prime) => acc *= prime) === it.value ? '' : ' [Error]'));
  });
  console.log(`${results.length} prime factorizations computed in ${humanizeDuration(end - start)}`
      + ` by Starnode with ${warp.getCurrentNumWarpThreads()} warp thread(s)`
      + ` on a ${require('os').cpus().length} CPU(s) host`);

  process.exit(0);
}

run();
