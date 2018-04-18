After untarring, follow these instructions. For the scripts (namely `pull.sh`),
you must be _in_ the project directory.

- install [Sass](https://sass-lang.com/install)
- pull (`./pull.sh`)
- install (`./install.sh`)
- run (`./run.sh`)

Pull uses a deploy key in the config directory with read-only access.
Install removes the `node_modules` directory and reinstalls it with
`npm install`. It also installs `nodemon` globally for the `run.sh`
script so you don't have to restart the process when pulling. If you
don't want that, you can just install with `rm -rf node_modules && npm i`
and `node index.js` to run. `run.sh` takes one argument, the port, and
defaults to 3030. Internally the node app does the same, so you can
just run with `node index.js <PORT>` (also defaults to 3030).
