(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{107:function(e,t,r){"use strict";r.d(t,"a",(function(){return p})),r.d(t,"b",(function(){return b}));var n=r(0),o=r.n(n);function c(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){c(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function u(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},c=Object.keys(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var s=o.a.createContext({}),l=function(e){var t=o.a.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=l(e.components);return o.a.createElement(s.Provider,{value:t},e.children)},f={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},d=o.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,c=e.originalType,a=e.parentName,s=u(e,["components","mdxType","originalType","parentName"]),p=l(r),d=n,b=p["".concat(a,".").concat(d)]||p[d]||f[d]||c;return r?o.a.createElement(b,i(i({ref:t},s),{},{components:r})):o.a.createElement(b,i({ref:t},s))}));function b(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var c=r.length,a=new Array(c);a[0]=d;var i={};for(var u in t)hasOwnProperty.call(t,u)&&(i[u]=t[u]);i.originalType=e,i.mdxType="string"==typeof e?e:n,a[1]=i;for(var s=2;s<c;s++)a[s]=r[s];return o.a.createElement.apply(null,a)}return o.a.createElement.apply(null,r)}d.displayName="MDXCreateElement"},88:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return a})),r.d(t,"metadata",(function(){return i})),r.d(t,"toc",(function(){return u})),r.d(t,"default",(function(){return l}));var n=r(3),o=r(7),c=(r(0),r(107)),a={id:"quick-start",title:"\u4e0a\u624b",sidebar_label:"\u5feb\u901f\u5f00\u59cb",slug:"/"},i={unversionedId:"quick-start",id:"quick-start",isDocsHomePage:!1,title:"\u4e0a\u624b",description:"\u5148\u6765\u5b89\u88c5\u4e0b",source:"@site/docs/quick-start.md",slug:"/",permalink:"/structured-react-hook/docs/",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/quick-start.md",version:"current",sidebar_label:"\u5feb\u901f\u5f00\u59cb",sidebar:"docs",previous:{title:"\u9605\u8bfb\u5efa\u8bae",permalink:"/structured-react-hook/docs/how-read"},next:{title:"\u603b\u4f53\u8bbe\u8ba1",permalink:"/structured-react-hook/docs/overview"}},u=[],s={toc:u};function l(e){var t=e.components,r=Object(o.a)(e,["components"]);return Object(c.b)("wrapper",Object(n.a)({},s,r,{components:t,mdxType:"MDXLayout"}),Object(c.b)("p",null,"\u5148\u6765\u5b89\u88c5\u4e0b"),Object(c.b)("pre",null,Object(c.b)("code",{parentName:"pre",className:"language-js"},"yarn add structured-react-hook\n\n")),Object(c.b)("p",null,"\u8fd9\u662f\u4e00\u4e2a\u57fa\u672c\u793a\u4f8b, \u58f0\u660e\u72b6\u6001, \u901a\u8fc7\u63a7\u5236\u5668\u4fee\u6539\u72b6\u6001\u89e6\u53d1\u6e32\u67d3"),Object(c.b)("pre",null,Object(c.b)("code",{parentName:"pre",className:"language-js"},"import React, { useEffect } from 'react'\nimport createStore from 'structured-react-hook'\n\nconst storeConfig = {\n  initState: {\n    text: ''\n  },\n  controller: {\n    onComponentInit () {\n      this.rc.setText('hello world')\n    }\n  }\n}\nconst useStore = createStore(storeConfig)\n\nfunction App () {\n  const store = useStore()\n  useEffect(() => {\n    store.controller.onComponentInit()\n  }, [])\n  return <div>{store.state.text}</div>\n}\n")),Object(c.b)("p",null,"So Easy!!"))}l.isMDXComponent=!0}}]);