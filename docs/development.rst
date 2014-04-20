Developing for the webserver
============================

Dependencies
------------

1. Create a virtualenv that will hold all the python dependencies
2. run `pip install -r requirements`
3. Install node.js, this is required for javascript packages
4. run `npm install browserify -g`


Running the webserver
---------------------

In a command prompt run::
    python run.py


Making changes to the JavaScript
--------------------------------

The Rogoto JS parser is a separate project and can be found in its
own [Github project](https://github.com/automatedtester/rogoto-js).
To make changes to the way the Rogoto syntax is rendered, make changes
to `main.js` and then run `browserify main.js -o bundle.js` and commit
both `main.js` and `bundle.js`

Vagrant Setup
-------------

If you want to use vagrant for development you can! All that you would need to do is

In a command prompt run::
    vagrant up
