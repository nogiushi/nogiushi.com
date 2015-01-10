/** @jsx React.DOM */

var React = require('react'),
    $     = require('jquery'),
    Home;

Home = React.createClass({
    getInitialState: function () {
        return {};
    },
    render: function () {
        return <div>
    <div className="jumbotron">
      <div className="container">
	<div className="col-lg-2 col-md-4 col-sm-4 col-xs-5">
	  <a href="http://nogiushi.com/">
	    <img className="img-responsive img-rounded" src="/images/brain-gears.svg" alt="brain gears" />
	  </a>
	</div>
	<div className="col-lg-10 col-md-8 col-sm-8 col-xs-7">
          <h1>Nogiushi</h1>
          <p>
	    We're passionate about improving the world a little bit, starting with your home.
	  </p>
	</div>
      </div>
    </div>

    <div className="container">
      <div className="col-lg-6 col-xs-12">
	<div className="media">
	  <a className="pull-left" href="https://medium.com/happy-home">
	    <img className="media-object" style={{width: "90px"}} src="/images/community.svg" alt="happy home" />
	  </a>
	  <div className="media-body">
	    <h2 className="media-heading">Community</h2>
	    <p>
	      We value collaboration and open
	      source, both hardware and software. We have started
	      using and producing open source to allow people to
	      customize, deepen, and better their relationship with
	      their home environment.
	    </p>
	    <p>
	      We invite others that share this passion to post their
	      stories and ideas to
	      the <a href="https://medium.com/happy-home">Happy
	      Home</a> Collection on creating a better and happier
	      relationship with your home through open source hardware
	      and software.
	    </p>
	  </div>
	</div>
      </div>
      <div className="col-lg-6 col-xs-12">
	<div className="media">
	  <a className="pull-left" href="/marvin/">
	    <img className="media-object" style={{width: "90px"}} src="/images/robot.svg" alt="Marvin" />
	  </a>
	  <div className="media-body">
	    <h2 className="media-heading">Marvin</h2>
	    <p>Marvin is a character for your home that enhances your life, is <strong>open</strong>, and lives in your home to serve as your home's brain – as you see fit.</p>
	  </div>
	</div>
      </div>
    </div>
</div>

    }
});

module.exports = Home;
