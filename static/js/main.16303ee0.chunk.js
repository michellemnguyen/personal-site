(this.webpackJsonpportfolio=this.webpackJsonpportfolio||[]).push([[0],{13:function(e,t,a){},14:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(7),i=a.n(c),o=(a(13),a(1)),l=a(2),s=a(4),u=a(3),b=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(o.a)(this,a);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).setActive=function(){return e.props.tab.id===e.props.activeTab?{borderBottom:"3px solid rgb(68, 190, 190)"}:{borderBottom:"3px solid darkgray"}},e}return Object(l.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"nav-tab",style:this.setActive(),onClick:this.props.changeTab.bind(this,this.props.tab.id)},this.props.tab.title)}}]),a}(n.Component),m=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"render",value:function(){var e=this;return this.props.tabs.map((function(t){return r.a.createElement(b,{tab:t,activeTab:e.props.activeTab,changeTab:e.props.changeTab})}))}}]),a}(n.Component),p=(a(6),function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("div",{className:"statement"},"Hi, I'm ",r.a.createElement("b",null,"Michelle Nguyen!")),r.a.createElement("div",{className:"tagline"},"4th Year Computer Engineering @ UCSB"))}}]),a}(n.Component)),d=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,"PROJECTS")}}]),a}(n.Component),v=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("div",{className:"page-title"},"Travel"),r.a.createElement("div",{className:"travel-entry"},r.a.createElement("div",{className:"video-container"},r.a.createElement("iframe",{title:"1 Second/Day",src:"https://www.youtube.com/embed/5_dbVMXtqNs",frameborder:"0",width:"100%",height:"250%",allow:"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",allowfullscreen:!0})),r.a.createElement("div",{className:"video-container"},r.a.createElement("iframe",{title:"summer 2018",src:"https://www.youtube.com/embed/BCly0NsWc-g",frameborder:"0",width:"100%",height:"250%",allow:"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",allowfullscreen:!0}))))}}]),a}(n.Component),h=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,"ABOUT")}}]),a}(n.Component),f=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(o.a)(this,a);for(var n=arguments.length,c=new Array(n),i=0;i<n;i++)c[i]=arguments[i];return(e=t.call.apply(t,[this].concat(c))).displayContent=function(){switch(e.props.activeTab){case 1:return r.a.createElement(p,null);case 2:return r.a.createElement(d,null);case 3:return r.a.createElement(v,null);case 4:return r.a.createElement(h,null);default:return"404"}},e}return Object(l.a)(a,[{key:"render",value:function(){return this.displayContent()}}]),a}(n.Component),y=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(){var e;return Object(o.a)(this,a),(e=t.call(this)).state={activeTab:1},e.changeTab=function(t){e.setState({activeTab:t})},e}return Object(l.a)(a,[{key:"render",value:function(){return this.tabs=[{id:1,title:"Home"},{id:2,title:"Projects"},{id:3,title:"Travel"},{id:4,title:"About"}],r.a.createElement("div",{className:"body"},r.a.createElement("div",{className:"nav-bar"},r.a.createElement(m,{tabs:this.tabs,activeTab:this.state.activeTab,changeTab:this.changeTab})),r.a.createElement("div",{className:"actual-body"},r.a.createElement(f,{activeTab:this.state.activeTab})))}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(y,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},6:function(e,t,a){},8:function(e,t,a){e.exports=a(14)}},[[8,1,2]]]);
//# sourceMappingURL=main.16303ee0.chunk.js.map