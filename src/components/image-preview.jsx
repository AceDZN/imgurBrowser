var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
module.exports = React.createClass({
  getInitialState: function(){
    return {
      hovering: false
    }
  },
  render: function(){
    return <div className="col-xs-6 col-sm-4 col-md-3 image_preview">
        <Link to={"images/" + this.props.id}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          className="thumbnail">
          {this.props.animated && this.state.hovering ? this.video() : this.image()}
          {this.props.animated && !this.state.hovering ? this.icon() : null}
          {this.state.hovering ? this.inset() : null}
        </Link>
    </div>
  },
  handleMouseEnter: function(){
    this.setState({hovering: true});
  },
  handleMouseLeave: function(){
    this.setState({hovering: false});
  },
  image: function(){
    var link = 'http://i.imgur.com/'+this.props.id+'h.jpg';
    return <img src={link} alt={this.props.title} />
  },
  video: function(){
    return <div>
      <video preload='auto' autoPlay='autoplay' loop='loop' webkit-playsinline>
        <source src={this.props.mp4} type='video/mp4' ></source>
      </video>
    </div>
  },
  icon: function(){
    return <span className="glyphicon glyphicon-play"></span>
  },
  inset: function(){
    return <div className="inset">
      Views: {this.props.views}
      <br />
      UpVotes: {this.props.ups}
    </div>
  }
});
