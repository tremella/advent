import{a as h}from"./vendor_exenv-rXw0U8dN.js";function l(){var t=this.constructor.getDerivedStateFromProps(this.props,this.state);t!=null&&this.setState(t)}function r(t){function e(o){var n=this.constructor.getDerivedStateFromProps(t,o);return n??null}this.setState(e.bind(this))}function p(t,e){try{var o=this.props,n=this.state;this.props=t,this.state=e,this.__reactInternalSnapshotFlag=!0,this.__reactInternalSnapshot=this.getSnapshotBeforeUpdate(o,n)}finally{this.props=o,this.state=n}}l.__suppressDeprecationWarning=!0;r.__suppressDeprecationWarning=!0;p.__suppressDeprecationWarning=!0;function y(t){var e=t.prototype;if(!e||!e.isReactComponent)throw new Error("Can only polyfill class components");if(typeof t.getDerivedStateFromProps!="function"&&typeof e.getSnapshotBeforeUpdate!="function")return t;var o=null,n=null,i=null;if(typeof e.componentWillMount=="function"?o="componentWillMount":typeof e.UNSAFE_componentWillMount=="function"&&(o="UNSAFE_componentWillMount"),typeof e.componentWillReceiveProps=="function"?n="componentWillReceiveProps":typeof e.UNSAFE_componentWillReceiveProps=="function"&&(n="UNSAFE_componentWillReceiveProps"),typeof e.componentWillUpdate=="function"?i="componentWillUpdate":typeof e.UNSAFE_componentWillUpdate=="function"&&(i="UNSAFE_componentWillUpdate"),o!==null||n!==null||i!==null){var a=t.displayName||t.name,s=typeof t.getDerivedStateFromProps=="function"?"getDerivedStateFromProps()":"getSnapshotBeforeUpdate()";throw Error(`Unsafe legacy lifecycles will not be called for components using new component APIs.

`+a+" uses "+s+" but also contains the following legacy lifecycles:"+(o!==null?`
  `+o:"")+(n!==null?`
  `+n:"")+(i!==null?`
  `+i:"")+`

The above lifecycles should be removed. Learn more about this warning here:
https://fb.me/react-async-component-lifecycle-hooks`)}if(typeof t.getDerivedStateFromProps=="function"&&(e.componentWillMount=l,e.componentWillReceiveProps=r),typeof e.getSnapshotBeforeUpdate=="function"){if(typeof e.componentDidUpdate!="function")throw new Error("Cannot polyfill getSnapshotBeforeUpdate() for components that do not define componentDidUpdate() on the prototype");e.componentWillUpdate=p;var c=e.componentDidUpdate;e.componentDidUpdate=function(f,u,d){var m=this.__reactInternalSnapshotFlag?this.__reactInternalSnapshot:d;c.call(this,f,u,m)}}return t}const v=Object.freeze(Object.defineProperty({__proto__:null,polyfill:y},Symbol.toStringTag,{value:"Module"})),S=h(v);export{S as r};
