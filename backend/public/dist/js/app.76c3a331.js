(function(e){function t(t){for(var a,i,o=t[0],c=t[1],d=t[2],l=0,f=[];l<o.length;l++)i=o[l],Object.prototype.hasOwnProperty.call(s,i)&&s[i]&&f.push(s[i][0]),s[i]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(e[a]=c[a]);u&&u(t);while(f.length)f.shift()();return r.push.apply(r,d||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],a=!0,i=1;i<n.length;i++){var c=n[i];0!==s[c]&&(a=!1)}a&&(r.splice(t--,1),e=o(o.s=n[0]))}return e}var a={},s={app:0},r=[];function i(e){return o.p+"js/"+({about:"about"}[e]||e)+"."+{about:"26d170ff"}[e]+".js"}function o(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.e=function(e){var t=[],n=s[e];if(0!==n)if(n)t.push(n[2]);else{var a=new Promise((function(t,a){n=s[e]=[t,a]}));t.push(n[2]=a);var r,c=document.createElement("script");c.charset="utf-8",c.timeout=120,o.nc&&c.setAttribute("nonce",o.nc),c.src=i(e);var d=new Error;r=function(t){c.onerror=c.onload=null,clearTimeout(l);var n=s[e];if(0!==n){if(n){var a=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+a+": "+r+")",d.name="ChunkLoadError",d.type=a,d.request=r,n[1](d)}s[e]=void 0}};var l=setTimeout((function(){r({type:"timeout",target:c})}),12e4);c.onerror=c.onload=r,document.head.appendChild(c)}return Promise.all(t)},o.m=e,o.c=a,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)o.d(n,a,function(t){return e[t]}.bind(null,a));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/",o.oe=function(e){throw console.error(e),e};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],d=c.push.bind(c);c.push=t,c=c.slice();for(var l=0;l<c.length;l++)t(c[l]);var u=d;r.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},"0fae":function(e,t,n){"use strict";var a=n("67d1"),s=n.n(a);s.a},"214b":function(e,t,n){},"3f7f":function(e,t,n){"use strict";var a=n("5df5"),s=n.n(a);s.a},4678:function(e,t,n){var a={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b469","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb71","./de-ch.js":"bb71","./de.js":"b469","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"7333","./en-il.js":"7333","./en-in":"ec2e","./en-in.js":"ec2e","./en-nz":"6f50","./en-nz.js":"6f50","./en-sg":"b7e9","./en-sg.js":"b7e9","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df4","./fa.js":"8df4","./fi":"81e9","./fi.js":"81e9","./fil":"d69a","./fil.js":"d69a","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e49","./fr-ch.js":"0e49","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./ga":"5120","./ga.js":"5120","./gd":"f6b4","./gd.js":"f6b4","./gl":"8840","./gl.js":"8840","./gom-deva":"aaf2","./gom-deva.js":"aaf2","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it-ch":"6f12","./it-ch.js":"6f12","./it.js":"6e98","./ja":"079e","./ja.js":"079e","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ku":"2421","./ku.js":"2421","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fb","./ml.js":"02fb","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"6403","./ms-my.js":"6403","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./oc-lnc":"167b","./oc-lnc.js":"167b","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd","./sv.js":"5fbd","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tk":"5aff","./tk.js":"5aff","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-mo":"3a6c","./zh-mo.js":"3a6c","./zh-tw":"90ea","./zh-tw.js":"90ea"};function s(e){var t=r(e);return n(t)}function r(e){if(!n.o(a,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return a[e]}s.keys=function(){return Object.keys(a)},s.resolve=r,e.exports=s,s.id="4678"},5021:function(e,t,n){"use strict";var a=n("da7f"),s=n.n(a);s.a},"5c0b":function(e,t,n){"use strict";var a=n("9c0c"),s=n.n(a);s.a},"5df5":function(e,t,n){},"67d1":function(e,t,n){},"7ddd":function(e,t,n){},"9c0c":function(e,t,n){},ba1a:function(e,t,n){"use strict";var a=n("7ddd"),s=n.n(a);s.a},bf91:function(e,t,n){},c640:function(e,t,n){},c924:function(e,t,n){"use strict";var a=n("bf91"),s=n.n(a);s.a},cd49:function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("2b0e"),s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("div",{attrs:{id:"nav"}},[n("router-link",{attrs:{to:"/"}},[e._v("Home")]),e._v(" | "),n("router-link",{attrs:{to:"/about"}},[e._v("About")])],1),n("router-view")],1)},r=[],i=(n("5c0b"),n("2877")),o={},c=Object(i["a"])(o,s,r,!1,null,null,null),d=c.exports,l=n("9483");Object(l["a"])("".concat("/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});n("d3b7");var u=n("8c4f"),f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"home"},[n("Calendar",{attrs:{msg:"Welcome to Your Vue.js App"}})],1)},v=[],b=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"calendar"},[n("button",{staticStyle:{position:"fixed",left:"0"},attrs:{"data-dir":"-1"},on:{click:e.shift}},[e._v("<")]),n("button",{staticStyle:{position:"fixed",right:"0"},attrs:{"data-dir":"+1"},on:{click:e.shift}},[e._v(">")]),n("div",{attrs:{id:"table"}},[n("div",[n("div",{staticClass:"hour",staticStyle:{color:"white"}},[e._v(e._s(e.date))]),e._l(e.hours,(function(t){return n("div",{key:t,staticClass:"hour"},[e._v(e._s(t))])}))],2),e._l(e.dates,(function(t){var a=t.day,s=t.date,r=t.text,i=t.isWeekend;return n("div",{key:s,staticClass:"date"},[n("div",{class:"hour "+(i&&"weekend")},[n("div",[e._v(e._s(a))]),n("div",[e._v(e._s(r))])]),e._l(e.hours,(function(t){return n("div",{key:t,ref:s+"-"+t,refInFor:!0,class:"hour "+(i&&"weekend"),attrs:{"data-date":s,"data-time":t,"data-hour":t.substring(0,2),title:s+"-"+t,disabled:i},on:{click:function(t){return t.stopPropagation(),e.showDialog(t)}}},[e.events[s]&&e.events[s][t]?n("AppEvent",{attrs:{event:e.events[s][t]},on:{edit:function(t){return e.event=t}}}):e._e()],1)}))],2)})),n("hr",{staticStyle:{position:"absolute","z-index":"4",width:"100%",border:"solid 1px green"},attrs:{id:"currentTime"}})],2),e.event?n("EventDialog",{attrs:{event:e.event},on:{dismiss:function(t){e.event=null},update:e.renderEvent,delete:e.deleteEvent}}):e._e()],1)},m=[],p=(n("4160"),n("d81d"),n("a9e3"),n("159b"),n("ddb0"),n("2909")),h=n("ade3"),j=n("5530"),y=n("c1df"),g=n.n(y),k=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("Modal",{attrs:{open:!0},on:{dismiss:function(t){return e.$emit("dismiss")}},scopedSlots:e._u([{key:"header",fn:function(){return[n("h3",[e._v("Invite fabrigeas to an event")])]},proxy:!0},{key:"body",fn:function(){return[n("form",{on:{submit:function(t){return t.preventDefault(),e.submitEvent(t)}}},[n("formGroup",{attrs:{label:"Title of the event",model:e.event.title,invalid:e.event.title.length<2,attrs:{required:!0,autofocus:!0}},on:{"update:model":function(t){return e.$set(e.event,"title",t)}}}),n("formGroup",{attrs:{label:"Note",type:"textarea",model:e.event.note},on:{"update:model":function(t){return e.$set(e.event,"note",t)}}},[e._v(e._s(e.event.note))]),n("formGroup",{attrs:{label:"organizer",type:"email",model:e.event.organizer.email,invalid:e.event.organizer.email.length<2,attrs:{required:!0}},on:{"update:model":function(t){return e.$set(e.event.organizer,"email",t)}}}),n("formGroup",{attrs:{label:"Location",type:"textarea",model:e.event.location},on:{"update:model":function(t){return e.$set(e.event,"location",t)}}},[e._v(e._s(e.event.location))]),n("fieldset",[n("legend",[e._v("Links")]),n("div",{staticClass:"links-row"},[n("formGroup",{attrs:{label:"Link to the Meeting",model:e.link,attrs:{placeholder:"Please paste your link here"}},on:{"update:model":function(t){e.link=t}}}),n("span",[n("button",{attrs:{type:"button",disabled:e.link.length<5},on:{click:e.addLink}},[e._v("save")])])],1),n("ul",{staticClass:"links"},e._l(e.event.links,(function(t,a){return n("li",{key:a},[n("a",{staticClass:"link",attrs:{href:t}},[e._v(e._s(t))]),n("a",{staticClass:"delete",attrs:{href:"#"},on:{click:function(t){return t.preventDefault(),e.event.links.splice(a,1)}}},[e._v("delete")])])})),0)]),n("fieldset",[n("legend",[e._v("Dates")]),n("div",{staticClass:"doubled-container"},[n("div",{staticClass:"doubled"},[n("formGroup",{attrs:{label:"Starts on",type:"date",model:e.event.startDate,value:e.event.startDate,attrs:{required:!0}},on:{"update:model":function(t){return e.$set(e.event,"startDate",t)}}}),n("formGroup",{attrs:{label:"starts at",type:"time",model:e.event.startTime,invalid:e.event.startTime.length<2,attrs:{required:!0}},on:{"update:model":function(t){return e.$set(e.event,"startTime",t)}}})],1),n("div",{staticClass:"doubled"},[n("formGroup",{attrs:{label:"Ends on",type:"date",model:e.event.endDate,value:e.event.endDate,invalid:e.event.endDate.length<2,attrs:{required:!1,min:e.event.startDate}},on:{"update:model":function(t){return e.$set(e.event,"endDate",t)}}}),n("formGroup",{attrs:{label:"Ends at",type:"time",model:e.event.endTime,value:e.event.endTime,invalid:e.event.endTime.length<2,attrs:{required:!0,min:e.event.startTime}},on:{"update:model":function(t){return e.$set(e.event,"endTime",t)}}})],1)])]),n("div",{staticClass:"buttons-container"},[n("button",{staticClass:"danger",staticStyle:{float:"left"},attrs:{type:"button"},on:{click:function(t){e.showConfirmationModal=!0}}},[e._v(" delete this event ")]),n("button",{staticClass:"warning",staticStyle:{"margin-right":"0.5rem"},attrs:{type:"button"},on:{click:function(t){return e.$emit("dismiss")}}},[e._v(" cancel ")]),n("input",{staticClass:"submit",attrs:{type:"submit",value:"submit"}})])],1)]},proxy:!0}])},[n("ConfirmationDialog",{attrs:{open:e.showConfirmationModal,message:"Do you really want to delete this event?",cancelText:"Cancel",confirmText:"Delete"},on:{dismiss:function(t){e.showConfirmationModal=!1},confirmed:e.deleteEvent}})],1)},_=[],O=(n("9911"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"modal px-0",style:{display:e.open?"block":"none"}},[n("div",{staticClass:"modal-content"},[n("span",{staticClass:"close",on:{click:function(t){return t.stopPropagation(),e.$emit("dismiss")}}},[e._v("×")]),e.$slots.header?n("div",{staticClass:"modal-header"},[e._t("header")],2):e._e(),n("div",{staticClass:"modal-body"},[e._t("body"),e._t("default")],2),e.$slots.footer?n("div",{staticClass:"modal-footer"},[e._t("footer")],2):e._e()])])}),x=[],C=a["a"].extend({name:"Modal",props:{open:{type:Boolean,default:!1}}}),w=C,S=(n("e304"),Object(i["a"])(w,O,x,!1,null,"7efeccaf",null)),T=S.exports,D=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"form-group"},[this.label?n("label",{staticClass:"form-label",attrs:{for:e.id}},[e._v(e._s(e.label)+":")]):e._e(),n("FormControl",{attrs:{id:e.id,model:String(e.model),value:String(e.model),type:e.type,invalid:e.isInvalid,classes:e.classes,attrs:e.attrs,dataset:e.dataset,events:e.events,css:e.css},on:{update:function(t){return e.$emit("update:model",t)}}},[e._t("default")],2),e.validFeedback?n("div",{staticClass:"valid-feedback"},[e._v(e._s(e.validFeedback))]):e._e(),e.invalidFeedback?n("div",{staticClass:"invalid-feedback"},[e._v(" "+e._s(e.invalidFeedback)+" ")]):e._e()],1)},E=[],$=(n("99af"),n("4fad"),n("ac1f"),n("25f0"),n("1276"),n("3835")),M=n("11c1"),z=a["a"].extend({props:{id:{type:String},label:{type:String},value:{type:String},type:{type:String,default:"text"},invalid:{type:Boolean},invalidFeedback:{type:String},validFeedback:{type:String},css:{type:Object},classes:{type:String},attrs:Object,dataset:Object,events:Object},render:function(e){var t=this;return e("textarea"===this.type||"select"===this.type?this.type:"input",{class:["form-control",this.invalid?"is-invalid":"is-valid"].concat(Object(p["a"])(this.classes?this.classes.split(" ").toString().split(","):[])),style:Object(j["a"])({},this.css),attrs:Object(j["a"])(Object(j["a"])({id:this.id,value:this.value,type:this.type},this.attrs),this.dataset),on:Object(j["a"])({keyup:function(e){return t.onKeyUp(e)},change:function(e){return t.$emit("update",e.target.value)}},this.events)},this.$slots.default)},methods:{onKeyUp:function(e){if("textarea"===this.type){var t=this.$el;t.style.height="auto",t.style.height=t.scrollHeight+"px"}var n=e.target.value;this.$emit("update",n)}}}),q=a["a"].extend({components:{FormControl:z},props:{model:{required:!0,type:[String,Boolean,Number]},label:{type:String},type:{type:String,default:"text"},invalid:{type:Boolean},validFeedback:{type:String},invalidFeedback:{type:String},css:{type:Object},classes:{type:String},attrs:Object,data:Object,events:Object},computed:{id:function(){return Object(M["v4"])()},dataset:function(){var e={};if(this.data)for(var t=0,n=Object.entries(this.data);t<n.length;t++){var a=Object($["a"])(n[t],2),s=a[0],r=a[1];e["data-".concat(s)]=r}return e},isInvalid:function(){var e;return this.invalid||!!(null===(e=this.attrs)||void 0===e?void 0:e.required)&&String(this.model).length<2}}}),N=q,Y=(n("d639"),Object(i["a"])(N,D,E,!1,null,"c0d1888a",null)),F=Y.exports,P=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("Modal",{staticClass:"confirmation",attrs:{open:e.open,type:e.type},on:{dismiss:function(t){return e.$emit("dismiss")}},scopedSlots:e._u([{key:"header",fn:function(){return[n("p",[e._v(e._s(e.message))])]},proxy:!0},{key:"body",fn:function(){return[n("div",{class:"alert alertconfirmation"},[n("div",{staticClass:"d-flex"},[n("button",{staticClass:"btn danger",on:{click:function(t){return e.$emit("confirmed",!1)}}},[e._v(" "+e._s(e.cancelText)+" ")]),n("button",{staticClass:"btn success",on:{click:function(t){return e.$emit("confirmed",!0)}}},[e._v(" "+e._s(e.confirmText)+" ")])])])]},proxy:!0}])})},A=[],G=a["a"].extend({name:"ConfirmationDialog",components:{Modal:T},props:{type:{type:String},open:{type:Boolean,required:!0},message:{type:String,required:!0},confirmText:{type:String,required:!0},cancelText:{type:String,required:!0}}}),H=G,L=(n("3f7f"),Object(i["a"])(H,P,A,!1,null,"4fbe7200",null)),I=L.exports;function B(e,t){var n=e.split(":"),a=Object($["a"])(n,2),s=a[0],r=a[1],i=Number(r)+Number(t),o=Number(s)+Math.floor(i/60),c=i%60;return"".concat(o<10?"0"+o:o,":").concat(c<10?"0"+c:c)}function U(e,t){var n=e.split(":"),a=Object($["a"])(n,2),s=a[0],r=a[1],i=t.split(":"),o=Object($["a"])(i,2),c=o[0],d=o[1],l=Number(c),u=Number(d),f=60*Math.abs(l-Number(s)),v=u-Number(r);return f+v}var W="http://localhost:3000/api/events",J=a["a"].extend({components:{Modal:T,FormGroup:F,ConfirmationDialog:I},props:{event:{type:Object,required:!0}},data:function(){return{link:"",showConfirmationModal:!1}},methods:{addLink:function(){this.link&&this.event.links.push(this.link),this.link=""},submitEvent:function(){var e=this,t=this.event;if(t){var n=t.startDate,a=t.startTime,s=t.endTime,r=t.endDate,i=g()(n),o=g()(r);t.days=Math.abs(i.diff(o,"days"))+1,t.duration=U(a,s);var c=[W,"POST",t.id],d=c[0],l=c[1],u=c[2];u&&(d="".concat(W,"/").concat(u),l="PUT"),fetch(d,{headers:{"Content-Type":"application/json"},method:l,body:JSON.stringify(t)}).then((function(e){return e.json()})).then((function(t){e.$emit("update",t)})).catch((function(t){console.error("toast this error",t),e.$emit("dismiss")}))}},deleteEvent:function(e){var t=this;if(this.showConfirmationModal=!1,e){var n=this.event;fetch("".concat(W,"/").concat(n.id),{headers:{"Content-Type":"application/json"},method:"DELETE"}).then((function(e){return e.json()})).then((function(e){t.$emit("delete",e)})).catch((function(e){console.error("toast this error",e),t.$emit("dismiss")}))}}}}),K=J,V=(n("5021"),Object(i["a"])(K,k,_,!1,null,"734a0c2a",null)),Q=V.exports,R=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-event",style:e.style,attrs:{title:e.event.title},on:{click:function(t){return t.stopPropagation(),e.$emit("edit",e.event)}}},[n("div",{staticClass:"title"},[e._v(e._s(e.event.title))]),n("div",{staticClass:"duration"},[e._v(e._s(e.event.startTime)+" - "+e._s(e.event.endTime))])])},X=[],Z=a["a"].extend({props:{event:{type:Object}},data:function(){return{showModal:!1,height:document.querySelector(".hour").offsetHeight,width:document.querySelector(".hour").offsetWidth}},computed:{style:function(){var e=this.event,t=e.days,n=e.duration;return{height:this.height*((n>30?n-2:n)/60)+"px",width:"".concat(this.width*t-t,"px")}}}}),ee=Z,te=(n("0fae"),Object(i["a"])(ee,R,X,!1,null,"0d3bf50b",null)),ne=te.exports,ae="http://localhost:3000/api/events",se=a["a"].extend({name:"MyCalendar",components:{AppEvent:ne,EventDialog:Q},data:function(){return{events:{},event:null,date:g()().format("ddd, DD-MM-YYYY"),dayIndex:0}},methods:{showDialog:function(e){var t=e.target,n=t.dataset,a=n.date,s=n.time,r=a||g()().format("YYYY-MM-DD"),i=s||g()().format("HH:SS"),o=B(i,30);this.event={title:"",note:"",startDate:r,startTime:i,endDate:r,endTime:o,days:0,duration:0,location:"",organizer:{email:"fabrigeas@gmail.com"},concerned:"fabrigeas@hotmail.com",links:[],downloadCSV:!0}},shift:function(e){var t=e.target,n=t.dataset.dir;this.dayIndex+=1*Number(n)},addEvent:function(e){this.events=Object(j["a"])(Object(j["a"])({},this.events),{},Object(h["a"])({},e.startDate,Object(h["a"])({},e.startTime,Object(j["a"])({},e))))},initTimeline:function(){function e(){var e=document.getElementById("currentTime"),t=g()().format("HH"),n=Number(g()().format("MM")),a=document.querySelector("[data-hour='".concat(t,"']"));if(a){e.hidden=!1;var s=a.offsetTop+10,r=a.offsetHeight,i=Math.ceil(100*n)/60/100*r;e.style.top="".concat(s+i,"px")}else e.hidden=!0}e(),setTimeout(e,6e4)},renderEvent:function(e){this.events=Object(j["a"])(Object(j["a"])({},this.events),{},Object(h["a"])({},e.startDate,Object(h["a"])({},e.startTime,e))),this.event=null},deleteEvent:function(e){delete this.events[e.startDate][e.startTime],this.event=null}},computed:{hours:function(){for(var e=[],t=7;t<19;t++){var n="".concat(t<10?"0"+t:t,":00");e.push(n)}return e},dates:function(){var e=this;return Object(p["a"])(Array(7).keys()).map((function(t){var n=g()().add(t+e.dayIndex,"d"),a=n.isoWeekday();return{day:n.format("ddd"),date:n.format("YYYY-MM-DD"),text:n.format("ddd, DD-MM-YYYY"),isWeekend:6===a||7===a}}))}},mounted:function(){var e=this;fetch(ae).then((function(e){return e.json()})).then((function(t){return t.forEach(e.renderEvent)})),this.initTimeline()}}),re=se,ie=(n("ba1a"),Object(i["a"])(re,b,m,!1,null,"6524770e",null)),oe=ie.exports,ce={name:"Home",components:{Calendar:oe}},de=ce,le=(n("c924"),Object(i["a"])(de,f,v,!1,null,"006bb61b",null)),ue=le.exports;a["a"].use(u["a"]);var fe=[{path:"/",name:"Home",component:ue},{path:"/about",name:"About",component:function(){return n.e("about").then(n.bind(null,"f820"))}}],ve=new u["a"]({mode:"history",base:"/",routes:fe}),be=ve,me=n("2f62");a["a"].use(me["a"]);var pe=new me["a"].Store({state:{},mutations:{},actions:{},modules:{}});a["a"].config.productionTip=!1,new a["a"]({router:be,store:pe,render:function(e){return e(d)}}).$mount("#app")},d639:function(e,t,n){"use strict";var a=n("214b"),s=n.n(a);s.a},da7f:function(e,t,n){},e304:function(e,t,n){"use strict";var a=n("c640"),s=n.n(a);s.a}});
//# sourceMappingURL=app.76c3a331.js.map