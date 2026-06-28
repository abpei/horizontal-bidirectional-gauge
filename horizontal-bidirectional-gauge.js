"use strict";(()=>{var oe=Object.defineProperty;var ke=Object.getOwnPropertyDescriptor;var Pe=(o,e,t)=>e in o?oe(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var V=(o,e,t,r)=>{for(var s=r>1?void 0:r?ke(e,t):e,i=o.length-1,n;i>=0;i--)(n=o[i])&&(s=(r?n(e,t,s):n(s))||s);return r&&s&&oe(e,t,s),s};var L=(o,e,t)=>Pe(o,typeof e!="symbol"?e+"":e,t);var j=globalThis,D=j.ShadowRoot&&(j.ShadyCSS===void 0||j.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,W=Symbol(),ne=new WeakMap,C=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==W)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(D&&e===void 0){let r=t!==void 0&&t.length===1;r&&(e=ne.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&ne.set(t,e))}return e}toString(){return this.cssText}},ae=o=>new C(typeof o=="string"?o:o+"",void 0,W),G=(o,...e)=>{let t=o.length===1?o[0]:e.reduce((r,s,i)=>r+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+o[i+1],o[0]);return new C(t,o,W)},le=(o,e)=>{if(D)o.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let r=document.createElement("style"),s=j.litNonce;s!==void 0&&r.setAttribute("nonce",s),r.textContent=t.cssText,o.appendChild(r)}},Z=D?o=>o:o=>o instanceof CSSStyleSheet?(e=>{let t="";for(let r of e.cssRules)t+=r.cssText;return ae(t)})(o):o;var{is:Ne,defineProperty:Re,getOwnPropertyDescriptor:Ue,getOwnPropertyNames:Me,getOwnPropertySymbols:Te,getPrototypeOf:Oe}=Object,v=globalThis,ce=v.trustedTypes,ze=ce?ce.emptyScript:"",He=v.reactiveElementPolyfillSupport,k=(o,e)=>o,P={toAttribute(o,e){switch(e){case Boolean:o=o?ze:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,e){let t=o;switch(e){case Boolean:t=o!==null;break;case Number:t=o===null?null:Number(o);break;case Object:case Array:try{t=JSON.parse(o)}catch{t=null}}return t}},q=(o,e)=>!Ne(o,e),he={attribute:!0,type:String,converter:P,reflect:!1,useDefault:!1,hasChanged:q};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),v.litPropertyMetadata??(v.litPropertyMetadata=new WeakMap);var _=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=he){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let r=Symbol(),s=this.getPropertyDescriptor(e,r,t);s!==void 0&&Re(this.prototype,e,s)}}static getPropertyDescriptor(e,t,r){let{get:s,set:i}=Ue(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get:s,set(n){let l=s?.call(this);i?.call(this,n),this.requestUpdate(e,l,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??he}static _$Ei(){if(this.hasOwnProperty(k("elementProperties")))return;let e=Oe(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(k("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(k("properties"))){let t=this.properties,r=[...Me(t),...Te(t)];for(let s of r)this.createProperty(s,t[s])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[r,s]of t)this.elementProperties.set(r,s)}this._$Eh=new Map;for(let[t,r]of this.elementProperties){let s=this._$Eu(t,r);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let r=new Set(e.flat(1/0).reverse());for(let s of r)t.unshift(Z(s))}else e!==void 0&&t.push(Z(e));return t}static _$Eu(e,t){let r=t.attribute;return r===!1?void 0:typeof r=="string"?r:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let r of t.keys())this.hasOwnProperty(r)&&(e.set(r,this[r]),delete this[r]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return le(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,r){this._$AK(e,r)}_$ET(e,t){let r=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,r);if(s!==void 0&&r.reflect===!0){let i=(r.converter?.toAttribute!==void 0?r.converter:P).toAttribute(t,r.type);this._$Em=e,i==null?this.removeAttribute(s):this.setAttribute(s,i),this._$Em=null}}_$AK(e,t){let r=this.constructor,s=r._$Eh.get(e);if(s!==void 0&&this._$Em!==s){let i=r.getPropertyOptions(s),n=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:P;this._$Em=s;let l=n.fromAttribute(t,i.type);this[s]=l??this._$Ej?.get(s)??l,this._$Em=null}}requestUpdate(e,t,r,s=!1,i){if(e!==void 0){let n=this.constructor;if(s===!1&&(i=this[e]),r??(r=n.getPropertyOptions(e)),!((r.hasChanged??q)(i,t)||r.useDefault&&r.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,r))))return;this.C(e,t,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:r,reflect:s,wrapped:i},n){r&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,n??t??this[e]),i!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||r||(t=void 0),this._$AL.set(e,t)),s===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[s,i]of this._$Ep)this[s]=i;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[s,i]of r){let{wrapped:n}=i,l=this[s];n!==!0||this._$AL.has(s)||l===void 0||this.C(s,void 0,i,l)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(r=>r.hostUpdate?.()),this.update(t)):this._$EM()}catch(r){throw e=!1,this._$EM(),r}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};_.elementStyles=[],_.shadowRootOptions={mode:"open"},_[k("elementProperties")]=new Map,_[k("finalized")]=new Map,He?.({ReactiveElement:_}),(v.reactiveElementVersions??(v.reactiveElementVersions=[])).push("2.1.2");var R=globalThis,pe=o=>o,B=R.trustedTypes,de=B?B.createPolicy("lit-html",{createHTML:o=>o}):void 0,be="$lit$",b=`lit$${Math.random().toFixed(9).slice(2)}$`,ge="?"+b,Le=`<${ge}>`,y=document,U=()=>y.createComment(""),M=o=>o===null||typeof o!="object"&&typeof o!="function",te=Array.isArray,je=o=>te(o)||typeof o?.[Symbol.iterator]=="function",K=`[ 	
\f\r]`,N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ue=/-->/g,me=/>/g,$=RegExp(`>|${K}(?:([^\\s"'>=/]+)(${K}*=${K}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),_e=/'/g,fe=/"/g,$e=/^(?:script|style|textarea|title)$/i,re=o=>(e,...t)=>({_$litType$:o,strings:e,values:t}),u=re(1),Je=re(2),Qe=re(3),x=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),ve=new WeakMap,w=y.createTreeWalker(y,129);function we(o,e){if(!te(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return de!==void 0?de.createHTML(e):e}var De=(o,e)=>{let t=o.length-1,r=[],s,i=e===2?"<svg>":e===3?"<math>":"",n=N;for(let l=0;l<t;l++){let a=o[l],h,d,c=-1,m=0;for(;m<a.length&&(n.lastIndex=m,d=n.exec(a),d!==null);)m=n.lastIndex,n===N?d[1]==="!--"?n=ue:d[1]!==void 0?n=me:d[2]!==void 0?($e.test(d[2])&&(s=RegExp("</"+d[2],"g")),n=$):d[3]!==void 0&&(n=$):n===$?d[0]===">"?(n=s??N,c=-1):d[1]===void 0?c=-2:(c=n.lastIndex-d[2].length,h=d[1],n=d[3]===void 0?$:d[3]==='"'?fe:_e):n===fe||n===_e?n=$:n===ue||n===me?n=N:(n=$,s=void 0);let f=n===$&&o[l+1].startsWith("/>")?" ":"";i+=n===N?a+Le:c>=0?(r.push(h),a.slice(0,c)+be+a.slice(c)+b+f):a+b+(c===-2?l:f)}return[we(o,i+(o[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),r]},T=class o{constructor({strings:e,_$litType$:t},r){let s;this.parts=[];let i=0,n=0,l=e.length-1,a=this.parts,[h,d]=De(e,t);if(this.el=o.createElement(h,r),w.currentNode=this.el.content,t===2||t===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(s=w.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let c of s.getAttributeNames())if(c.endsWith(be)){let m=d[n++],f=s.getAttribute(c).split(b),H=/([.?@])?(.*)/.exec(m);a.push({type:1,index:i,name:H[2],strings:f,ctor:H[1]==="."?J:H[1]==="?"?Q:H[1]==="@"?Y:S}),s.removeAttribute(c)}else c.startsWith(b)&&(a.push({type:6,index:i}),s.removeAttribute(c));if($e.test(s.tagName)){let c=s.textContent.split(b),m=c.length-1;if(m>0){s.textContent=B?B.emptyScript:"";for(let f=0;f<m;f++)s.append(c[f],U()),w.nextNode(),a.push({type:2,index:++i});s.append(c[m],U())}}}else if(s.nodeType===8)if(s.data===ge)a.push({type:2,index:i});else{let c=-1;for(;(c=s.data.indexOf(b,c+1))!==-1;)a.push({type:7,index:i}),c+=b.length-1}i++}}static createElement(e,t){let r=y.createElement("template");return r.innerHTML=e,r}};function A(o,e,t=o,r){if(e===x)return e;let s=r!==void 0?t._$Co?.[r]:t._$Cl,i=M(e)?void 0:e._$litDirective$;return s?.constructor!==i&&(s?._$AO?.(!1),i===void 0?s=void 0:(s=new i(o),s._$AT(o,t,r)),r!==void 0?(t._$Co??(t._$Co=[]))[r]=s:t._$Cl=s),s!==void 0&&(e=A(o,s._$AS(o,e.values),s,r)),e}var X=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:r}=this._$AD,s=(e?.creationScope??y).importNode(t,!0);w.currentNode=s;let i=w.nextNode(),n=0,l=0,a=r[0];for(;a!==void 0;){if(n===a.index){let h;a.type===2?h=new O(i,i.nextSibling,this,e):a.type===1?h=new a.ctor(i,a.name,a.strings,this,e):a.type===6&&(h=new ee(i,this,e)),this._$AV.push(h),a=r[++l]}n!==a?.index&&(i=w.nextNode(),n++)}return w.currentNode=y,s}p(e){let t=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(e,r,t),t+=r.strings.length-2):r._$AI(e[t])),t++}},O=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,r,s){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=A(this,e,t),M(e)?e===p||e==null||e===""?(this._$AH!==p&&this._$AR(),this._$AH=p):e!==this._$AH&&e!==x&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):je(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==p&&M(this._$AH)?this._$AA.nextSibling.data=e:this.T(y.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:r}=e,s=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=T.createElement(we(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(t);else{let i=new X(s,this),n=i.u(this.options);i.p(t),this.T(n),this._$AH=i}}_$AC(e){let t=ve.get(e.strings);return t===void 0&&ve.set(e.strings,t=new T(e)),t}k(e){te(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,r,s=0;for(let i of e)s===t.length?t.push(r=new o(this.O(U()),this.O(U()),this,this.options)):r=t[s],r._$AI(i),s++;s<t.length&&(this._$AR(r&&r._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let r=pe(e).nextSibling;pe(e).remove(),e=r}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},S=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,r,s,i){this.type=1,this._$AH=p,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=i,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=p}_$AI(e,t=this,r,s){let i=this.strings,n=!1;if(i===void 0)e=A(this,e,t,0),n=!M(e)||e!==this._$AH&&e!==x,n&&(this._$AH=e);else{let l=e,a,h;for(e=i[0],a=0;a<i.length-1;a++)h=A(this,l[r+a],t,a),h===x&&(h=this._$AH[a]),n||(n=!M(h)||h!==this._$AH[a]),h===p?e=p:e!==p&&(e+=(h??"")+i[a+1]),this._$AH[a]=h}n&&!s&&this.j(e)}j(e){e===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},J=class extends S{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===p?void 0:e}},Q=class extends S{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==p)}},Y=class extends S{constructor(e,t,r,s,i){super(e,t,r,s,i),this.type=5}_$AI(e,t=this){if((e=A(this,e,t,0)??p)===x)return;let r=this._$AH,s=e===p&&r!==p||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,i=e!==p&&(r===p||s);s&&this.element.removeEventListener(this.name,this,r),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},ee=class{constructor(e,t,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){A(this,e)}};var qe=R.litHtmlPolyfillSupport;qe?.(T,O),(R.litHtmlVersions??(R.litHtmlVersions=[])).push("3.3.3");var ye=(o,e,t)=>{let r=t?.renderBefore??e,s=r._$litPart$;if(s===void 0){let i=t?.renderBefore??null;r._$litPart$=s=new O(e.insertBefore(U(),i),i,void 0,t??{})}return s._$AI(o),s};var z=globalThis,g=class extends _{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;let e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=ye(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return x}};g._$litElement$=!0,g.finalized=!0,z.litElementHydrateSupport?.({LitElement:g});var Be=z.litElementPolyfillSupport;Be?.({LitElement:g});(z.litElementVersions??(z.litElementVersions=[])).push("4.2.2");var xe=o=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(o,e)}):customElements.define(o,e)};var Ie={attribute:!0,type:String,converter:P,reflect:!1,hasChanged:q},Fe=(o=Ie,e,t)=>{let{kind:r,metadata:s}=t,i=globalThis.litPropertyMetadata.get(s);if(i===void 0&&globalThis.litPropertyMetadata.set(s,i=new Map),r==="setter"&&((o=Object.create(o)).wrapped=!0),i.set(t.name,o),r==="accessor"){let{name:n}=t;return{set(l){let a=e.get.call(this);e.set.call(this,l),this.requestUpdate(n,a,o,!0,l)},init(l){return l!==void 0&&this.C(n,void 0,o,l),l}}}if(r==="setter"){let{name:n}=t;return function(l){let a=this[n];e.call(this,l),this.requestUpdate(n,a,o,!0,l)}}throw Error("Unsupported decorator location: "+r)};function Ae(o){return(e,t)=>typeof t=="object"?Fe(o,e,t):((r,s,i)=>{let n=s.hasOwnProperty(i);return s.constructor.createProperty(i,r),n?Object.getOwnPropertyDescriptor(s,i):void 0})(o,e,t)}function Se(o){return Ae({...o,state:!0,attribute:!1})}var se=100,Ee=12,F={negative_color:"var(--error-color)",positive_color:"var(--success-color)",zero_divider_color:"var(--secondary-text-color)",background_color:"var(--secondary-background-color)"},Ve=/^(#[0-9a-fA-F]{3,8}|(rgb|rgba|hsl|hsla)\([^)]*\)|var\(--[^)]+\)|[a-zA-Z]+)$/;function Ce(o){return Ve.test(o)}function ie(o){if(!o)return!1;let e=o.trim().toLowerCase();return e.startsWith("javascript:")||e.startsWith("data:")||e.startsWith("vbscript:")?!1:o.startsWith("/")||o.startsWith("./")}var E=class extends g{constructor(){super(...arguments);L(this,"_hass");L(this,"_config",null)}static getConfigForm(){return{schema:[{name:"entity",required:!0,selector:{entity:{}}},{type:"expandable",name:"range",label:"Range",flatten:!0,schema:[{name:"min",selector:{number:{min:-1e5,max:1e5,step:1}}},{name:"max",default:se,selector:{number:{min:-1e5,max:1e5,step:1}}}]},{type:"expandable",name:"colors",label:"Colors",flatten:!0,schema:[{name:"negative_color",selector:{ui_color:{}}},{name:"positive_color",selector:{ui_color:{}}},{name:"zero_divider_color",selector:{ui_color:{}}},{name:"background_color",selector:{ui_color:{}}}]},{type:"expandable",name:"labels",label:"Labels",flatten:!0,schema:[{name:"title",selector:{text:{}}},{name:"negative_label",selector:{text:{}}},{name:"positive_label",selector:{text:{}}},{name:"unit",selector:{text:{}}},{name:"precision",default:1,selector:{number:{min:0,max:5,step:1}}}]},{type:"expandable",name:"appearance",label:"Appearance",flatten:!0,schema:[{name:"bar_height",default:Ee,selector:{number:{min:4,max:50,step:1,unit_of_measurement:"px"}}},{name:"show_zero_divider",default:!0,selector:{boolean:{}}},{name:"show_value",default:!0,selector:{boolean:{}}},{name:"show_icon",default:!1,selector:{boolean:{}}},{name:"icon",selector:{icon:{}}},{name:"show_scale_units",default:!1,selector:{boolean:{}}}]},{type:"expandable",name:"behavior",label:"Behavior",flatten:!0,schema:[{name:"inverted",default:!1,selector:{boolean:{}}},{name:"animation",default:!0,selector:{boolean:{}}},{name:"tap_action",default:"more-info",selector:{select:{options:[{value:"more-info",label:"More-info"},{value:"toggle",label:"Toggle"},{value:"navigate",label:"Navigate"},{value:"none",label:"None"}]}}},{name:"navigate_path",selector:{text:{}}}]}],computeLabel:(i,n)=>({entity:"Entity",min:"Minimum value",max:"Maximum value",negative_color:"Negative (export) color",positive_color:"Positive (import) color",zero_divider_color:"Zero divider color",background_color:"Background color",title:"Card title",negative_label:"Negative label",positive_label:"Positive label",unit:"Unit override",precision:"Decimal precision",bar_height:"Bar height",show_zero_divider:"Show zero divider",show_value:"Show value",show_icon:"Show icon",icon:"Icon",show_scale_units:"Show scale units",inverted:"Invert direction",animation:"Flow animation",tap_action:"Tap action",navigate_path:"Navigate path"})[i.name]||n?.(`ui.panel.lovelace.editor.card.generic.${i.name}`)||i.name,assertConfig:i=>{if(!i.entity||typeof i.entity!="string"||i.entity.trim()==="")throw new Error("Entity is required");if(i.min!=null&&i.max!=null&&Number(i.min)>=Number(i.max))throw new Error("Minimum must be less than maximum");if(i.precision!=null){let a=Number(i.precision);if(!Number.isInteger(a)||a<0||a>5)throw new Error("Precision must be between 0 and 5")}if(i.bar_height!=null){let a=Number(i.bar_height);if(!Number.isInteger(a)||a<4||a>50)throw new Error("Bar height must be between 4 and 50 pixels")}let n=["more-info","toggle","navigate","none"];if(i.tap_action!=null&&!n.includes(i.tap_action))throw new Error(`tap_action must be one of: ${n.join(", ")}`);if(i.tap_action==="navigate"&&i.navigate_path!=null&&(typeof i.navigate_path!="string"||!ie(i.navigate_path)))throw new Error("navigate_path must start with '/' or './' \u2014 javascript:, data:, and vbscript: URLs are rejected");let l=["negative_color","positive_color","zero_divider_color","background_color"];for(let a of l){let h=i[a];if(h!=null&&typeof h=="string"&&!Ce(h))throw new Error(`${a} contains an invalid CSS color value \u2014 allowed: hex, rgb(), rgba(), hsl(), hsla(), var(), or CSS color keywords`)}}}}static getStubConfig(){return{entity:"",max:se}}getCardSize(){return 2}set hass(t){this._hass=t,this.requestUpdate()}get hass(){return this._hass}render(){if(!this._config)return p;let t=this._config,r=this.hass?.states?.[t.entity],s=!r||r.state==="unavailable"||r.state==="unknown",i=s?0:this._parseValue(r.state),n=this._clampValue(i),l=this._computeZeroPosition(),a=this._computeNegativeFill(n,l),h=this._computePositiveFill(n,l),d=s?"\u2014":this._formatValue(i),c=t.unit??r?.attributes?.unit_of_measurement??"",m=c?` ${c}`:"";return u`
      <ha-card class="card ${s?"unavailable":""}"
        @click=${this._handleAction}>
        ${this._renderTitleRow(d,m,r,t)}
        ${this._renderBarTrack(l,a,h,t)}
        ${this._renderScaleRow(t,l,c)}
      </ha-card>
    `}_renderTitleRow(t,r,s,i){if(i.title==="")return p;let n=i.title??s?.attributes?.friendly_name??i.entity,l=i.icon||s?.attributes?.icon||"";return u`
      <div class="title-row">
        <span class="title-row__name">${n}</span>
        <span class="title-row__value">
          ${i.show_icon&&l?u`<ha-icon
                class="title-row__icon"
                .icon=${l}
              ></ha-icon>`:p}
          ${i.show_value?u`<span>${t}${r}</span>`:p}
        </span>
      </div>
    `}_renderBarTrack(t,r,s,i){let n=i.animation?"animated":"";return u`
      <div class="bar-wrapper">
        ${i.negative_label?u`<span class="bar-label bar-label--negative"
              >${i.negative_label}</span
            >`:p}
        <div
          class="bar-track"
          style="height: ${i.bar_height}px; background: ${i.background_color};"
        >
          ${r>0?u`<div
                class="bar-track__fill bar-track__fill--negative ${n}"
                style="left: ${t-r}%; width: ${r}%; background: ${i.negative_color};"
              >
                <div class="flow-arrows flow-arrows--left ${i.animation?"flow-arrows--animated":""}">
                  ${"< ".repeat(40)}
                </div>
              </div>`:p}
          ${s>0?u`<div
                class="bar-track__fill bar-track__fill--positive ${n}"
                style="left: ${t}%; width: ${s}%; background: ${i.positive_color};"
              >
                <div class="flow-arrows flow-arrows--right ${i.animation?"flow-arrows--animated":""}">
                  ${" >".repeat(40)}
                </div>
              </div>`:p}
          ${i.show_zero_divider?u`<div
                class="bar-track__zero-divider"
                style="left: ${t}%; background: ${i.zero_divider_color};"
              ></div>`:p}
        </div>
        ${i.positive_label?u`<span class="bar-label bar-label--positive"
              >${i.positive_label}</span
            >`:p}
      </div>
    `}_renderScaleRow(t,r,s){let i=t.show_scale_units&&s?` ${s}`:"";return u`
      <div class="scale-row">
        <span class="scale-row__label scale-row__label--min"
          >${this._formatScaleLabel(t.min,t.precision)}${i}</span
        >
        <span class="scale-row__zero" style="left: ${r}%;">0${i}</span>
        <span class="scale-row__label scale-row__label--max"
          >${this._formatScaleLabel(t.max,t.precision)}${i}</span
        >
      </div>
    `}_computeZeroPosition(){let t=this._config;return(0-t.min)/(t.max-t.min)*100}_computeNegativeFill(t,r){let s=this._config.inverted?-t:t;if(s>=0)return 0;let i=this._config,n=Math.abs(i.min);return n===0?0:Math.abs(s)/n*r}_computePositiveFill(t,r){let s=this._config.inverted?-t:t;if(s<=0)return 0;let i=this._config,n=100-r;return i.max===0?0:s/i.max*n}_clampValue(t){let r=this._config;return Math.max(r.min,Math.min(r.max,t))}_parseValue(t){let r=parseFloat(t);return Number.isFinite(r)?r:0}_formatValue(t){let r=this._config;return t.toFixed(r.precision)}_buildBarBackground(t,r,s,i){let n=i.background_color,l=i.negative_color,a=i.positive_color,h=Math.max(0,t-r),d=Math.min(100,t+s),c=[];return r>0&&(c.push(`${n} ${h}%`),c.push(`${l} ${h}%`),c.push(`${l} ${t}%`)),s>0&&(c.push(`${n} ${t}%`),c.push(`${a} ${t}%`),c.push(`${a} ${d}%`)),c.length===0?n:(c.push(`${n} ${r>0?t:d}%`),`linear-gradient(to right, ${c.join(", ")})`)}_formatScaleLabel(t,r){return Number.isInteger(t)?t.toString():t.toFixed(r)}_handleAction(){if(!this._config||!this.hass)return;let t=this._config,r=t.tap_action??"more-info";if(r!=="none"){if(r==="more-info")this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:t.entity}}));else if(r==="toggle"&&t.entity){let s=t.entity.split(".")[0];this.hass.callService(s,"toggle",{entity_id:t.entity})}else if(r==="navigate"&&t.navigate_path){if(!ie(t.navigate_path))return;history.pushState(null,"",t.navigate_path),this.dispatchEvent(new Event("location-changed",{bubbles:!0}))}}}setConfig(t){if(!t.entity||typeof t.entity!="string"||t.entity.trim()==="")throw new Error("Entity is required");let r=t.max??se,s=t.min??-r;if(!Number.isFinite(s)||!Number.isFinite(r))throw new Error("min and max must be finite numbers");if(s>=r)throw new Error("min must be less than max");if(t.precision!=null){let h=Number(t.precision);if(!Number.isInteger(h)||h<0||h>5)throw new Error("Precision must be between 0 and 5")}if(t.bar_height!=null){let h=Number(t.bar_height);if(!Number.isInteger(h)||h<4||h>50)throw new Error("Bar height must be between 4 and 50 pixels")}let i=["more-info","toggle","navigate","none"];if(t.tap_action!=null&&!i.includes(t.tap_action))throw new Error(`tap_action must be one of: ${i.join(", ")}`);if(t.tap_action==="navigate"&&t.navigate_path!=null&&!ie(t.navigate_path))throw new Error("navigate_path must start with '/' or './' \u2014 javascript:, data:, and vbscript: URLs are rejected");let n=[{key:"negative_color",value:t.negative_color},{key:"positive_color",value:t.positive_color},{key:"zero_divider_color",value:t.zero_divider_color},{key:"background_color",value:t.background_color}];for(let{key:h,value:d}of n)if(d!=null&&!Ce(d))throw new Error(`${h} contains an invalid CSS color value \u2014 allowed: hex, rgb(), rgba(), hsl(), hsla(), var(), or CSS color keywords`);let l=t.precision??(r>=1e3?0:1),a=t.bar_height??Ee;this._config={entity:t.entity,min:s,max:r,negative_color:t.negative_color??F.negative_color,positive_color:t.positive_color??F.positive_color,zero_divider_color:t.zero_divider_color??F.zero_divider_color,background_color:t.background_color??F.background_color,title:t.title,negative_label:t.negative_label??"",positive_label:t.positive_label??"",unit:t.unit,precision:l,bar_height:a,show_zero_divider:t.show_zero_divider??!0,show_value:t.show_value??!0,show_icon:t.show_icon??!1,icon:t.icon??"",inverted:t.inverted??!1,animation:t.animation??!0,show_scale_units:t.show_scale_units??!1,tap_action:t.tap_action??"more-info",navigate_path:t.navigate_path??""}}};L(E,"styles",G`
    :host {
      display: block;
    }

    .card {
      padding: 4px 0 0px 0;
    }

    /* Title row — name left, icon + value right */
    .title-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px 4px 16px;
      min-height: 28px;
    }
    .title-row__name {
      font-size: 14px;
      font-weight: 500;
      color: var(--primary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: bold;
      margin: 0;
    }
    .title-row__value {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 14px;
      font-weight: 500;
      color: var(--primary-text-color);
      white-space: nowrap;
      font-weight: bold;
      margin-left: 8px;
    }
    .title-row__icon {
      --mdc-icon-size: 18px;
      color: var(--primary-text-color);
    }

    /* Bar track — contains fills, divider, and labels */
    .bar-wrapper {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 0 16px;
    }
    .bar-track {
      position: relative;
      flex: 1;
      border-radius: 6px;
      overflow: hidden;
    }

    /* Fill bars — absolutely positioned within the track, growing from zero */
    .bar-track__fill {
      position: absolute;
      top: 0;
      height: 100%;
      overflow: hidden;
    }
    .bar-track__fill--negative {
      border-radius: 6px 0 0 6px;
    }
    .bar-track__fill--positive {
      border-radius: 0 6px 6px 0;
    }

    /* Zero divider — thin vertical line at the zero position */
    .bar-track__zero-divider {
      position: absolute;
      top: 0;
      height: 100%;
      width: 2px;
      transform: translateX(-1px);
      z-index: 2;
    }

    /* Animation transition for smooth fill changes */
    .animated {
      transition: left 0.3s ease, width 0.3s ease;
    }

    /* Flow arrows — lightweight directional arrow characters */
    .flow-arrows {
      position: absolute;
      top: 0;
      height: 100%;
      display: flex;
      align-items: center;
      pointer-events: none;
      overflow: hidden;
      border-radius: inherit;
      white-space: nowrap;
      font-weight: bold;
      letter-spacing: 0.15em;
      font-size: 13px;
      color: rgba(255, 255, 255, 0.5);
    }
    .flow-arrows--left {
      left: 0;
      width: 100%;
    }
    .flow-arrows--right {
      right: 0;
      width: 100%;
      justify-content: flex-end;
    }
    .flow-arrows--animated {
      animation: arrow-pulse 2s ease-in-out infinite;
    }
    @keyframes arrow-pulse {
      0%, 100% { opacity: 0.3; }
      50% { opacity: 0.8; }
    }

    /* Unavailable state — dim the bar and fills */
    .unavailable .bar-track__negative-fill,
    .unavailable .bar-track__positive-fill,
    .unavailable .bar-track__zero-divider {
      opacity: 0.25;
    }

    /* Direction labels — positioned outside the bar track */
    .bar-label {
      font-size: 11px;
      color: var(--secondary-text-color);
      white-space: nowrap;
      font-weight: bold;
      min-width: 40px;
    }
    .bar-label--negative {
      text-align: right;
    }
    .bar-label--positive {
      text-align: left;
    }

    /* Scale labels row — min, zero, max beneath the bar */
    .scale-row {
      position: relative;
      padding: 2px 16px 4px 16px;
      font-size: 12px;
      color: var(--secondary-text-color);
      height: 20px;
    }
    .scale-row__label {
      position: absolute;
      font-size: 11px;
    }
    .scale-row__label--min {
      left: 16px;
    }
    .scale-row__label--max {
      right: 16px;
    }
    .scale-row__zero {
      position: absolute;
      font-weight: 500;
      font-size: 11px;
      transform: translateX(-50%);
    }
  `),V([Se()],E.prototype,"_config",2),E=V([xe("horizontal-bidirectional-gauge")],E);window.customCards=window.customCards||[];window.customCards.push({type:"horizontal-bidirectional-gauge",name:"Horizontal Bidirectional Gauge",description:"Bidirectional bar gauge with zero divider for energy flow visualization"});})();
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/custom-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/property.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/state.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/event-options.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/base.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-all.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-async.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
