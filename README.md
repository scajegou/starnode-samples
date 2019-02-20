# Starnode sample code

## Requirements

Starnode is heavily tested on linux machines, but it must works on _macOS_ as well.
Please, let's us know if you encounter issues on this OS.

You need to have:
- [_Node.js_](https://nodejs.org/en/download/) 8 or newer ;
- An up-to-date _npm_ (it is installed with _Node.js_ and should be
  updated with: `npm install -g npm`).
- A _Warp_ runtime: [**Starnode**](https://github.com/ScaleDynamics/starnode-doc).

## Installation

Install depdendencies:

```
$ npm install
```

## Compare _Starnode_ and _Node_

### Compute prime factorizations with _Starnode_

- Run with _Node_
```
$ node prime/prime-node.js
```

- Run with _Starnode_ (replace `<user-id>` with your real user ID, create or log into
[your account](https://www.scaledynamics.io) to get it):
```
$ starnode --user <user-id> prime/prime-starnode.js 
```

Compare execution time display at the end of each execution. If you want to remove details of the
computation, redirect `stderr` elsewhere like below. _E.g._ following is what we get on
a 6 CPUs computer:

```
$ node prime/prime-node.js 2>/dev/null
Computing 256 prime factorizations...
256 prime factorizations computed in 12.235 seconds by Node with its unique thread on a 6 CPU(s) host

$ starnode --user=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx prime/prime-starnode.js 2>/dev/null
Computing 256 prime factorizations...
256 prime factorizations computed in 2.525 seconds by Starnode with 6 warp thread(s) on a 6 CPU(s) host
```

To see how easy it is to modify _JavaScript_ with the
[_Warp_ API](https://www.npmjs.com/warp), you can compare code
between the _Node_ and the _Starnode_ version with:

```
$ diff --side-by-side --left-column prime/prime-node.js prime/prime-starnode.js
```
