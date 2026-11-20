(() => {
'use strict';

const STORE_KEY = 'mizani.v1';
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const categories = [
  { id:'salary', type:'income', ar:'مرتب', en:'Salary' },
  { id:'freelance', type:'income', ar:'عمل حر', en:'Freelance' },
  { id:'business', type:'income', ar:'مشروع', en:'Business' },
  { id:'gift-in', type:'income', ar:'هدية', en:'Gift' },
  { id:'other-income', type:'income', ar:'دخل آخر', en:'Other income' },
  { id:'food', type:'expense', ar:'أكل', en:'Food' },
  { id:'transport', type:'expense', ar:'مواصلات', en:'Transport' },
  { id:'housing', type:'expense', ar:'سكن', en:'Housing' },
  { id:'bills', type:'expense', ar:'فواتير', en:'Bills' },
  { id:'health', type:'expense', ar:'صحة', en:'Health' },
  { id:'education', type:'expense', ar:'تعليم', en:'Education' },
  { id:'shopping', type:'expense', ar:'تسوق', en:'Shopping' },
  { id:'entertainment', type:'expense', ar:'ترفيه', en:'Entertainment' },
  { id:'personal', type:'expense', ar:'شخصي', en:'Personal' },
  { id:'family', type:'expense', ar:'عائلة', en:'Family' },
  { id:'other-expense', type:'expense', ar:'مصروف آخر', en:'Other expense' }
];

const text = {
  ar: {
    appName:'مِيزاني', appTagline:'دفترك الشخصي', navOverview:'نظرة عامة', navTransactions:'الحركات', navBudget:'الميزانية', navGoals:'الأهداف', navAnalytics:'التحليلات', navSettings:'الإعدادات', navShortOverview:'نظرة', navShortTransactions:'حركات', navShortBudget:'ميزانية', navShortGoals:'أهداف', navShortAnalytics:'تحليل', navShortSettings:'إعدادات', localMode:'وضع محلي', localModeText:'بياناتك تتحفظ في متصفح هذا الجهاز فقط.', localModeShort:'محلي على الجهاز',
    overviewEyebrow:'لوحة التحكم', overviewTitle:'فلوسك واضحة، قرارك أهدى.', overviewIntro:'سجّل الدخل والمصاريف بنفسك، وراقب الميزانية والادخار من غير ربط بنكي.', addTransaction:'إضافة حركة', addGoal:'إضافة هدف', totalBalance:'الرصيد الكلي', monthIncome:'دخل الشهر', monthExpense:'مصاريف الشهر', savingsRate:'معدل الادخار', thisMonth:'هذا الشهر', recentTransactions:'أحدث الحركات', whatHappened:'آخر ما سجلته', viewAll:'عرض الكل', privacyTitle:'الخصوصية والنسخ', privacyHeading:'مفيش حسابات ولا مزامنة', privacyPointOne:'تدخل كل مبلغ بنفسك؛ التطبيق لا يتصل بالبنك ولا يحرك أموالًا.', privacyPointTwo:'البيانات تبقى في متصفح هذا الجهاز، ولا تنتقل تلقائيًا لموبايل أو كمبيوتر آخر.', privacyPointThree:'حمّل نسخة JSON من الإعدادات بشكل دوري حتى لا تضيع البيانات عند مسح المتصفح.', backupNow:'تنزيل نسخة احتياطية',
    transactionsEyebrow:'السجل', transactionsTitle:'الدخل والمصاريف', transactionsIntro:'كل حركة تتسجل يدويًا بتاريخها وفئتها وملاحظة اختيارية.', newRecord:'تسجيل جديد', cancelEdit:'إلغاء التعديل', transactionType:'نوع الحركة', expense:'مصروف', income:'دخل', amount:'المبلغ', category:'الفئة', date:'التاريخ', note:'ملاحظة', notePlaceholder:'مثال: مشوار، مرتب، فاتورة', saveTransaction:'حفظ الحركة', updateTransaction:'تحديث الحركة', history:'السجل الكامل', allTransactions:'كل الحركات', allTypes:'الكل', allCategories:'كل الفئات', searchPlaceholder:'ابحث في الملاحظات',
    budgetEyebrow:'حدود الشهر', budgetTitle:'الميزانية', budgetIntro:'حدد سقف مصاريف الشهر، وشوف الفاضل قبل ما الشهر يخلص.', monthlyLimit:'الحد الشهري', spendingCeiling:'سقف المصاريف', saveBudget:'حفظ الحد', clear:'مسح', ruleEyebrow:'حاسبة سريعة', ruleName:'قاعدة', ruleTitle:'قاعدة 50 / 30 / 20', useMonthIncome:'استخدم دخل الشهر', monthlyIncome:'الدخل الشهري', needs:'احتياجات 50%', wants:'رغبات 30%', savings:'ادخار 20%', ruleNote:'القاعدة مرشد عام، وليست نصيحة مالية شخصية.',
    goalsEyebrow:'الادخار', goalsTitle:'أهداف الادخار', goalsIntro:'قسّم ما تدخره لأهداف واضحة، وحدث المبلغ المدخر يدويًا كل مرة.', newGoal:'هدف جديد', goalName:'اسم الهدف', targetAmount:'المبلغ المستهدف', savedAmount:'المدخر حاليًا', monthlySaving:'ادخار شهري متوقع', goalPlaceholder:'مثال: لابتوب، سفر، طوارئ', saveGoal:'حفظ الهدف', updateGoal:'تحديث الهدف', addSaving:'إضافة ادخار', amountToAdd:'مبلغ الإضافة',
    analyticsEyebrow:'الأرقام', analyticsTitle:'التحليلات', analyticsIntro:'رسوم بيانية بسيطة توضح التدفق والفئات الأعلى صرفًا.', months:'شهور', monthSingular:'شهر', allTime:'كل الوقت', cashflow:'التدفق النقدي', categoryBreakdown:'توزيع المصاريف', topCategories:'الفئات الأعلى', periodIncome:'دخل الفترة', periodExpense:'مصاريف الفترة', periodSaved:'مدخر الفترة', topCategory:'أعلى فئة',
    settingsEyebrow:'التحكم', settingsTitle:'الإعدادات والنسخ', settingsIntro:'غيّر الشكل واللغة، وحمّل بياناتك أو استرجعها عند الحاجة.', appearance:'المظهر', displaySettings:'العرض واللغة', language:'اللغة', theme:'السمة', dark:'غامق', light:'فاتح', currency:'العملة', currencyNote:'تغيير العملة يغيّر طريقة العرض فقط ولا يحوّل القيم.', data:'البيانات', backupRestore:'النسخ والاسترجاع', exportCsv:'تصدير الحركات CSV', exportJson:'تنزيل نسخة JSON', restoreJson:'استرجاع نسخة JSON', storageStatus:'حالة التخزين', storageReady:'التخزين المحلي جاهز.', storageFailed:'التخزين المحلي غير متاح؛ البيانات ستضيع عند إغلاق الصفحة.', dangerZone:'منطقة حساسة', resetData:'مسح البيانات', resetWarning:'يمسح هذا كل الحركات والأهداف والإعدادات من متصفح هذا الجهاز. حمّل نسخة احتياطية أولًا.', resetAll:'مسح كل البيانات', confirm:'تأكيد', cancel:'إلغاء', confirmAction:'تأكيد'
  },
  en: {
    appName:'Mizani', appTagline:'Your personal ledger', navOverview:'Overview', navTransactions:'Transactions', navBudget:'Budget', navGoals:'Goals', navAnalytics:'Analytics', navSettings:'Settings', navShortOverview:'Home', navShortTransactions:'Records', navShortBudget:'Budget', navShortGoals:'Goals', navShortAnalytics:'Charts', navShortSettings:'Settings', localMode:'Local mode', localModeText:'Your data is stored in this device browser only.', localModeShort:'On this device',
    overviewEyebrow:'Dashboard', overviewTitle:'Clear money, calmer decisions.', overviewIntro:'Record income and expenses yourself, and track budgets and savings without bank access.', addTransaction:'Add transaction', addGoal:'Add goal', totalBalance:'Total balance', monthIncome:'Month income', monthExpense:'Month expenses', savingsRate:'Savings rate', thisMonth:'This month', recentTransactions:'Recent transactions', whatHappened:'What you recorded last', viewAll:'View all', privacyTitle:'Privacy and backup', privacyHeading:'No accounts and no sync', privacyPointOne:'You enter every amount yourself; the app does not connect to a bank or move money.', privacyPointTwo:'Data stays in this device browser and does not move automatically to another phone or computer.', privacyPointThree:'Download a JSON backup from Settings regularly so clearing browser data does not lose your record.', backupNow:'Download backup',
    transactionsEyebrow:'Ledger', transactionsTitle:'Income and expenses', transactionsIntro:'Every transaction is entered manually with its date, category, and optional note.', newRecord:'New record', cancelEdit:'Cancel edit', transactionType:'Transaction type', expense:'Expense', income:'Income', amount:'Amount', category:'Category', date:'Date', note:'Note', notePlaceholder:'Example: ride, salary, bill', saveTransaction:'Save transaction', updateTransaction:'Update transaction', history:'Full history', allTransactions:'All transactions', allTypes:'All', allCategories:'All categories', searchPlaceholder:'Search notes',
    budgetEyebrow:'Monthly limits', budgetTitle:'Budget', budgetIntro:'Set a monthly spending ceiling and see what remains before the month ends.', monthlyLimit:'Monthly limit', spendingCeiling:'Spending ceiling', saveBudget:'Save limit', clear:'Clear', ruleEyebrow:'Quick calculator', ruleName:'Rule', ruleTitle:'50 / 30 / 20 rule', useMonthIncome:'Use this month income', monthlyIncome:'Monthly income', needs:'Needs 50%', wants:'Wants 30%', savings:'Savings 20%', ruleNote:'This rule is a general guide, not personal financial advice.',
    goalsEyebrow:'Savings', goalsTitle:'Savings goals', goalsIntro:'Split what you save into clear goals and update the saved amount manually each time.', newGoal:'New goal', goalName:'Goal name', targetAmount:'Target amount', savedAmount:'Saved now', monthlySaving:'Expected monthly saving', goalPlaceholder:'Example: laptop, travel, emergency', saveGoal:'Save goal', updateGoal:'Update goal', addSaving:'Add saving', amountToAdd:'Amount to add',
    analyticsEyebrow:'Numbers', analyticsTitle:'Analytics', analyticsIntro:'Simple charts for cashflow and the highest spending categories.', months:'months', monthSingular:'months', allTime:'All time', cashflow:'Cashflow', categoryBreakdown:'Expense breakdown', topCategories:'Top categories', periodIncome:'Period income', periodExpense:'Period expenses', periodSaved:'Period saved', topCategory:'Top category',
    settingsEyebrow:'Controls', settingsTitle:'Settings and backup', settingsIntro:'Change appearance and language, and download or restore your data when needed.', appearance:'Appearance', displaySettings:'Display and language', language:'Language', theme:'Theme', dark:'Dark', light:'Light', currency:'Currency', currencyNote:'Changing currency only changes display formatting; it does not convert values.', data:'Data', backupRestore:'Backup and restore', exportCsv:'Export transactions CSV', exportJson:'Download JSON backup', restoreJson:'Restore JSON backup', storageStatus:'Storage status', storageReady:'Local storage is ready.', storageFailed:'Local storage is unavailable; data will be lost when this page closes.', dangerZone:'Sensitive area', resetData:'Reset data', resetWarning:'This removes all transactions, goals, and settings from this device browser. Download a backup first.', resetAll:'Reset all data', confirm:'Confirm', cancel:'Cancel', confirmAction:'Confirm'
  }
};

const emptyState = () => ({
  settings: { language:'ar', theme:'dark', currency:'EGP' },
  budget: { monthlyLimit:null },
  transactions: [],
  goals: []
});

let storageAvailable = true;
let state = loadState();
let currentRoute = 'overview';
let editingTransactionId = null;
let editingGoalId = null;
let analyticsPeriod = 6;
let pendingConfirm = null;
let pendingRestore = null;

function loadState(){
  try {
    const raw = localStorage.getItem(STORE_KEY);
    return raw ? normalizeState(JSON.parse(raw)) : emptyState();
  } catch (error) {
    storageAvailable = false;
    return emptyState();
  }
}

function normalizeState(value){
  const fresh = emptyState();
  if (!value || typeof value !== 'object') return fresh;
  const settings = value.settings && typeof value.settings === 'object' ? value.settings : {};
  const budget = value.budget && typeof value.budget === 'object' ? value.budget : {};
  fresh.settings.language = settings.language === 'en' ? 'en' : 'ar';
  fresh.settings.theme = settings.theme === 'light' ? 'light' : 'dark';
  fresh.settings.currency = ['EGP','USD','SAR','AED'].includes(settings.currency) ? settings.currency : 'EGP';
  const limit = Number(budget.monthlyLimit);
  fresh.budget.monthlyLimit = Number.isFinite(limit) && limit > 0 ? limit : null;
  fresh.transactions = Array.isArray(value.transactions) ? value.transactions.map(normalizeTransaction).filter(Boolean) : [];
  fresh.goals = Array.isArray(value.goals) ? value.goals.map(normalizeGoal).filter(Boolean) : [];
  return fresh;
}

function normalizeTransaction(item){
  if (!item || typeof item !== 'object') return null;
  const amount = Number(item.amount);
  const date = String(item.date || '');
  if (!Number.isFinite(amount) || amount <= 0 || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return null;
  const type = item.type === 'income' ? 'income' : 'expense';
  const category = categories.some(cat => cat.id === item.category && cat.type === type) ? item.category : (type === 'income' ? 'other-income' : 'other-expense');
  return {
    id: typeof item.id === 'string' && item.id ? item.id : makeId('txn'),
    type, amount: roundMoney(amount), category, date,
    note: String(item.note || '').slice(0,120),
    createdAt: typeof item.createdAt === 'string' ? item.createdAt : new Date().toISOString()
  };
}

function normalizeGoal(item){
  if (!item || typeof item !== 'object') return null;
  const target = Number(item.target);
  if (!String(item.name || '').trim() || !Number.isFinite(target) || target <= 0) return null;
  const saved = Math.max(0, Number(item.saved) || 0);
  const monthly = Math.max(0, Number(item.monthly) || 0);
  return { id: typeof item.id === 'string' && item.id ? item.id : makeId('goal'), name:String(item.name).trim().slice(0,60), target:roundMoney(target), saved:roundMoney(saved), monthly:roundMoney(monthly), createdAt: typeof item.createdAt === 'string' ? item.createdAt : new Date().toISOString() };
}

function saveState(){
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(state));
    storageAvailable = true;
  } catch (error) {
    storageAvailable = false;
  }
  renderStorageStatus();
}

function makeId(prefix){ return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,9)}`; }
function roundMoney(value){ return Math.round(value * 100) / 100; }
function t(key){ return (text[state.settings.language] && text[state.settings.language][key]) || text.ar[key] || key; }
function locale(){ return state.settings.language === 'en' ? 'en-EG' : 'ar-EG'; }
function categoryLabel(id){ const item = categories.find(cat => cat.id === id); return item ? item[state.settings.language] : id; }
function escapeHtml(value){ return String(value).replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch])); }
function money(value){ return new Intl.NumberFormat(locale(), { style:'currency', currency:state.settings.currency, maximumFractionDigits:2 }).format(Number(value) || 0); }
function number(value){ return new Intl.NumberFormat(locale(), { maximumFractionDigits:0 }).format(Number(value) || 0); }
function dateLabel(iso){ const date = new Date(`${iso}T12:00:00`); return new Intl.DateTimeFormat(locale(), { day:'numeric', month:'short', year:'numeric' }).format(date); }
function monthLabel(key){ const date = new Date(`${key}-15T12:00:00`); return new Intl.DateTimeFormat(locale(), { month:'short', year:'2-digit' }).format(date); }
function todayISO(){ const now = new Date(); return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`; }
function monthKey(iso){ return String(iso).slice(0,7); }
function thisMonthKey(){ return monthKey(todayISO()); }
function inMonth(item, key){ return monthKey(item.date) === key; }
function sumItems(items, type){ return roundMoney(items.filter(item => item.type === type).reduce((sum,item) => sum + item.amount, 0)); }
function sortedTransactions(){ return [...state.transactions].sort((a,b) => b.date.localeCompare(a.date) || b.createdAt.localeCompare(a.createdAt)); }
function periodMonths(period){
  const now = new Date(); const current = new Date(now.getFullYear(), now.getMonth(), 1);
  if (period !== 'all') {
    const count = Number(period) || 6;
    return Array.from({length:count}, (_,index) => { const d = new Date(current.getFullYear(), current.getMonth() - count + 1 + index, 1); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`; });
  }
  const keys = state.transactions.map(item => monthKey(item.date)).sort();
  const first = keys[0] || thisMonthKey();
  const [year, month] = first.split('-').map(Number);
  const result = [];
  for (let d = new Date(year, month-1, 1); d <= current && result.length < 36; d = new Date(d.getFullYear(), d.getMonth()+1, 1)) result.push(`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`);
  return result;
}
function itemsForPeriod(period){
  if (period === 'all') return state.transactions;
  const keys = new Set(periodMonths(period));
  return state.transactions.filter(item => keys.has(monthKey(item.date)));
}
function setText(id, value){ const node = typeof id === 'string' ? $(id) : id; if (node) node.textContent = value; }

function applyLanguageAndTheme(){
  document.documentElement.lang = state.settings.language;
  document.documentElement.dir = state.settings.language === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.dataset.theme = state.settings.theme;
  document.title = state.settings.language === 'ar' ? 'مِيزاني | دفتر الدخل والمصاريف' : 'Mizani | Income and expense ledger';
  $$('[data-i18n]').forEach(node => { node.textContent = t(node.dataset.i18n); });
  $$('[data-i18n-placeholder]').forEach(node => { node.placeholder = t(node.dataset.i18nPlaceholder); });
  $('#currency-select').value = state.settings.currency;
  $$('[data-setting-lang]').forEach(btn => btn.classList.toggle('is-active', btn.dataset.settingLang === state.settings.language));
  $$('[data-setting-theme]').forEach(btn => btn.classList.toggle('is-active', btn.dataset.settingTheme === state.settings.theme));
}

function routeTo(route, updateHash = true){
  if (!['overview','transactions','budget','goals','analytics','settings'].includes(route)) route = 'overview';
  currentRoute = route;
  $$('[data-route]').forEach(btn => btn.classList.toggle('is-active', btn.dataset.route === route));
  $$('[data-route-panel]').forEach(panel => panel.classList.toggle('is-active', panel.dataset.routePanel === route));
  if (updateHash) history.replaceState(null, '', `#${route}`);
  $('#main-content').scrollTo?.({ top:0 });
  if (route === 'analytics') renderAnalytics();
}

function renderApp(){
  applyLanguageAndTheme();
  renderCategoryOptions();
  renderOverview();
  renderTransactions();
  renderBudget();
  renderGoals();
  renderAnalytics();
  renderStorageStatus();
}

function renderStorageStatus(){
  const node = $('#storage-message');
  if (node) node.textContent = storageAvailable ? t('storageReady') : t('storageFailed');
}

function renderCategoryOptions(){
  const type = document.querySelector('input[name="type"]:checked')?.value || 'expense';
  const select = $('#transaction-category');
  const previous = select.value;
  select.innerHTML = categories.filter(cat => cat.type === type).map(cat => `<option value="${cat.id}">${escapeHtml(cat[state.settings.language])}</option>`).join('');
  if (categories.some(cat => cat.id === previous && cat.type === type)) select.value = previous;
  const filter = $('#filter-category');
  const filterPrevious = filter.value || 'all';
  filter.innerHTML = `<option value="all">${escapeHtml(t('allCategories'))}</option>` + categories.map(cat => `<option value="${cat.id}">${escapeHtml(cat[state.settings.language])}</option>`).join('');
  filter.value = categories.some(cat => cat.id === filterPrevious) ? filterPrevious : 'all';
}

function transactionRow(item, compact = false){
  const sign = item.type === 'income' ? '+' : '−';
  const note = item.note ? `<span>${escapeHtml(item.note)}</span>` : '';
  const actions = compact ? '' : `<div class="item-actions"><button class="icon-button" type="button" data-edit-transaction="${item.id}">${state.settings.language === 'ar' ? 'تعديل' : 'Edit'}</button><button class="icon-button" type="button" data-delete-transaction="${item.id}">${state.settings.language === 'ar' ? 'حذف' : 'Delete'}</button></div>`;
  return `<article class="transaction-item ${item.type}">
    <div class="transaction-icon">${item.type === 'income' ? '↓' : '↑'}</div>
    <div>
      <div class="transaction-title"><strong>${escapeHtml(categoryLabel(item.category))}</strong>${note}</div>
      <div class="transaction-meta">${escapeHtml(dateLabel(item.date))}</div>
    </div>
    <div class="transaction-amount ${item.type}">${sign} ${money(item.amount)}</div>
    ${actions}
  </article>`;
}

function emptyBlock(title, detail){
  return `<div class="empty-state"><strong>${escapeHtml(title)}</strong><span>${escapeHtml(detail)}</span></div>`;
}

function renderOverview(){
  const monthItems = state.transactions.filter(item => inMonth(item, thisMonthKey()));
  const income = sumItems(monthItems, 'income');
  const expense = sumItems(monthItems, 'expense');
  const saved = roundMoney(income - expense);
  const balance = roundMoney(sumItems(state.transactions, 'income') - sumItems(state.transactions, 'expense'));
  const rate = income > 0 ? Math.round((saved / income) * 100) : 0;
  setText('#stat-balance', money(balance));
  setText('#stat-balance-note', state.transactions.length ? (state.settings.language === 'ar' ? `${number(state.transactions.length)} حركة مسجلة` : `${number(state.transactions.length)} recorded transactions`) : t('addTransaction'));
  setText('#stat-income', money(income));
  setText('#stat-expense', money(expense));
  setText('#stat-income-count', state.settings.language === 'ar' ? `${number(monthItems.filter(i => i.type === 'income').length)} حركة` : `${number(monthItems.filter(i => i.type === 'income').length)} transactions`);
  setText('#stat-expense-count', state.settings.language === 'ar' ? `${number(monthItems.filter(i => i.type === 'expense').length)} حركة` : `${number(monthItems.filter(i => i.type === 'expense').length)} transactions`);
  setText('#stat-saved', money(saved));
  setText('#savings-rate', `${rate}%`);
  const ring = $('#savings-ring');
  ring.style.setProperty('--percent', Math.max(0, Math.min(100, rate)));
  ring.setAttribute('aria-label', `${t('savingsRate')} ${rate}%`);
  const recent = sortedTransactions().slice(0,5);
  $('#recent-list').innerHTML = recent.length ? recent.map(item => transactionRow(item, true)).join('') : emptyBlock(state.settings.language === 'ar' ? 'لا توجد حركات بعد' : 'No transactions yet', state.settings.language === 'ar' ? 'أضف أول دخل أو مصروف وسيظهر هنا.' : 'Add your first income or expense and it will appear here.');
}

function filteredTransactions(){
  const type = $('#filter-type').value;
  const category = $('#filter-category').value;
  const month = $('#filter-month').value;
  const query = $('#filter-search').value.trim().toLowerCase();
  return sortedTransactions().filter(item => {
    if (type !== 'all' && item.type !== type) return false;
    if (category !== 'all' && item.category !== category) return false;
    if (month && monthKey(item.date) !== month) return false;
    if (query && !`${item.note} ${categoryLabel(item.category)}`.toLowerCase().includes(query)) return false;
    return true;
  });
}

function renderTransactions(){
  const items = filteredTransactions();
  $('#transaction-list').innerHTML = items.length ? items.map(item => transactionRow(item)).join('') : emptyBlock(state.settings.language === 'ar' ? 'لا توجد نتائج' : 'No results', state.settings.language === 'ar' ? 'غيّر الفلاتر أو أضف حركة جديدة.' : 'Change the filters or add a new transaction.');
  $('#transaction-form-title').textContent = editingTransactionId ? t('updateTransaction') : t('addTransaction');
  $('#transaction-submit').textContent = editingTransactionId ? t('updateTransaction') : t('saveTransaction');
  $('#cancel-edit').classList.toggle('hidden', !editingTransactionId);
}

function renderBudget(){
  const limit = state.budget.monthlyLimit;
  const spent = sumItems(state.transactions.filter(item => inMonth(item, thisMonthKey())), 'expense');
  $('#budget-limit').value = limit || '';
  setText('#budget-spent', money(spent));
  const progress = $('#budget-progress');
  const percentNode = $('#budget-percent');
  const message = $('#budget-message');
  progress.classList.remove('is-over');
  if (!limit) {
    percentNode.textContent = '—';
    progress.style.width = '0%';
    message.textContent = state.settings.language === 'ar' ? 'لم تحدد سقفًا للشهر الحالي.' : 'No ceiling is set for this month.';
  } else {
    const percent = Math.round((spent / limit) * 100);
    percentNode.textContent = `${percent}%`;
    progress.style.width = `${Math.min(100, percent)}%`;
    progress.classList.toggle('is-over', percent > 100);
    const remaining = roundMoney(limit - spent);
    message.textContent = remaining >= 0
      ? (state.settings.language === 'ar' ? `فاضل ${money(remaining)} من حد ${money(limit)}.` : `${money(remaining)} left from a ${money(limit)} limit.`)
      : (state.settings.language === 'ar' ? `تجاوزت الحد بمقدار ${money(Math.abs(remaining))}.` : `You passed the limit by ${money(Math.abs(remaining))}.`);
  }
  const ruleValue = Number($('#rule-income').value) || 0;
  setText('#rule-needs', money(ruleValue * .5));
  setText('#rule-wants', money(ruleValue * .3));
  setText('#rule-savings', money(ruleValue * .2));
}

function goalEstimate(goal){
  const remaining = roundMoney(goal.target - goal.saved);
  if (remaining <= 0) return state.settings.language === 'ar' ? 'اكتمل الهدف.' : 'Goal complete.';
  if (!goal.monthly) return state.settings.language === 'ar' ? 'أضف ادخارًا شهريًا متوقعًا لحساب تاريخ الوصول.' : 'Add an expected monthly saving to estimate completion.';
  const months = Math.ceil(remaining / goal.monthly);
  const date = new Date();
  date.setMonth(date.getMonth() + months);
  const label = new Intl.DateTimeFormat(locale(), { month:'long', year:'numeric' }).format(date);
  return state.settings.language === 'ar' ? `تقدير الوصول: ${label} (${number(months)} شهر).` : `Estimated completion: ${label} (${number(months)} months).`;
}

function goalCard(goal){
  const percent = Math.min(100, Math.round((goal.saved / goal.target) * 100));
  return `<article class="panel goal-card">
    <div class="goal-top">
      <div><h2>${escapeHtml(goal.name)}</h2><p>${percent}% ${state.settings.language === 'ar' ? 'مكتمل' : 'complete'}</p></div>
      <div class="item-actions"><button class="icon-button" type="button" data-edit-goal="${goal.id}">${state.settings.language === 'ar' ? 'تعديل' : 'Edit'}</button><button class="icon-button" type="button" data-delete-goal="${goal.id}">${state.settings.language === 'ar' ? 'حذف' : 'Delete'}</button></div>
    </div>
    <div class="goal-amounts"><span>${t('savedAmount')}<br><strong>${money(goal.saved)}</strong></span><span>${t('targetAmount')}<br><strong>${money(goal.target)}</strong></span></div>
    <div class="progress-track" aria-hidden="true"><span style="width:${percent}%"></span></div>
    <p class="goal-estimate">${escapeHtml(goalEstimate(goal))}</p>
    <div class="goal-actions">
      <input type="number" min="0.01" step="0.01" inputmode="decimal" placeholder="${escapeHtml(t('amountToAdd'))}" aria-label="${escapeHtml(t('amountToAdd'))}" data-goal-amount="${goal.id}">
      <button class="button secondary" type="button" data-add-saving="${goal.id}">${escapeHtml(t('addSaving'))}</button>
    </div>
  </article>`;
}

function renderGoals(){
  const goals = [...state.goals].sort((a,b) => a.createdAt.localeCompare(b.createdAt));
  $('#goals-list').innerHTML = goals.length ? goals.map(goalCard).join('') : emptyBlock(state.settings.language === 'ar' ? 'لا توجد أهداف بعد' : 'No goals yet', state.settings.language === 'ar' ? 'أضف هدفًا مثل الطوارئ أو السفر وابدأ المتابعة.' : 'Add a goal such as emergency savings or travel to start tracking.');
  $('#goal-form-title').textContent = editingGoalId ? t('updateGoal') : t('addGoal');
  $('#goal-submit').textContent = editingGoalId ? t('updateGoal') : t('saveGoal');
  $('#cancel-goal-edit').classList.toggle('hidden', !editingGoalId);
}

function renderAnalytics(){
  $$('.period-switch [data-period]').forEach(btn => btn.classList.toggle('is-active', String(analyticsPeriod) === btn.dataset.period));
  const months = periodMonths(analyticsPeriod);
  const items = itemsForPeriod(analyticsPeriod);
  const income = sumItems(items, 'income');
  const expense = sumItems(items, 'expense');
  const saved = roundMoney(income - expense);
  setText('#analytics-income', money(income));
  setText('#analytics-expense', money(expense));
  setText('#analytics-saved', money(saved));
  const title = analyticsPeriod === 'all'
    ? (state.settings.language === 'ar' ? 'كل الوقت' : 'All time')
    : (state.settings.language === 'ar' ? `آخر ${analyticsPeriod} شهور` : `Last ${analyticsPeriod} months`);
  setText('#cashflow-title', title);
  renderCashflow(months);
  renderCategoryBreakdown(items);
}

function renderCashflow(months){
  const box = $('#cashflow-chart');
  if (!state.transactions.length) {
    box.innerHTML = emptyBlock(state.settings.language === 'ar' ? 'لا توجد بيانات للرسم' : 'No chart data', state.settings.language === 'ar' ? 'أضف حركات أولًا.' : 'Add transactions first.');
    return;
  }
  const monthly = months.map(key => {
    const items = state.transactions.filter(item => monthKey(item.date) === key);
    return { key, income:sumItems(items,'income'), expense:sumItems(items,'expense') };
  });
  const max = Math.max(...monthly.flatMap(item => [item.income, item.expense]), 1);
  const width = Math.max(640, monthly.length * 96);
  const height = 330;
  const base = 270;
  const usable = 220;
  const step = width / monthly.length;
  const grid = [0,.25,.5,.75,1].map(part => `<line class="grid-line" x1="0" x2="${width}" y1="${base - usable * part}" y2="${base - usable * part}"/>`).join('');
  const bars = monthly.map((item, index) => {
    const x = index * step + step / 2;
    const incomeHeight = item.income / max * usable;
    const expenseHeight = item.expense / max * usable;
    return `<g>
      <rect class="bar-income" x="${x - 23}" y="${base - incomeHeight}" width="20" height="${Math.max(2,incomeHeight)}" rx="7"/>
      <rect class="bar-expense" x="${x + 3}" y="${base - expenseHeight}" width="20" height="${Math.max(2,expenseHeight)}" rx="7"/>
      <text class="axis-label" x="${x}" y="305" text-anchor="middle">${escapeHtml(monthLabel(item.key))}</text>
    </g>`;
  }).join('');
  box.innerHTML = `<svg class="cashflow-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeHtml(t('cashflow'))}">${grid}${bars}</svg>`;
}

function renderCategoryBreakdown(items){
  const expenses = items.filter(item => item.type === 'expense');
  const totals = new Map();
  expenses.forEach(item => totals.set(item.category, roundMoney((totals.get(item.category) || 0) + item.amount)));
  const rows = [...totals.entries()].sort((a,b) => b[1] - a[1]).slice(0,7);
  const max = rows.length ? rows[0][1] : 0;
  $('#category-chart').innerHTML = rows.length ? rows.map(([id,total]) => `<div class="category-row">
    <div><strong>${escapeHtml(categoryLabel(id))}</strong><span>${money(total)}</span></div>
    <div class="category-track"><span style="width:${Math.max(3,total / max * 100)}%"></span></div>
  </div>`).join('') : emptyBlock(state.settings.language === 'ar' ? 'لا توجد مصاريف في الفترة' : 'No expenses in this period', state.settings.language === 'ar' ? 'ستظهر الفئات بعد تسجيل مصروف.' : 'Categories appear after an expense is recorded.');
  setText('#analytics-top-category', rows.length ? categoryLabel(rows[0][0]) : '—');
}

function showError(id, message){ setText(id, message); }
function clearTransactionForm(){
  editingTransactionId = null;
  $('#transaction-form').reset();
  $('#transaction-date').value = todayISO();
  document.querySelector('input[name="type"][value="expense"]').checked = true;
  renderCategoryOptions();
  showError('#transaction-error','');
  renderTransactions();
}

function submitTransaction(event){
  event.preventDefault();
  const type = document.querySelector('input[name="type"]:checked').value;
  const amount = Number($('#transaction-amount').value);
  const category = $('#transaction-category').value;
  const date = $('#transaction-date').value;
  const note = $('#transaction-note').value.trim();
  if (!Number.isFinite(amount) || amount <= 0) return showError('#transaction-error', state.settings.language === 'ar' ? 'أدخل مبلغًا صحيحًا أكبر من صفر.' : 'Enter a valid amount above zero.');
  if (!category || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return showError('#transaction-error', state.settings.language === 'ar' ? 'اختر الفئة والتاريخ.' : 'Choose the category and date.');
  const record = normalizeTransaction({ id: editingTransactionId || makeId('txn'), type, amount, category, date, note, createdAt: new Date().toISOString() });
  if (!record) return showError('#transaction-error', state.settings.language === 'ar' ? 'راجع بيانات الحركة.' : 'Check the transaction details.');
  if (editingTransactionId) {
    const index = state.transactions.findIndex(item => item.id === editingTransactionId);
    if (index >= 0) state.transactions[index] = { ...record, createdAt: state.transactions[index].createdAt };
  } else state.transactions.push(record);
  saveState(); clearTransactionForm(); renderApp(); toast(state.settings.language === 'ar' ? 'تم حفظ الحركة.' : 'Transaction saved.');
}

function editTransaction(id){
  const item = state.transactions.find(entry => entry.id === id);
  if (!item) return;
  editingTransactionId = id;
  document.querySelector(`input[name="type"][value="${item.type}"]`).checked = true;
  renderCategoryOptions();
  $('#transaction-amount').value = item.amount;
  $('#transaction-category').value = item.category;
  $('#transaction-date').value = item.date;
  $('#transaction-note').value = item.note;
  renderTransactions();
  $('#transaction-amount').focus();
}

function clearGoalForm(){
  editingGoalId = null;
  $('#goal-form').reset();
  showError('#goal-error','');
  renderGoals();
}

function submitGoal(event){
  event.preventDefault();
  const name = $('#goal-name').value.trim();
  const target = Number($('#goal-target').value);
  const saved = Number($('#goal-saved').value) || 0;
  const monthly = Number($('#goal-monthly').value) || 0;
  if (!name) return showError('#goal-error', state.settings.language === 'ar' ? 'اكتب اسم الهدف.' : 'Enter the goal name.');
  if (!Number.isFinite(target) || target <= 0) return showError('#goal-error', state.settings.language === 'ar' ? 'أدخل مبلغًا مستهدفًا صحيحًا.' : 'Enter a valid target amount.');
  if (saved < 0 || monthly < 0) return showError('#goal-error', state.settings.language === 'ar' ? 'المبالغ لا يمكن أن تكون سالبة.' : 'Amounts cannot be negative.');
  const record = normalizeGoal({ id: editingGoalId || makeId('goal'), name, target, saved, monthly, createdAt: new Date().toISOString() });
  if (editingGoalId) {
    const index = state.goals.findIndex(item => item.id === editingGoalId);
    if (index >= 0) state.goals[index] = { ...record, createdAt: state.goals[index].createdAt };
  } else state.goals.push(record);
  saveState(); clearGoalForm(); renderApp(); toast(state.settings.language === 'ar' ? 'تم حفظ الهدف.' : 'Goal saved.');
}

function editGoal(id){
  const goal = state.goals.find(item => item.id === id);
  if (!goal) return;
  editingGoalId = id;
  $('#goal-name').value = goal.name;
  $('#goal-target').value = goal.target;
  $('#goal-saved').value = goal.saved;
  $('#goal-monthly').value = goal.monthly;
  renderGoals(); $('#goal-name').focus();
}

function addSaving(id){
  const input = document.querySelector(`[data-goal-amount="${CSS.escape(id)}"]`);
  const amount = Number(input.value);
  const goal = state.goals.find(item => item.id === id);
  if (!goal || !Number.isFinite(amount) || amount <= 0) return toast(state.settings.language === 'ar' ? 'أدخل مبلغ إضافة صحيحًا.' : 'Enter a valid saving amount.', true);
  goal.saved = roundMoney(goal.saved + amount);
  saveState(); renderApp(); toast(state.settings.language === 'ar' ? 'تم تحديث الهدف.' : 'Goal updated.');
}

function downloadFile(filename, content, type){
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url; link.download = filename;
  document.body.appendChild(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 500);
}

function csvCell(value){ let text = String(value ?? ''); if (/^[=+@\t\r]/.test(text)) text = `'${text}`; return `"${text.replace(/"/g,'""')}"`; }
function exportCsv(){
  if (!state.transactions.length) return toast(state.settings.language === 'ar' ? 'لا توجد حركات للتصدير.' : 'There are no transactions to export.', true);
  const headers = ['id','type','amount','currency','category','date','note'];
  const lines = [headers.join(',')].concat(sortedTransactions().map(item => [item.id,item.type,item.amount,state.settings.currency,categoryLabel(item.category),item.date,item.note].map(csvCell).join(',')));
  downloadFile(`mizani-transactions-${todayISO()}.csv`, `\ufeff${lines.join('\n')}`, 'text/csv;charset=utf-8');
}

function exportJson(){
  const payload = { app:'Mizani', version:1, exportedAt:new Date().toISOString(), data:state };
  downloadFile(`mizani-backup-${todayISO()}.json`, JSON.stringify(payload,null,2), 'application/json;charset=utf-8');
}

function requestConfirm(title, message, action){
  pendingConfirm = action;
  setText('#confirm-title', title);
  setText('#confirm-message', message);
  $('#confirm-modal').classList.remove('hidden');
  $('#confirm-cancel').focus();
}
function closeConfirm(){ pendingConfirm = null; $('#confirm-modal').classList.add('hidden'); }

function restoreFile(file){
  const reader = new FileReader();
  reader.onerror = () => toast(state.settings.language === 'ar' ? 'تعذر قراءة الملف.' : 'Could not read the file.', true);
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result || ''));
      const data = parsed && parsed.data ? parsed.data : parsed;
      if (!data || typeof data !== 'object' || Array.isArray(data) || !('transactions' in data || 'goals' in data || 'settings' in data || 'budget' in data)) throw new Error('Invalid backup');
      const restored = normalizeState(data);
      pendingRestore = restored;
      requestConfirm(t('restoreJson'), state.settings.language === 'ar' ? 'سيستبدل هذا البيانات الحالية على الجهاز. أكمل؟' : 'This will replace the current data on this device. Continue?', () => {
        state = pendingRestore || emptyState(); pendingRestore = null; saveState(); renderApp(); toast(state.settings.language === 'ar' ? 'تم استرجاع النسخة.' : 'Backup restored.');
      });
    } catch (error) { toast(state.settings.language === 'ar' ? 'ملف النسخة غير صالح.' : 'The backup file is not valid.', true); }
  };
  reader.readAsText(file);
}

