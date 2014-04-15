# rogoto-http


A Web Server that allows us to upload and interact with Rogoto. Someone can connect
to the webserver and then type in the commands and see what will happen on a canvas
and on the robot as it draws on paper.

## Developing for the webserver

### Dependencies

1. Create a virtualenv that will hold all the python dependencies
2. run `pip install -r requirements`
3. Install node.js, this is required for javascript packages
4. run `npm install browserify -g`


### Running the webserver

```
    python run.py
```

### Making changes to the JavaScript

The Rogoto JS parser is a separate project and can be found in its
own [Github project](https://github.com/automatedtester/rogoto-js).
To make changes to the way the Rogoto syntax is rendered, make changes
to `main.js` and then run `browserify main.js -o bundle.js` and commit
both `main.js` and `bundle.js`