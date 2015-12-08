'use strict';

var Command = require('./Command'),
  Node = require('../Node');

class CatCommand extends Command {
  run(remotePath, options) {
    var searchFunction = Node.loadByPath;
    var notFound = `No node exists at path '${remotePath}'`;
    if (options.id) {
      searchFunction = Node.loadById;
      notFound = `No node exists with ID '${emotePath}'`;
    }

    if (remotePath) {
      remotePath = remotePath.trim();
    }

    return new Promise((resolve, reject) => {
      this.initialize((err, data) => {
        if (err) {
          return reject(err.message);
        }

        searchFunction(remotePath, (err, node) => {
          if (err) {
            return reject(err);
          }

          if (!node) {
            return reject(notFound);
          }

          var opts = {
            stream: process.stdout
          };

          if (!node.isFile()) {
            return reject('Node must be a file');
          }

          node.download('', opts, (err, data) => {
            if (err) {
              return reject(err);
            }

            if (data.success) {
              return resolve();
            }

            return reject(data.data.message);
          });
        });
      });
    });
  }
}

module.exports = CatCommand;