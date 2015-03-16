/** @jsx React.DOM */

var React = require('react'),
    Home = require('./home.jsx'),
    App;

var Marvin = React.createClass({

  render: function() {
    return <div className="container top">
	<div className="media">
	  <a className="pull-left" href="https://github.com/nogiushi/marvin">
	    <img className="media-object" src="/images/robot.svg" alt="..."/>
	  </a>
	  <div className="media-body">
	    <h2 className="media-heading">Marvin</h2>
	    <p>Marvin is a character for your home that enhances your life, is <strong>open</strong>, and lives in your home to serve as your home's brain – as you see fit.</p>
	  </div>
	</div>
      </div>
  }
})

var NotFound = React.createClass({
  render: function() {
    return <h1>Not Found</h1>
  }
})

App = React.createClass({
    getInitialState: function () {
      return {landscape: false};
    },
    toggleLandscape: function(event) {
      this.setState({landscape: !this.state.landscape});
    },
    componentDidMount: function () {
    },
    render: function () {
      var resource = {
          title: "Not Found",
          type: "website",
          description: "",
          image: "/images/colock1.jpg",
          Content: <NotFound />,
          up: '/'
      };
      var routes = [
          {
                pattern: "^/$",
                func: function(match) {
                    resource = {title: "Nogiushi", type: "website",
                                description: "", image: "/images/tobe.jpg",
                                Content: <Home />,
                                up: ""};
                }
            },
            {pattern: "/marvin/$",
             func: function(match) {
                 resource = {title: "Marvin « Nogiushi", type: "article",
                             description: "Some healthy and delicious recipes.",
                             image: "/images/recipes.jpg",                 
                             Content: <Marvin />,
                             up: '/'};
             }
            },                      
];
        var path = this.props.path;
        routes.map(function (route) {
            var match = path.match(route.pattern)
            if (match !== null) {
                route.func(match);
            }
        });

        var bodyClass = "";
        if (this.state.landscape) {
            bodyClass = "landscape";
        }
        return <html id="site">
  <head>
    <title>Nogiushi</title>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta property="og:image" content="/images/brain-gears-hi.png" />
    <meta property="og:title" content="Nogiushi" />
    <meta property="og:description" content="We're passionate about improving the world a little bit, starting with your home." />
    <title>Nogiushi</title>
    <link href="/css/site.css" rel="stylesheet" media="screen" />
    <link href="/images/brain-gears-hi-with-padding.png" rel="icon" type="image/png" />
    <link href="/images/brain-gears-hi-with-padding.png" rel="apple-touch-icon" />
  </head>
  <body>
    <div className="navbar navbar-inverse navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="/">Nogiushi</a>
        </div>
        <div className="navbar-collapse collapse">
          <ul className="nav navbar-nav">
            <li><a href="/">Home</a></li>
            <li><a href="/marvin/">Marvin</a></li>
            <li><a href="mailto:info@nogiushi.com">Contact</a></li>
          </ul>
        </div>
      </div>
    </div>

    {resource.Content}

    <footer>
      <div className="container">
	<ul className="list-inline see-also">
	  <li>
	    <a href="https://medium.com/@nogiushi">
	      <img src="/images/medium.png" className="img-rounded" alt="nogiushi @medium" />
	    </a>
	  </li>
	  <li>
	    <a href="https://github.com/nogiushi">
	      <img src="/images/gh.jpg" className="img-rounded" alt="nogiushi @github"/>
	    </a>
	  </li>
	  <li>
	    <a href="https://facebook.com/nogiushi">
	      <img src="/images/FB-f-Logo__blue_512.png" className="img-rounded" alt="nogiushi @facebook"/>
	    </a>
	  </li>
	  <li>
	    <a href="https://twitter.com/nogiushi">
	      <img src="/images/twitter-bird-light-bgs.png" className="img-rounded" alt="nogiushi @twitter"/>
	    </a>
	  </li>
	  <li>
	    <a href="https://flipboard.com/section/marvin-bRwcpK">
	      <img src="/images/flipboard.png" className="img-rounded" alt="marvin @flipboard"/>
	    </a>
	  </li>
	</ul>
	<p>&copy; Nogiushi 2015</p>
      </div>
    </footer>
    <script src="/site.js"></script>
  </body>
</html>;
    }
});

module.exports = App;
