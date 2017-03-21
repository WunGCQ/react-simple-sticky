import React, { Component, PropTypes } from 'react';
import { debounce } from 'lodash';
let instances = [];
let hasBounded = false;


function bindResizeListener () {
  if ( !hasBounded ) {
    window.addEventListener('resize', debounce(function () {
      instances.forEach((stickyComponent: Sticky) => {
        stickyComponent.resize.call(stickyComponent);
      });
    }, 300));
    hasBounded = true;
  }
}

export class Sticky extends Component {
  
  static propTypes = {
    zIndex : PropTypes.number,
  };
  
  static defaultProps = {
    zIndex : 1,
  };
  
  constructor (props) {
    super(props);
    const me = this;
    instances.push(me);
    this.component = null;
    this.resize = this.resize.bind(this);
    this.state = {
      style : {},
      rendered : false,
    };
    bindResizeListener();
  }
  
  componentWillUnmount () {
    var me = this;
    var index = instances.findIndex((instance) => (instance === me));
    if ( index > -1 ) {
      instances.splice(index, 1);
    }
  }
  
  resize () {
    this.setState({ rendered : false, style : {} }, () => {
      this.setSize(false);
    });
  }
  
  setSize () {
    const rect = this.component.getBoundingClientRect();
    const { top, left, width, height } = rect;
    //先不考虑其他情况了，一般针对body够用了
    const scrollTop = document.body.scrollTop;
    const scrollLeft = document.body.scrollLeft;
    this.setState({
      rendered : true, style : { top : top + scrollTop, left : left + scrollLeft, width, height }
    });
  }
  
  componentDidMount () {
    setTimeout(() => {this.setSize()}, 0);
  }
  
  setComponent (ref) {
    this.component = ref;
  }
  
  render () {
    const { rendered, style } = this.state;
    const { zIndex } = this.props;
    return (
      <div className="g-sticky-wrap" style={{zIndex}}>
        <div className="m-stick-component-position" style={style}>
        </div>
        <div className={`m-real-component ${rendered ? 'rendered' : ''}`}
             style={style}
             ref={this.setComponent.bind(this)}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
