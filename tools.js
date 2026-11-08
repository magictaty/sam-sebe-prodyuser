import { checkoutUrl, guidePrice } from './checkout.js';
const referralLinks={
  ChatPlace:'https://chatplace.io/ru/?r=019fc732-13c2-708d-b771-91613fb9eb7d',
  Postmypost:'https://postmypost.io/ZDzGDK',
  temavorobey:'https://temavorobey.com/inv/ebw7w4en'
};
const services=[
['ChatPlace','Полезные дополнения','https://chatplace.io/ru/','Автоматизировать выдачу материалов и общение с аудиторией.','Чат-боты с проверкой подписки, автоворонки, рассылки, ИИ-менеджер и интеграции для Instagram, Telegram и TikTok.','Можно собрать путь от интереса к материалу до выдачи ссылки и дальнейшего общения по готовому шаблону.','Проверьте нужную платформу и тариф. Для рассылок настройте согласие и удобную отписку.'],

['Postmypost','Полезные дополнения','https://postmypost.io/','Запланировать выкладку контента в социальные сети.','Сервис автопубликации помогает готовить публикации и планировать их выход.','Соберите публикации на неделю заранее и распределите по календарю.','Перед подключением проверьте поддержку нужной площадки и формата публикаций.'],
['temavorobey','Полезные дополнения','https://temavorobey.com/support','Оплатить зарубежный сервис из России.','По данным сайта, доступны российские карты и СБП для цифровых покупок.','Уточните наличие конкретной подписки и способ ее подключения перед заказом.','Проверьте итоговую стоимость, сроки активации, условия продления и возврата для выбранной услуги.'],

['CapCut','Монтаж и титры','https://www.capcut.com/resource/ai-video-editor-guide','Собрать короткий ролик из готовых дублей.','Таймлайн, обрезка, переходы, автотитры и работа со звуком.','После распознавания можно исправить текст и настроить внешний вид титров.','Проверьте названия и окончания фраз. Набор ИИ-функций отличается между вебом, телефоном и компьютером.'],
['Vizard','Монтаж и титры','https://vizard.ai/','Получить короткие фрагменты из эфира, интервью или урока.','ИИ выбирает фрагменты длинного видео и помогает подготовить их для коротких форматов.','Удобен, когда уже есть большая запись с несколькими темами.','Выбирайте клипы с законченной мыслью и проверяйте, не потерялся ли контекст.'],
['Captions','Монтаж и титры','https://help.captions.ai/docs/feature-availability','Оформить разговорное видео и добавить субтитры.','Автотитры, автоматический монтаж, дубляж и инструменты создания видео.','В одном сервисе можно соединить оформление речи и подготовку разных языковых версий.','Возможности зависят от устройства и подписки. Проверьте русский язык на своем дубле.'],
['OpusClip','Монтаж и титры','https://www.opus.pro/','Нарезать длинное видео на короткие публикации.','Выбор фрагментов, переформатирование и подготовка клипов.','Помогает превратить один большой материал в несколько поводов для публикации.','Оценка потенциала ролика сервисом не гарантирует просмотры. Проверьте кадр и начало каждой истории.'],
['Descript','Монтаж и титры','https://www.descript.com/','Редактировать разговорное видео через расшифровку.','Текстовый монтаж, субтитры, Studio Sound и инструменты удаления слов-паразитов и повторных попыток.','Удаление текста помогает управлять соответствующими кусками записи.','Проверьте поддержку языка и качество распознавания до переноса большого проекта.'],
['ElevenLabs','Звук и музыка','https://elevenlabs.io/sound-effects','Сделать голосовую дорожку или звуковые акценты.','Sound Effects создает звуки по описанию. Text to Speech озвучивает текст.','Для перехода можно описать конкретный звук вместо поиска по большой библиотеке.','Прослушайте произношение и отдельно проверьте лицензию выбранного режима.'],
['Suno','Звук и музыка','https://suno.com/','Создать музыкальную подложку или песню.','Генерирует музыку по текстовому описанию идеи.','В описании задайте настроение и назначение трека, затем сравните несколько вариантов.','Музыка под речью должна оставлять голос разборчивым. Условия использования проверьте для своего тарифа.'],
['AIVA','Звук и музыка','https://www.aiva.ai/','Подобрать музыкальную композицию для видео.','Генерация в разных стилях, редактирование композиций, работа с аудио- и MIDI-ориентирами.','Подходит, если хочется управлять композицией после генерации.','Права и разрешенная монетизация различаются по тарифам.'],
['HeyGen','ИИ-аватары','https://www.heygen.com/','Создать видео с персональным цифровым ведущим.','Видео с аватарами по сценарию и инструменты перевода видео.','Можно подготовить несколько версий сообщения из одного сценария.','Начните с короткого теста мимики, пауз и произношения.'],
['D-ID','ИИ-аватары','https://www.d-id.com/','Создавать видео с цифровым персонажем.','Генерация видео и интерактивные аватары для общения.','Интерактивный аватар рассчитан на диалог, а видеоролик — на заранее заданное сообщение.','Для блога оцените, насколько такой формат соответствует вашему образу и ожиданиям аудитории.'],
['Synthesia','ИИ-аватары','https://www.synthesia.io/','Сделать объясняющий ролик или видеоинструкцию.','Аватары по сценарию, генерация видео из документов, перевод и дубляж.','Подходит для серии однотипных инструкций, где важно единое оформление.','Проверьте естественность речи и точность терминов в готовом видео.'],
['Adobe Podcast Enhance Speech','Полезные дополнения','https://podcast.adobe.com/enhance','Улучшить разборчивость записанной речи.','ИИ-обработка разговорного аудио.','Полезно сравнить исходный голос с обработанным перед монтажом.','Сильная обработка может менять тембр. Сохраните исходник и проверьте голос целиком.'],
['Canva','Полезные дополнения','https://www.canva.com/features/background-remover/','Подготовить обложку и вырезать человека с фотографии.','Удаление фона и оформление изображения в редакторе.','Можно собрать единый шаблон обложек для серии.','Проверьте края волос и читаемость заголовка на маленьком экране.']
];
const categoryOrder=['Монтаж и титры','Звук и музыка','ИИ-аватары','Полезные дополнения'];
services.sort((a,b)=>categoryOrder.indexOf(a[1])-categoryOrder.indexOf(b[1]));
const categories=['Все',...categoryOrder];
const key='producer-tools-v1';
let state={selected:[],tasks:[],notes:''};
try {const saved=JSON.parse(localStorage.getItem(key));if(saved && Array.isArray(saved.selected)&&Array.isArray(saved.tasks))state={...state,...saved};}catch{}
let category='Все';
const $=id=>document.getElementById(id);
function save(){
 try{localStorage.setItem(key,JSON.stringify(state));$('saved').textContent='Сохранено на этом устройстве.';}
 catch{$('saved').textContent='Не удалось сохранить. Скачайте выбранный набор перед выходом.';}
}
function element(tag,text,parent){
 const node=document.createElement(tag);
 if(text)node.textContent=text;
 parent?.append(node);
 return node;
}
function selected(){
 $('selection').textContent=state.selected.length?state.selected.join(' · '):'Пока ничего не выбрано.';
}
function render(){
 $('filters').replaceChildren();
 for(const name of categories){
  const button=element('button',name,$('filters'));
  button.setAttribute('aria-pressed',String(name===category));
  if(name===category)button.className='primary';
  button.onclick=()=>{category=name;render();};
 }
 const query=$('search').value.trim().toLocaleLowerCase();
 const list=services.filter(s=>(category==='Все'||s[1]===category)&&s.join(' ').toLocaleLowerCase().includes(query));
 $('found').textContent='Найдено сервисов — '+list.length;
 $('catalog').replaceChildren();
 for(const [name,group,url,task,features,tip,check] of list){
  const card=element('article',null,$('catalog'));
  element('div',group,card).className='tag';
  element('h2',name,card);
  element('p',task,card);
  element('h3','Что умеет',card);
  element('p',features,card);
  element('h3','Фишка для вашей работы',card);
  element('p',tip,card);
  element('p',check,card).className='muted';
  const label=element('label',null,card);
  const input=element('input',null,label);input.type='checkbox';input.checked=state.selected.includes(name);
  label.append('Добавить в мой набор');
  input.onchange=()=>{
   state.selected=state.selected.filter(x=>x!==name);
   if(input.checked)state.selected.push(name);
   save();selected();
  };
  const referral=referralLinks[name];
  if(referral){
    const partner=element('a',name==='temavorobey'?'Перейти к сервису оплаты':'Перейти в '+name,card);
    partner.href=referral;
    partner.target='_blank';
    partner.rel='noopener noreferrer sponsored';
    partner.className='action primary';
    element('p','Реферальная ссылка Татьяны. Автор может получить вознаграждение за переход или покупку по условиям программы.',card).className='muted';
  }
  const link=element('a',referral?'О сервисе на официальном сайте':'Официальная страница',card);
  link.href=url;link.target='_blank';link.rel='noopener noreferrer';link.className='action';
 }
 selected();
}
$('search').oninput=render;
document.querySelectorAll('[data-task]').forEach(input=>{
 const id=Number(input.dataset.task);
 input.checked=state.tasks.includes(id);
 input.onchange=()=>{
  state.tasks=state.tasks.filter(x=>x!==id);
  if(input.checked)state.tasks.push(id);
  save();
 };
});
$('notes').value=state.notes;
$('notes').oninput=()=>{state.notes=$('notes').value;save();};
$('export').onclick=()=>{
 const chosen=services.filter(s=>state.selected.includes(s[0]));
 const text='МОЙ НАБОР ИИ-ИНСТРУМЕНТОВ\n\n'+chosen.map(s=>s[0]+'\n'+s[3]+'\n'+(referralLinks[s[0]]||s[2])).join('\n\n')+'\n\nЗаметки\n'+state.notes;
 const url=URL.createObjectURL(new Blob(['\ufeff',text],{type:'text/plain;charset=utf-8'}));
 const a=document.createElement('a');a.href=url;a.download='мои-ии-инструменты.txt';a.click();
 setTimeout(()=>URL.revokeObjectURL(url),1000);
};
render();

document.getElementById('pay-tools').textContent='Купить гайд · '+guidePrice;
document.getElementById('pay-tools').onclick=()=>location.assign(checkoutUrl);
