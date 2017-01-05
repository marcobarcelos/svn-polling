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

## Requirements

You need to have the `svn` command installed.

## Usage

```js
const SvnPolling = require('svn-polling');

const polling = new SvnPolling({
	remoteUrl: 'svn://your-svn-project-url.com/code/trunk'
});

// Will be called as soon as new changes are commited into the repository
polling.on('data', (data) => {
	console.log(data);
});

// Start polling from svn log history
polling.start();
```

**Result:**

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

## Config

You can configure some options by passing it into the constructor:

```js
const options = {
	remoteUrl: 'svn://your-svn-project-url.com/code/trunk',
	pollInterval: 1000,
	logsLimit: 5
};

const polling = new SvnPolling(options);
```

### remoteUrl

Type: `string`

The remote repository's url.

### pollInterval

Type: `number`<br>
Default: `15000`

The interval between a svn log history fetch and another.

### logsLimit

Type: `number`<br>
Default: `5`

How many logs/commits to retrieve by the first time.

## License

MIT © [Marco Barcelos](http://marcobarcelos.com)
