# svn-polling

[![npm](https://img.shields.io/npm/v/svn-polling.svg)](https://www.npmjs.com/package/svn-polling)
![npm](https://img.shields.io/npm/l/svn-polling.svg)

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
  "revision": 2,
  "logs": [
    {
      "revision": "1",
      "author": "marcobarcelos",
      "date": "2017-01-05T03:29:42.036677Z",
      "msg": "Add index.js",
      "changes": [
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
      "changes": [
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
	logsLimit: 10,
	username: 'marcobarcelos',
	password: 'ultrasecret'
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

### username

Type: `string`<br>
Optional *(in case authentication is not required or is already saved)*

The svn user's username.

### password

Type: `string`<br>
Optional *(in case authentication is not required or is already saved)*

The svn user's password.

## License

MIT © [Marco Barcelos](http://marcobarcelos.com)
