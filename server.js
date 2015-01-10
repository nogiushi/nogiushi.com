require('node-jsx').install({extension: '.jsx'});

var http = require('http'),
    send = require('send'),
    url = require('url'),
    React = require('react'),
    App = require('./assets/js/app.jsx');

exports = module.exports = function (req, res) {
    if (req.url == '/' || req.url == '/marvin/') {
        var path = url.parse(req.url).pathname
        var content = React.renderToString(React.createElement(App, {path: path}));
        res.setHeader('Content-Type', 'text/html');        
        res.end("<!DOCTYPE html>" + content);
    } else {
        send(req, url.parse(req.url).pathname, {root: './static'})
            .on('error', function(err) {
                res.statusCode = err.status || 500;
                var path = url.parse(req.url).pathname                
                var content = React.renderToString(React.createElement(App, {path: path}));
                res.setHeader('Content-Type', 'text/html');        
                res.end("<!DOCTYPE html>" + content);
            })
            .on('directory', function() {
                res.statusCode = 301;
                res.setHeader('Location', req.url + '/');
                res.end('Redirecting to ' + req.url + '/');
            })
            .pipe(res);
    }
};
