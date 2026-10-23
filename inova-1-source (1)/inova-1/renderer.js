const address=document.getElementById('address'), addressForm=document.getElementById('address-form');
const searchForm=document.getElementById('search-form'), search=document.getElementById('search');
const welcome=document.getElementById('welcome'), viewWrap=document.getElementById('view-wrap');
const tabsEl=document.getElementById('tabs'), status=document.getElementById('status');
let tabs=[],activeId=0,nextId=1;
function normalize(v){const s=v.trim();if(!s)return '';if(/^https?:\/\//i.test(s))return s;
if(/^(localhost|127\.0\.0\.1)(:\d+)?(\/.*)?$/i.test(s))return 'http://'+s;
if(/^[^\s]+\.[^\s]+$/.test(s)&&!s.includes(' '))return 'https://'+s;
return 'https://www.google.com/search?q='+encodeURIComponent(s)}
function active(){return tabs.find(t=>t.id===activeId)}
function navigate(value){const url=normalize(value),t=active();if(!url||!t)return;welcome.style.display='none';
if(!t.view){const v=document.createElement('webview');v.setAttribute('partition','persist:inova-browser');v.setAttribute('allowpopups','');
v.addEventListener('did-start-loading',()=>status.textContent='Cargando…');
v.addEventListener('did-stop-loading',()=>{status.textContent='Listo';if(t.id===activeId)address.value=v.getURL();setTitle(t,v.getTitle()||'Pestaña')});
v.addEventListener('page-title-updated',e=>setTitle(t,e.title||'Pestaña'));
v.addEventListener('did-navigate',e=>{if(t.id===activeId)address.value=e.url});
v.addEventListener('did-navigate-in-page',e=>{if(t.id===activeId)address.value=e.url});
v.addEventListener('new-window',e=>navigate(e.url));
v.addEventListener('did-fail-load',e=>{if(e.errorCode!==-3)status.textContent='No se pudo cargar la página'});
t.view=v;viewWrap.appendChild(v)}
tabs.forEach(x=>{if(x.view)x.view.style.display=x.id===activeId?'block':'none'});
t.view.loadURL(url).catch(()=>status.textContent='No se pudo abrir la dirección');address.value=url;renderTabs()}
function setTitle(t,title){t.title=title;const e=tabsEl.querySelector(`[data-tab="${t.id}"] .tab-label`);if(e)e.textContent=title}
function renderTabs(){tabsEl.innerHTML='';tabs.forEach(t=>{const b=document.createElement('button');b.className='tab'+(t.id===activeId?' active':'');b.dataset.tab=t.id;
const dot=document.createElement('span');dot.className='dot';const label=document.createElement('span');label.className='tab-label';label.textContent=t.title;
const close=document.createElement('span');close.className='close';close.textContent='×';close.title='Cerrar pestaña';
close.onclick=e=>{e.stopPropagation();closeTab(t.id)};b.append(dot,label,close);b.onclick=()=>switchTab(t.id);tabsEl.appendChild(b)})}
function newTab(url=''){const t={id:nextId++,title:'Nueva pestaña',view:null};tabs.push(t);activeId=t.id;if(url)navigate(url);else{tabs.forEach(x=>{if(x.view)x.view.style.display='none'});welcome.style.display='flex';address.value='';renderTabs();status.textContent='Listo'}}
function switchTab(id){activeId=id;const t=active();tabs.forEach(x=>{if(x.view)x.view.style.display=x.id===id?'block':'none'});
welcome.style.display=t&&t.view?'none':'flex';address.value=t&&t.view?t.view.getURL():'';renderTabs()}
function closeTab(id){const i=tabs.findIndex(t=>t.id===id);if(i<0)return;if(tabs[i].view)tabs[i].view.remove();tabs.splice(i,1);
if(!tabs.length){newTab();return}if(activeId===id)activeId=tabs[Math.max(0,i-1)].id;switchTab(activeId)}
addressForm.addEventListener('submit',e=>{e.preventDefault();navigate(address.value)});
searchForm.addEventListener('submit',e=>{e.preventDefault();navigate(search.value)});
document.getElementById('back').onclick=()=>{const v=active()?.view;if(v&&v.canGoBack())v.goBack()};
document.getElementById('forward').onclick=()=>{const v=active()?.view;if(v&&v.canGoForward())v.goForward()};
document.getElementById('reload').onclick=()=>{const v=active()?.view;if(v)v.reload()};
document.getElementById('home').onclick=()=>{welcome.style.display='flex';tabs.forEach(t=>{if(t.view)t.view.style.display='none'});address.value=''};
document.getElementById('new-tab').onclick=()=>newTab();
document.querySelectorAll('[data-url]').forEach(b=>b.onclick=()=>navigate(b.dataset.url));
newTab();
