# svn-polling

> 🕓 A SVN Log Polling mechanism for NodeJS.

## Install

```
$ npm install --save svn-polling
```

or

```
$ yarn add svn-polling
```

## Usage

```js
const SvnPolling = require('svn-polling');

let polling = new SvnPolling({
	remoteUrl: 'svn://your-svn-project-url.com/code/trunk'
});

polling.on('data', (data) => {
	console.log(data);
});

polling.start();
```

Result:

```js
{
  "maxRevision": 2,
  "minRevision": 1,
  "logs": [
    {
      "revision": "1",
      "author": "marcobarcelos",
      "date": "2017-01-05T03:29:42.036677Z",
      "msg": "Add index.js",
      "paths": [
        {
          "action": "A",
          "path": "/index.js"
        }
      ]
    },
    {
      "revision": "2",
      "author": "marcobarcelos",
      "date": "2017-01-05T03:30:20.881618Z",
      "msg": "Add readme.md",
      "paths": [
        {
          "action": "A",
          "path": "/readme.md"
        }
      ]
    }
  ]
}
```

## License

MIT © [Marco Barcelos](http://marcobarcelos.com)