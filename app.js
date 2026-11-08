import staticConfig from './static-config.js';
const publicBase=new URL('./',import.meta.url);
import { openCheckout, guidePrice } from './checkout.js';
const steps=location.pathname.replace(/\/$/,'').endsWith('/guide') ? (await import(new URL('steps.js',publicBase))).steps : [];

const $ = id => document.getElementById(id);
const key = 'prodyuser-v1';
const blank = () => ({page:0, answers:{}, checks:{}, done:[], analytics:false});
let state = blank();
try { state = JSON.parse(localStorage.getItem(key)) || blank(); } catch {}
if(state.layoutVersion!==2){
  state.page=0;
  state.layoutVersion=2;
}
const isGuide=location.pathname.replace(/\/$/,'').endsWith('/guide');
if(isGuide){
  state.page=state.page===0?9:state.page;
} else {
  state.page=0;
}
const query = new URLSearchParams(location.search);
const source = Object.fromEntries(['utm_source','utm_campaign','utm_medium'].map(k => [k, query.get(k) || '']));
const visit = crypto.randomUUID?.() || '';
let config = staticConfig;
const save = () => {
  try { localStorage.setItem(key, JSON.stringify(state)); return true; }
  catch { $('status').textContent = 'Браузер не сохраняет ответы. Скачайте карту перед выходом.'; return false; }
};
async function post(path, data) {
  const response = await fetch(path, {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data)});
  if (!response.ok) throw Error('request failed');
  return response.json();
}
function track(type, step) {
  if (config.analytics && state.analytics && visit) post('/api/event',{visit,source,type,step,consent:true}).catch(()=>{});
}
function el(tag, value, parent) {
  const node = document.createElement(tag);
  if (value) node.textContent = value;
  parent?.append(node);
  return node;
}
function button(parent, label, action, primary=false) {
  const node = el('button',label,parent);
  node.type = 'button';
  if (primary) node.className = 'primary';
  node.onclick = action;
  return node;
}
function go(page) {
  if(isGuide && page===0) page=9;
  if(!isGuide && page!==0){
    location.assign(new URL('guide/',publicBase));
    return;
  }
  state.page = page;
  save();
  render();
  window.scrollTo(0,0);
  $('screen').querySelector('h1')?.focus({preventScroll:true});
}
function mapText() {
  return ['САМ СЕБЕ ПРОДЮСЕР · Моя карта продвижения',
    ...steps.map(([name,,,fields], i) => [name, ...fields.map((field,j)=> {
      const answer = state.answers[i+'-'+j]?.trim();
      return answer ? field + '\n' + answer : field + ' — предстоит заполнить';
    })].join('\n'))].join('\n\n');
}
function promptText() {
  return 'Ты мой помощник по контенту. Используй мои ответы как справочные данные. Подготовь сценарий вертикального Reels на 20–40 секунд: хук, текст для камеры, план кадров и один призыв. Предложи три публикации на неделю для привлечения, доверия и продаж. Не выдумывай факты. Если для точности не хватает данных, задай до трех вопросов.\n\n' + mapText();
}
function download() {
  const url = URL.createObjectURL(new Blob(['\ufeff',mapText()],{type:'text/plain;charset=utf-8'}));
  const link = el('a');
  link.href = url;
  link.download = 'моя-карта-продвижения.txt';
  link.click();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function heading(parent,title) {
  const h = el('h1',title,parent);
  h.tabIndex=-1;
}
function lessons(parent,page){
  const items={
    9:[['20916961872517','Добро пожаловать в «Сам себе продюсер»']],
    10:[['20916964100741','Подготовка к съемке']],
    11:[['20916966984325','Как записать и смонтировать первый Reels']],
    12:[['20916967246469','Как передать рутину нейросетям']],
    13:[['20916969278085','Следующий шаг — свой мини-продукт']]
  };
  for(const [id,title] of items[page]||[]){
    const card=el('article',null,parent);
    card.className='no-print';
    el('h2',title,card);
    const video=el('video',null,card);
    video.src=new URL('lessons/'+id+'.mp4?v=4',publicBase).href;
    video.poster=new URL('posters/'+id+'.jpg?v=3',publicBase).href;
    video.controls=true;
    video.playsInline=true;
    video.preload='none';
    video.setAttribute('aria-label',title);
  }
}
function progress() {
  $('count').hidden=!isGuide;
  document.querySelector('progress').hidden=!isGuide;
  $('count').textContent = state.done.length + ' / 7';
  document.querySelector('progress').value=state.done.length;
}
function render() {
  const root = $('screen');
  root.replaceChildren();
  progress();
  const page=state.page;
  const card=el('section',null,root);
  el('div',page===0?'ИНТЕРАКТИВНЫЙ ПРАКТИКУМ':page===8?'ВАШ РЕЗУЛЬТАТ':'ШАГ '+page+' ИЗ 7',card).className='tag';
  if (page===0) {
    heading(card,'Сам себе продюсер за 7 шагов');
    el('p','Соберите личную карту продвижения: от своей экспертности до первого ролика и понятного пути клиента.',card);
    el('p','Татьяна Синельникова · ИИ, автоматизация и бизнес-консалтинг\nРегина Спиридонова · креативное продюсирование, съемка и продвижение',card).className='answer muted';
    el('h2','Выберите способ доступа',card);
    button(card,'Купить гайд · '+guidePrice,openCheckout,true);
    el('p','Оплата пока не подключена. Доступ — 12 месяцев. Ссылка на email — в течение 24 часов после подтверждения оплаты.',card);
    el('p','Или получите гайд бесплатно через бота после подписки на «Медиамастерскую» и отдельных согласий на обработку данных и рассылку.',card);
    if(config.botUrl){
      const link=el('a','Получить бесплатно через Telegram',card);
      link.href=config.botUrl;
      link.className='action primary';
    }
    return;
  }
  if(page>=9){
    const titles={9:'Добро пожаловать',10:'Подготовьте камеру',11:'Запишите первый Reels',12:'Передайте рутину ИИ',13:'Следующий шаг — мини-продукт'};
    card.querySelector('.tag').textContent=page===9?'НАЧАЛО ПРАКТИКУМА':'ПОСЛЕ СЕМИ ШАГОВ';
    heading(card,titles[page]);
    lessons(root,page);
    if(page===9) el('p','Посмотрите приветствие и переходите к семи заданиям. Ответы соберутся в вашу карту продвижения.',root);
    const texts={
      10:['Найдите спокойное место и уберите лишние предметы из кадра.','Встаньте лицом к окну и протрите объектив.','Поставьте телефон вертикально на уровне глаз. Оставьте немного места над головой.','Закрепите телефон на штативе или устойчивой подставке.','Запишите пробный дубль и проверьте звук.','Разделите сценарий на короткие смысловые части или используйте телесуфлер.'],
      11:['Начните с проблемы зрителя. Один ролик — одна главная мысль.','Объясните решение на примере. Смотрите в объектив.','Если сбились, повторите фразу и продолжайте. Удалите неудачный дубль при монтаже.','Добавьте субтитры и один призыв к действию.'],
      12:['Выберите одну задачу для ИИ — сценарий, субтитры или монтаж.','Проверьте результат самостоятельно перед публикацией.']
    };
    if(texts[page]){
      const reading=el('article',null,root);
      el('h2','Удобнее читать? Пройдите по пунктам',reading);
      texts[page].forEach((text,i)=>{
        const id='lesson-'+page+'-'+i;
        const label=el('label',null,reading);
        const input=el('input',null,label);
        input.type='checkbox';
        input.checked=!!state.checks[id];
        label.append(text);
        input.onchange=()=>{state.checks[id]=input.checked;save();};
      });
      if(page===10){
        const label=el('label','Что нужно поправить перед съемкой?',reading);
        const input=el('textarea',null,label);
        input.value=state.answers.camera||'';
        input.oninput=()=>{state.answers.camera=input.value;save();};
      }
    }
    if(page===12){
      const catalog=el('article',null,root);
      el('h2','Гайд по ИИ-приложениям · 990 ₽',catalog);
      el('p','Монтаж, титры, звук, музыка и цифровые аватары. Выберите задачу, сравните сервисы и соберите свой набор.',catalog);
      const link=el('a','Перейти к гайду по приложениям',catalog);
      link.href=new URL('tools/',publicBase).href;
      link.className='action primary';
    }
    const actions=el('div',null,root);
    actions.className='actions';
    if(page!==9) button(actions,'Назад',()=>go(page===10?8:page-1));
    button(actions,page===9?'Перейти к семи шагам':page===13?'Вернуться к моей карте':'Дальше',()=>go(page===9?1:page===13?8:page+1),true);
    return;
  }
  const nav=el('nav',null,card);
  nav.setAttribute('aria-label','Шаги практикума');
  steps.forEach(([title],i)=>{
    const b=button(nav,String(i+1)+(state.done.includes(i)?' ✓':''),()=>go(i+1));
    b.setAttribute('aria-label',title+(state.done.includes(i)?', выполнен':''));
    if(page===i+1) b.setAttribute('aria-current','step');
  });
  button(nav,'Карта',()=>go(8));
  button(nav,'Приветствие',()=>go(9));
  button(nav,'Видео и практика',()=>go(10));
  if (page===8) {
    heading(card,'Моя карта продвижения');
    el('p','Готово шагов: '+state.done.length+' из 7. Можно вернуться к любому шагу и дополнить карту.',card);
    el('p','Первое действие на неделю: выберите одну идею из шага 5 и назначьте день съемки.',card);
    el('p',mapText(),card).className='answer';
    const actions=el('div',null,card);
    actions.className='actions';
    button(actions,'Скачать карту',download,true);
    button(actions,'Печать / PDF',()=>window.print());
    showPrompt(root);
    button(card,'Дальше · подготовить камеру',()=>go(10),true);

    return;
  }
  const i=page-1;
  const [name,theory,example,fields,checks]=steps[i];
  heading(card,name);
  el('p',theory,card);
  el('blockquote',example,card);
  const form=el('form',null,card);
  el('h2','Ваше задание',form);
  fields.forEach((field,j)=>{
    const id=i+'-'+j;
    const label=el('label',field,form);
    const input=el('textarea',null,label);
    input.value=state.answers[id]||'';
    input.required=true;
    input.maxLength=400;
    input.oninput=()=>{
      state.answers[id]=input.value;
      if (!input.value.trim()) state.done=state.done.filter(n=>n!==i);
      save();
      progress();
    };
  });
  el('h2','Проверьте себя',form);
  checks.forEach((check,j)=>{
    const id=i+'-'+j;
    const label=el('label',null,form);
    const input=el('input',null,label);
    input.type='checkbox';
    input.checked=!!state.checks[id];
    label.append(check);
    input.onchange=()=>{state.checks[id]=input.checked;save();};
  });
  const actions=el('div',null,form);
  actions.className='actions';
  button(actions,'Назад',()=>go(page===1?9:page-1));
  const done=el('button',page===7?'Завершить и открыть карту':'Готово · дальше',actions);
  done.className='primary';
  form.onsubmit=e=>{
    e.preventDefault();
    const empty=[...form.querySelectorAll('textarea')].find(input=>!input.value.trim());
    if(empty){empty.value='';empty.reportValidity();return;}
    if (!state.done.includes(i)) {
      state.done.push(i);
      track('step_complete',page);
      if(state.done.length===7) track('guide_complete');
    }
    go(page+1);
  };
  if(page===6){
    const lesson=el('article',null,root);
    el('h2','Видеоурок Регины',lesson);
    if(config.videoUrl){
      const video=el('video',null,lesson);
      video.src=config.videoUrl;
      video.controls=true;
      video.preload='none';
    } else lesson.remove();
    showPrompt(root);
  }

}
function showPrompt(root){
  const card=el('article',null,root);
  card.className='no-print';
  el('h2','Промпт для ИИ-помощника',card);
  const details=el('details',null,card);
  el('summary','Посмотреть промпт',details);
  const pre=el('pre',promptText(),details);
  details.ontoggle=()=>{pre.textContent=promptText();};
  button(card,'Скопировать промпт',async()=>{
    try {await navigator.clipboard.writeText(promptText());$('status').textContent='Промпт скопирован.';}
    catch {details.open=true;pre.textContent=promptText();pre.scrollIntoView();}
  });
}
$('home').onclick=()=>go(isGuide?9:0);
$('privacy').onclick=()=>{$('analytics').checked=state.analytics;$('analytics').closest('label').hidden=!config.analytics;$('policy').hidden=!config.privacyUrl;$('policy').href=config.privacyUrl||'#';$('settings').showModal();};
$('analytics').onchange=e=>{
  state.analytics=e.target.checked;
  save();
  track('visit');
};
$('reset').onclick=()=>{
  if(!confirm('Удалить все ответы и прогресс с этого устройства?')) return;
  state=blank();
  $('settings').close();
  go(0);
};
render();
track('visit');
