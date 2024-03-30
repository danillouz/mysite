import type { FunctionalComponent } from "preact"

const Bookmarklet: FunctionalComponent = () => {
  return <a href="javascript:(function(){function _getSelection(e){if(void 0===window.getSelection)return{hasSelection:!1,html:&quot;&quot;,textFragment:&quot;&quot;};const n=window.getSelection();if(!n||n.rangeCount<1)return{hasSelection:!1,html:&quot;&quot;,textFragment:&quot;&quot;};const{status:t,fragment:o}=e(n),i=_makeTextFragmentDirective(t,o),r=window.document.createElement(&quot;div&quot;);for(let e=0,t=n.rangeCount;e<t;++e)r.appendChild(n.getRangeAt(e).cloneContents());const a=r.innerHTML;return{hasSelection:Boolean(a),html:a,textFragment:i}}function _makeTextFragmentDirective(e,n){if(0!==e)return&quot;&quot;;const t=n.prefix?`${encodeURIComponent(n.prefix)}-,`:&quot;&quot;,o=n.suffix?`,-${encodeURIComponent(n.suffix)}`:&quot;&quot;;return`#:~:text=${t}${encodeURIComponent(n.textStart)}${n.textEnd?`,${encodeURIComponent(n.textEnd)}`:&quot;&quot;}${o}`}function _makeObsidianNoteContent({author:e,body:n,excerpt:t,selection:o,title:i,url:r}){let a=new URL(r);a.search=&quot;&quot;,a.hash=&quot;&quot;,a=a.toString();const l=new Date;if(o.hasSelection){return`> [!quote] ${l.toLocaleDateString(void 0,{weekday:&quot;short&quot;,year:&quot;numeric&quot;,month:&quot;short&quot;,day:&quot;numeric&quot;,hour:&quot;numeric&quot;,minute:&quot;numeric&quot;})} &amp;bull; [Source](${a}${o.textFragment})\n\n${n}\n\n---\n\n`}{const o=t!==i?t:&quot;&quot;,[r]=l.toISOString().split(&quot;T&quot;),c=`[${i}](${a})`;return`---\naliases:\nclipping_author: ${e||&quot;&quot;}\nclipping_url: ${a}\ncreated_at_unix: ${Math.round(Date.now()/1e3)} \nsummary: ${o}\n---\n\n%%\ndates:: [[${r}]]\nrelated::\n%%\n\n#clipping\n\n> [!info]\n> ${c}${e?&quot; by &quot;+e:&quot;&quot;}\n\n${n}\n`}}function _makeObsidianUri({config:e,content:n,selection:t,title:o}){const i={content:n,file:`${t.hasSelection?e.selectionFolderName:e.folderName}/${o.replace(/:/g,&quot;&quot;).replace(/\//g,&quot;-&quot;).replace(/\\/g,&quot;-&quot;)}`};t.hasSelection&amp;&amp;(i.append=&quot;true&quot;);return`obsidian://new?${Object.entries(i).map((([e,n])=>`${e}=${encodeURIComponent(n)}`)).join(&quot;&amp;&quot;)}`}Promise.all([import(&quot;https://cdn.jsdelivr.net/npm/@mozilla/readability/+esm&quot;),import(&quot;https://cdn.jsdelivr.net/npm/turndown/+esm&quot;),import(&quot;https://cdn.jsdelivr.net/npm/text-fragments-polyfill/dist/fragment-generation-utils.js/+esm&quot;),Promise.resolve({folderName:&quot;Clippings&quot;,selectionFolderName:&quot;Clippings/Quotes&quot;})]).then((([e,n,t,o])=>{const{Readability:i}=e.default,{default:r}=n,{generateFragment:a}=t,l=_getSelection(a),{byline:c,content:s,excerpt:d,title:m}=new i(window.document.cloneNode(!0)).parse(),u=_makeObsidianUri({config:o,content:_makeObsidianNoteContent({author:c,body:new r({headingStyle:&quot;atx&quot;,hr:&quot;---&quot;,bulletListMarker:&quot;-&quot;,codeBlockStyle:&quot;fenced&quot;}).turndown(l.html||s),excerpt:d,selection:l,title:m,url:window.document.URL}),selection:l,title:m});window.document.location.href=u})).catch((e=>{alert(&quot;Failed to clip to Obsidian\n\n&quot;+e+&quot;\n\n(see the browser developer console for more details)&quot;)}));}());">Clip to Obsidian</a>
}

export default Bookmarklet
