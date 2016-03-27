var React = require('react');
var Header = require('./header');
var TopicList = require('./topic-list');
var AceLogo = require('./ace-logo');


module.exports = React.createClass({
  render:function(){

    return <div>
      <Header />
      {this.content()}
      <div className="text-center">
        <AceLogo />
      </div>
    </div>
  },
  content: function(){
    if(this.props.children){
      return this.props.children;
    } else {
      return <TopicList />
    }
  }

});
