var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var Link = Router.Link;
var Actions = require('../actions');
var TopicStore = require('../stores/topic-store');


module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(TopicStore,'onChange')
  ],
  getInitialState: function(){
    return {
      topics: []
    }
  },
  componentWillMount: function(){
    Actions.getTopics();
  },
  render: function(){
    return <nav className="navbar navbar-default header">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          Imgur Browser
        </Link>
        <ul className="nav navbar-nav navbar-right">
          <li className="dropdown">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
              Topics <span className="caret"></span>
            </a>
            <ul className="dropdown-menu">
              {this.renderTopics()}
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  },
  renderTopics: function(){
    return this.state.topics.map(function(topic){
      return <li  key={topic.id}>
        <Link activeClassName="active" to={"topics/" + topic.id}>
          {topic.name}
        </Link>

      </li>
    });
  },
  onChange: function(event,topics){
    this.setState({
      topics: topics
    });
  }
});
