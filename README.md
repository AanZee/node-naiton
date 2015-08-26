node-naiton
=================

Node.js wrapper for the Navitas Naiton G3 business software.

### Disclaimer

Not all methods are available yet. Feel free to add them and send in a pull request

# Install dependecies

First all the node modules. 

```javascript
npm install
```

Make sure you have bower installed globally: 

```javascript
npm install -g bower
```

Then install bower dependencies

```javascript
bower install
```


# Usage 

Create a client
```javascript
var naiton = require('node-naiton');
var client = naiton.createClient({
	username: '',
	password: '',
	ipaddress: '',
	connectionstring: '',
	env: 'test'
});
```

The client can be used to call methods on the Naiton API
```javascript
// Get available brands that have a primary key.
client.authenticate().then(function (result) {

	client.brandmanager.getallbrandlistwithprimarykey(function (result) {
		console.log(result);
	}, function (error){
		console.log(error);
	});

}, function (error) {
	console.log(error);
});

```

# Methods
For more info about the options / methods, checkout the [API manuals and other examples](http://www.aanzee.nl/).


# Support
Found a bug? Have a great idea? Feel free to create an issue or a pull request!

# License

The MIT License (MIT)

Copyright (c) 2014 Aan Zee

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