function toast(message, error = false){
  const region = $('#toast-region');
  const node = document.createElement('div');
  node.className = `toast${error ? ' error' : ''}`;
  node.textContent = message;
  region.appendChild(node);
  setTimeout(() => node.remove(), 3400);
}

function bindEvents(){
  $$('[data-route]').forEach(btn => btn.addEventListener('click', () => routeTo(btn.dataset.route)));
  $$('[data-go]').forEach(btn => btn.addEventListener('click', () => routeTo(btn.dataset.go)));
  window.addEventListener('hashchange', () => routeTo(location.hash.replace('#',''), false));
  $('#transaction-form').addEventListener('submit', submitTransaction);
  $('#cancel-edit').addEventListener('click', clearTransactionForm);
  $$('input[name="type"]').forEach(input => input.addEventListener('change', renderCategoryOptions));
  ['#filter-type','#filter-category','#filter-month','#filter-search'].forEach(id => $(id).addEventListener('input', renderTransactions));
  $('#transaction-list').addEventListener('click', event => {
    const edit = event.target.closest('[data-edit-transaction]');
    const remove = event.target.closest('[data-delete-transaction]');
    if (edit) editTransaction(edit.dataset.editTransaction);
    if (remove) requestConfirm(state.settings.language === 'ar' ? 'حذف الحركة' : 'Delete transaction', state.settings.language === 'ar' ? 'هل تريد حذف هذه الحركة؟' : 'Delete this transaction?', () => { state.transactions = state.transactions.filter(item => item.id !== remove.dataset.deleteTransaction); saveState(); renderApp(); toast(state.settings.language === 'ar' ? 'تم حذف الحركة.' : 'Transaction deleted.'); });
  });
  $('#budget-form').addEventListener('submit', event => {
    event.preventDefault();
    const limit = Number($('#budget-limit').value);
    if (!Number.isFinite(limit) || limit <= 0) return toast(state.settings.language === 'ar' ? 'أدخل حدًا صحيحًا.' : 'Enter a valid limit.', true);
    state.budget.monthlyLimit = roundMoney(limit); saveState(); renderApp(); toast(state.settings.language === 'ar' ? 'تم حفظ الميزانية.' : 'Budget saved.');
  });
  $('#clear-budget').addEventListener('click', () => { state.budget.monthlyLimit = null; saveState(); renderApp(); });
  $('#rule-income').addEventListener('input', renderBudget);
  $('#use-month-income').addEventListener('click', () => { $('#rule-income').value = sumItems(state.transactions.filter(item => inMonth(item,thisMonthKey())),'income'); renderBudget(); });
  $('#goal-form').addEventListener('submit', submitGoal);
  $('#cancel-goal-edit').addEventListener('click', clearGoalForm);
  $('#goals-list').addEventListener('click', event => {
    const add = event.target.closest('[data-add-saving]');
    const edit = event.target.closest('[data-edit-goal]');
    const remove = event.target.closest('[data-delete-goal]');
    if (add) addSaving(add.dataset.addSaving);
    if (edit) editGoal(edit.dataset.editGoal);
    if (remove) requestConfirm(state.settings.language === 'ar' ? 'حذف الهدف' : 'Delete goal', state.settings.language === 'ar' ? 'هل تريد حذف هذا الهدف؟' : 'Delete this goal?', () => { state.goals = state.goals.filter(item => item.id !== remove.dataset.deleteGoal); saveState(); renderApp(); toast(state.settings.language === 'ar' ? 'تم حذف الهدف.' : 'Goal deleted.'); });
  });
  $$('.period-switch [data-period]').forEach(btn => btn.addEventListener('click', () => { analyticsPeriod = btn.dataset.period === 'all' ? 'all' : Number(btn.dataset.period); renderAnalytics(); }));
  $$('[data-setting-lang]').forEach(btn => btn.addEventListener('click', () => { state.settings.language = btn.dataset.settingLang; saveState(); renderApp(); }));
  $$('[data-setting-theme]').forEach(btn => btn.addEventListener('click', () => { state.settings.theme = btn.dataset.settingTheme; saveState(); renderApp(); }));
  $('#currency-select').addEventListener('change', event => { state.settings.currency = event.target.value; saveState(); renderApp(); });
  $('#export-csv').addEventListener('click', exportCsv);
  $('#export-json').addEventListener('click', exportJson);
  $('#restore-json').addEventListener('change', event => { const file = event.target.files[0]; if (file) restoreFile(file); event.target.value = ''; });
  $('#reset-data').addEventListener('click', () => requestConfirm(t('resetData'), t('resetWarning'), () => { state = emptyState(); saveState(); renderApp(); toast(state.settings.language === 'ar' ? 'تم مسح البيانات.' : 'Data reset.'); }));
  $('#confirm-cancel').addEventListener('click', closeConfirm);
  $('#confirm-modal').addEventListener('click', event => { if (event.target.id === 'confirm-modal') closeConfirm(); });
  $('#confirm-ok').addEventListener('click', () => { const action = pendingConfirm; closeConfirm(); if (action) action(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !$('#confirm-modal').classList.contains('hidden')) closeConfirm(); });
}

function init(){
  $('#transaction-date').value = todayISO();
  bindEvents();
  renderApp();
  routeTo(location.hash.replace('#','') || 'overview', false);
}

init();
})();
