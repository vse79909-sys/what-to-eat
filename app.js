/**
 * 《吃什么》 - 小两口专属家庭点菜与排餐系统
 * 业务逻辑核心控制器
 */

// --- 菜谱版本与初始预置数据 ---
const CURRENT_MENU_VERSION = '2026_09_23_v22';

const DEFAULT_CATEGORIES = ['家常荤菜', '清爽素菜', '拿手硬菜', '主食简餐'];

const DEFAULT_DISHES = [
  {
    id: 'dish_01',
    name: '农家青椒炒肉',
    category: '家常荤菜',
    tags: ['下饭神器', '香辣过瘾', '快手小炒'],
    notes: '五花肉煸出油脂微焦更香，青椒大火断生即可出锅',
    image: 'dishes/dish_01.jpg',
    createdAt: Date.now() - 220000
  },
  {
    id: 'dish_02',
    name: '手撕炝炒包菜',
    category: '清爽素菜',
    tags: ['爽脆酸辣', '快手下饭', '解腻清爽'],
    notes: '大火爆炒，出锅前烹入少许香醋和蒜末更脆嫩',
    image: 'dishes/dish_02.jpg',
    createdAt: Date.now() - 210000
  },
  {
    id: 'dish_03',
    name: '香煎葱花鸡蛋软饼',
    category: '主食简餐',
    tags: ['元气早餐', '葱香浓郁', '外酥里软'],
    notes: '平底锅少油慢煎至金黄两面，配粥搭配绝赞',
    image: 'dishes/dish_03.jpg',
    createdAt: Date.now() - 200000
  },
  {
    id: 'dish_04',
    name: '砂锅香辣干锅虾',
    category: '拿手硬菜',
    tags: ['鲜香麻辣', '大餐硬菜', '聚会必备'],
    notes: '鲜虾开背去虾线，底料炒香，吸饱汤汁的配菜和方便面超绝',
    image: 'dishes/dish_04.jpg',
    createdAt: Date.now() - 190000
  },
  {
    id: 'dish_05',
    name: '家常青椒炒鸡蛋',
    category: '清爽素菜',
    tags: ['快手常备', '家常经典', '清香下饭'],
    notes: '鸡蛋滑熟先盛出，尖椒炒出虎皮再合炒调味',
    image: 'dishes/dish_05.jpg',
    createdAt: Date.now() - 180000
  },
  {
    id: 'dish_06',
    name: '洋葱黑椒炒肉段',
    category: '家常荤菜',
    tags: ['浓郁黑椒', '肉嫩多汁', '下饭硬菜'],
    notes: '洋葱大火炒出清甜，肉段滑嫩鲜香黑椒风味十足',
    image: 'dishes/dish_06.jpg',
    createdAt: Date.now() - 170000
  },
  {
    id: 'dish_07',
    name: '地皮菜炒鸡蛋',
    category: '清爽素菜',
    tags: ['山野时令', '鲜嫩多汁', '营养健康'],
    notes: '地皮菜彻底清洗沥干，旺火翻炒，蛋香野香融合',
    image: 'dishes/dish_07.jpg',
    createdAt: Date.now() - 160000
  },
  {
    id: 'dish_08',
    name: '家常豆角炒肉片',
    category: '家常荤菜',
    tags: ['家常经典', '下饭小炒', '咸鲜适口'],
    notes: '四季豆一定要充分煸熟炒透，肉片嫩滑入味',
    image: 'dishes/dish_08.jpg',
    createdAt: Date.now() - 150000
  },
  {
    id: 'dish_09',
    name: '蒜蓉清炒西兰花',
    category: '清爽素菜',
    tags: ['少油健康', '清淡爽口', '减脂推荐'],
    notes: '西兰花先沸水焯烫30秒，大火蒜蓉爆香翻炒翠绿脆嫩',
    image: 'dishes/dish_09.jpg',
    createdAt: Date.now() - 140000
  },
  {
    id: 'dish_10',
    name: '嫩滑生抽蒸蛋羹',
    category: '清爽素菜',
    tags: ['嫩如布丁', '老少咸宜', '暖胃易消化'],
    notes: '蛋水比例1:1.5温水过筛，蒸8分钟焖2分钟，淋生抽香油',
    image: 'dishes/dish_10.jpg',
    createdAt: Date.now() - 130000
  },
  {
    id: 'dish_11',
    name: '家常红烧老豆腐',
    category: '清爽素菜',
    tags: ['外酥里嫩', '浓油赤酱', '下饭神器'],
    notes: '老豆腐煎至两面金黄微皱，加青红椒小火煨炖吸饱汤汁',
    image: 'dishes/dish_11.jpg',
    createdAt: Date.now() - 120000
  },
  {
    id: 'dish_12',
    name: '秘制香辣红烧鸡爪',
    category: '拿手硬菜',
    tags: ['软糯脱骨', '胶原蛋白', '追剧解馋'],
    notes: '鸡爪焯水后慢火煨炖40分钟至酥烂脱骨，大火浓郁收汁',
    image: 'dishes/dish_12.jpg',
    createdAt: Date.now() - 110000
  },
  {
    id: 'dish_13',
    name: '香辣红烧鸡翅中',
    category: '家常荤菜',
    tags: ['外焦里嫩', '女朋友最爱', '吮指留香'],
    notes: '翅中两面划花刀入味，煎至金黄后再红烧焖煮入味收汁',
    image: 'dishes/dish_13.jpg',
    createdAt: Date.now() - 100000
  },
  {
    id: 'dish_14',
    name: '农家韭菜炒鸡蛋',
    category: '清爽素菜',
    tags: ['快手3分钟', '鲜香扑鼻', '家常经典'],
    notes: '旺火热油，韭菜断生即刻关火出锅，锁住脆嫩多汁',
    image: 'dishes/dish_14.jpg',
    createdAt: Date.now() - 90000
  },
  {
    id: 'dish_15',
    name: '砂锅土豆炖牛肉',
    category: '拿手硬菜',
    tags: ['肉烂汤浓', '拌饭极品', '大厨手艺'],
    notes: '牛腩慢火煲煨1.5小时软烂入味，土豆绵密起沙浸透浓汤',
    image: 'dishes/dish_15.jpg',
    createdAt: Date.now() - 80000
  },
  {
    id: 'dish_16',
    name: '酸辣炝炒藕片',
    category: '清爽素菜',
    tags: ['清脆爽口', '酸辣开胃', '解腻小菜'],
    notes: '莲藕切薄片过凉水洗净淀粉，干辣椒花椒大火炝炒清脆',
    image: 'dishes/dish_16.jpg',
    createdAt: Date.now() - 70000
  },
  {
    id: 'dish_17',
    name: '包菜肉末炒粉丝',
    category: '家常荤菜',
    tags: ['根根爽滑', '喷香下饭', '经典家常'],
    notes: '粉丝温水泡软，肉末煸香出油，包菜丝大火快炒合匀入味',
    image: 'dishes/dish_17.jpg',
    createdAt: Date.now() - 60000
  },
  {
    id: 'dish_18',
    name: '下饭蒜苔炒肉片',
    category: '家常荤菜',
    tags: ['清甜爽脆', '肉丝滑嫩', '家常必点'],
    notes: '蒜苔煸炒至微现虎皮，肉片提前浆好滑油，鲜香可口',
    image: 'dishes/dish_18.jpg',
    createdAt: Date.now() - 50000
  },
  {
    id: 'dish_19',
    name: '东北豆角土豆炖粉条',
    category: '拿手硬菜',
    tags: ['浓油热乎', '大锅炖菜', '冬日暖胃'],
    notes: '五花肉煸出油脂炒香豆角，加土豆粉条大火烧开转慢炖入味',
    image: 'dishes/dish_19.jpg',
    createdAt: Date.now() - 40000
  },
  {
    id: 'dish_20',
    name: '经典川味水煮肉片',
    category: '拿手硬菜',
    tags: ['麻辣鲜香', '滑嫩过瘾', '大餐硬菜'],
    notes: '豆芽包菜垫底，肉片轻薄滑嫩，最后泼上滚烫辣椒花椒蒜油',
    image: 'dishes/dish_20.jpg',
    createdAt: Date.now() - 30000
  },
  {
    id: 'dish_21',
    name: '香辣葱姜炒花蛤',
    category: '拿手硬菜',
    tags: ['鲜美多汁', '夜宵大排档', '无沙开胃'],
    notes: '花蛤提前加香油和盐充分吐沙，大火葱姜爆炒至壳刚张开',
    image: 'dishes/dish_21.jpg',
    createdAt: Date.now() - 20000
  },
  {
    id: 'dish_22',
    name: '家常青椒炒火腿肠',
    category: '家常荤菜',
    tags: ['儿时回忆', '快手下饭', '简单美味'],
    notes: '火腿切厚片先两面煎出微微焦香边，青椒大火合炒爽脆甜辣',
    image: 'dishes/dish_22.jpg',
    createdAt: Date.now() - 10000
  }
];

// --- 全局状态管理 ---
let appState = {
  activeTab: 'plan',
  weekOffset: 0, // 0 表示当前周, -1 上周, +1 下周
  selectedDateStr: '', // 当前选中的具体日期 YYYY-MM-DD
  categories: [],
  dishes: [],
  mealPlans: {}, // 格式: { "2026-09-23": { lunch: ['dish_1'], dinner: ['dish_2', 'dish_3'] } }
  activeCategoryFilter: '全部',
  pickerTargetMeal: 'lunch', // 当前点菜弹窗目标: 'lunch' 或 'dinner'
  tempUploadImage: '' // 临时拍照压缩后的 base64
};

// --- UI 视觉与排版引擎配置 ---
const DEFAULT_UI_SETTINGS = {
  density: 'comfortable', // 'comfortable' (宽松舒适) | 'compact' (紧凑)
  dishLayout: 'double-col', // 'double-col' (精致双列) | 'single-col' (单列大图)
  theme: 'orange', // 'orange' | 'green' | 'pink' | 'stone'
  radius: 'large', // 'large' (24px) | 'medium' (16px) | 'small' (10px)
  fontSize: 'standard' // 'standard' | 'large'
};

function loadUiSettings() {
  try {
    const saved = localStorage.getItem('wt_ui_settings');
    const settings = saved ? { ...DEFAULT_UI_SETTINGS, ...JSON.parse(saved) } : DEFAULT_UI_SETTINGS;
    applyUiSettings(settings);
    return settings;
  } catch (e) {
    applyUiSettings(DEFAULT_UI_SETTINGS);
    return DEFAULT_UI_SETTINGS;
  }
}

function applyUiSettings(settings) {
  if (!settings) return;
  const classes = [];
  classes.push(settings.density === 'compact' ? 'density-compact' : 'density-comfortable');
  if (settings.dishLayout === 'single-col') classes.push('layout-single-col');
  if (settings.theme) classes.push(`theme-${settings.theme}`);
  if (settings.radius) classes.push(`radius-${settings.radius}`);
  if (settings.fontSize === 'large') classes.push('font-large');

  document.documentElement.className = classes.join(' ');
  if (document.body) {
    document.body.className = `bg-cream text-stone-800 min-h-screen pb-24 md:pb-12 font-sans antialiased selection:bg-brand-100 ${classes.join(' ')}`;
  }
}

// 监听跨页面 / iframe 消息（来自后台管理模拟器）
window.addEventListener('message', (event) => {
  if (!event.data) return;
  if (event.data.type === 'WT_UPDATE_UI') {
    applyUiSettings(event.data.settings);
  } else if (event.data.type === 'WT_RELOAD_DATA') {
    loadFromStorage();
    renderAllViews();
  } else if (event.data.type === 'WT_SWITCH_TAB') {
    switchTab(event.data.tab);
  }
});

// 监听跨标签页 localStorage 变动
window.addEventListener('storage', (e) => {
  if (e.key === 'wt_dishes' || e.key === 'wt_categories' || e.key === 'wt_meal_plans') {
    loadFromStorage();
    renderAllViews();
  } else if (e.key === 'wt_ui_settings') {
    loadUiSettings();
  }
});

// --- 初始化与本地存储 ---
function initApp() {
  loadUiSettings();
  loadFromStorage();
  checkUrlSync();
  initCalendarDates();
  renderWeekSelector();
  renderCurrentDayMeals();
  renderCategoryFilterBar();
  renderDishesGrid();

  if (document.getElementById('stat-total-dishes')) {
    renderAdminCategories();
    renderAdminTable();
    updateStats();
  }

  // 初始化 Lucide 图标
  if (window.lucide) {
    lucide.createIcons();
  }
}

function base64ToUtf8(str) {
  return decodeURIComponent(Array.prototype.map.call(atob(str), (c) => {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

// 检查 URL 中是否有来自大厨后台的同步参数 (?sync=...)
function checkUrlSync() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const syncParam = urlParams.get('sync');
    if (!syncParam) return;

    const jsonStr = base64ToUtf8(decodeURIComponent(syncParam));
    const payload = JSON.parse(jsonStr);

    if (payload && (payload.diffs || payload.categories || payload.deletedIds)) {
      let currentDishes = localStorage.getItem('wt_dishes')
        ? JSON.parse(localStorage.getItem('wt_dishes'))
        : JSON.parse(JSON.stringify(DEFAULT_DISHES));

      if (payload.deletedIds && payload.deletedIds.length > 0) {
        currentDishes = currentDishes.filter(d => !payload.deletedIds.includes(d.id));
      }

      if (payload.diffs && payload.diffs.length > 0) {
        payload.diffs.forEach(diff => {
          const idx = currentDishes.findIndex(d => d.id === diff.id);
          if (idx >= 0) {
            currentDishes[idx] = { ...currentDishes[idx], ...diff };
          } else {
            currentDishes.push(diff);
          }
        });
      }

      localStorage.setItem('wt_dishes', JSON.stringify(currentDishes));
      appState.dishes = currentDishes;

      if (payload.categories && Array.isArray(payload.categories)) {
        localStorage.setItem('wt_categories', JSON.stringify(payload.categories));
        appState.categories = payload.categories;
      }

      // 移除 URL 中的 sync 参数，保持地址栏干净
      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);

      setTimeout(() => {
        showToast('🎉 收到大厨最新菜单更新，已成功同步到手机！');
      }, 350);
    }
  } catch (e) {
    console.warn('URL 同步数据解析失败', e);
  }
}

function renderAllViews() {
  initCalendarDates();
  renderWeekSelector();
  renderCurrentDayMeals();
  renderCategoryFilterBar();
  renderDishesGrid();

  if (document.getElementById('stat-total-dishes')) {
    renderAdminCategories();
    renderAdminTable();
    updateStats();
  }

  if (window.lucide) {
    lucide.createIcons();
  }
}

function loadFromStorage() {
  try {
    const savedVersion = localStorage.getItem('wt_menu_version');
    const savedDishes = localStorage.getItem('wt_dishes');
    const savedCats = localStorage.getItem('wt_categories');
    const savedPlans = localStorage.getItem('wt_meal_plans');

    if (savedVersion !== CURRENT_MENU_VERSION) {
      // 自动升级到全新 22 道大厨实拍菜谱
      let preservedCustom = [];
      if (savedDishes) {
        try {
          const parsed = JSON.parse(savedDishes);
          // 过滤掉旧的 10 道 unsplash 示范菜，保留用户后续自己录入的菜品
          preservedCustom = parsed.filter(d => !d.image || !d.image.includes('unsplash.com'));
        } catch (e) {}
      }

      // 合并：以新 22 道菜为主，保留用户自己的新增菜
      appState.dishes = [...DEFAULT_DISHES, ...preservedCustom.filter(c => !DEFAULT_DISHES.some(d => d.id === c.id))];
      appState.categories = DEFAULT_CATEGORIES;
      appState.mealPlans = savedPlans ? JSON.parse(savedPlans) : {};

      localStorage.setItem('wt_menu_version', CURRENT_MENU_VERSION);
      saveToStorage();
    } else {
      appState.dishes = savedDishes ? JSON.parse(savedDishes) : DEFAULT_DISHES;
      appState.categories = savedCats ? JSON.parse(savedCats) : DEFAULT_CATEGORIES;
      appState.mealPlans = savedPlans ? JSON.parse(savedPlans) : {};
    }
  } catch (e) {
    console.error('读取存储失败，重置为默认数据', e);
    appState.dishes = DEFAULT_DISHES;
    appState.categories = DEFAULT_CATEGORIES;
    appState.mealPlans = {};
    localStorage.setItem('wt_menu_version', CURRENT_MENU_VERSION);
  }
}

function saveToStorage() {
  try {
    localStorage.setItem('wt_menu_version', CURRENT_MENU_VERSION);
    localStorage.setItem('wt_dishes', JSON.stringify(appState.dishes));
    localStorage.setItem('wt_categories', JSON.stringify(appState.categories));
    localStorage.setItem('wt_meal_plans', JSON.stringify(appState.mealPlans));
    updateStats();
  } catch (e) {
    console.warn('存储配额超限警告', e);
    showToast('存储警告：图片较多，建议定期导出备份！');
  }
}

// --- 标签页切换 ---
function switchTab(tabId) {
  appState.activeTab = tabId;

  // 切换内容区域
  document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
  const target = document.getElementById(`tab-${tabId}`);
  if (target) target.classList.remove('hidden');

  // 切换电脑端导航激活态
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });

  // 切换手机端底部导航激活态
  document.querySelectorAll('.mobile-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });

  // 切到不同 tab 时刷新相应界面
  if (tabId === 'dishes') {
    renderCategoryFilterBar();
    renderDishesGrid();
  } else if (tabId === 'admin') {
    renderAdminCategories();
    renderAdminTable();
    updateStats();
  } else if (tabId === 'plan') {
    renderCurrentDayMeals();
  } else if (tabId === 'add') {
    renderCategorySelectOptions('new-dish-category');
  }

  // 重新挂载图标
  if (window.lucide) {
    lucide.createIcons();
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- 周日历与日期计算 ---
function getWeekDates(offset = 0) {
  const now = new Date();
  // 加上周偏移量 (offset * 7 天)
  now.setDate(now.getDate() + offset * 7);

  // 获取当前是星期几 (0是周日, 1是周一)
  const currentDay = now.getDay();
  // 转换为以周一为第一天的偏移 (0: 周一, ..., 6: 周日)
  const mondayDiff = currentDay === 0 ? -6 : 1 - currentDay;

  const monday = new Date(now);
  monday.setDate(now.getDate() + mondayDiff);

  const weekDays = [];
  const weekNames = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const date = String(d.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${date}`;

    // 判断是否是真实系统今天
    const realToday = new Date();
    const isRealToday = (
      realToday.getFullYear() === d.getFullYear() &&
      realToday.getMonth() === d.getMonth() &&
      realToday.getDate() === d.getDate()
    );

    weekDays.push({
      dateStr,
      month: d.getMonth() + 1,
      dayNumber: d.getDate(),
      weekName: weekNames[i],
      isToday: isRealToday
    });
  }

  return weekDays;
}

function initCalendarDates() {
  const weekDays = getWeekDates(appState.weekOffset);
  // 默认选中真实今天，如果没有匹配的（非本周），选中周一
  const todayItem = weekDays.find(d => d.isToday);
  appState.selectedDateStr = todayItem ? todayItem.dateStr : weekDays[0].dateStr;
}

function changeWeek(diff) {
  appState.weekOffset += diff;
  const weekDays = getWeekDates(appState.weekOffset);
  appState.selectedDateStr = weekDays[0].dateStr;
  renderWeekSelector();
  renderCurrentDayMeals();
}

function resetToCurrentWeek() {
  appState.weekOffset = 0;
  initCalendarDates();
  renderWeekSelector();
  renderCurrentDayMeals();
}

function selectDay(dateStr) {
  appState.selectedDateStr = dateStr;
  renderWeekSelector();
  renderCurrentDayMeals();
}

// --- 渲染周选择胶囊 ---
function renderWeekSelector() {
  const weekDays = getWeekDates(appState.weekOffset);
  const container = document.getElementById('week-day-selector');
  if (!container) return;

  // 更新周标签
  const weekLabel = document.getElementById('current-week-label');
  if (weekLabel) {
    if (appState.weekOffset === 0) weekLabel.textContent = '本周菜单';
    else if (appState.weekOffset === 1) weekLabel.textContent = '下周菜单';
    else if (appState.weekOffset === -1) weekLabel.textContent = '上周菜单';
    else weekLabel.textContent = `${appState.weekOffset > 0 ? '+' : ''}${appState.weekOffset}周菜单`;
  }

  // 顶部今天日期简述
  const todayDesc = document.getElementById('today-date-text');
  if (todayDesc) {
    const activeDay = weekDays.find(d => d.dateStr === appState.selectedDateStr);
    if (activeDay) {
      todayDesc.textContent = `${activeDay.month}月${activeDay.dayNumber}日 ${activeDay.weekName}${activeDay.isToday ? ' (今天)' : ''}`;
    }
  }

  container.innerHTML = weekDays.map(day => {
    const isActive = day.dateStr === appState.selectedDateStr;
    const plan = appState.mealPlans[day.dateStr];
    const hasDishes = plan && ((plan.lunch && plan.lunch.length > 0) || (plan.dinner && plan.dinner.length > 0));

    return `
      <button onclick="selectDay('${day.dateStr}')" 
        class="day-pill flex-1 min-w-[72px] py-2.5 px-2 rounded-2xl flex flex-col items-center justify-center border transition-all text-xs cursor-pointer ${
          isActive 
            ? 'active bg-brand-500 text-white border-transparent' 
            : 'bg-white text-stone-700 border-stone-200/80 hover:bg-stone-50'
        }">
        <span class="text-[11px] font-medium opacity-80">${day.weekName}</span>
        <span class="text-base font-black my-0.5">${day.dayNumber}</span>
        <div class="flex items-center gap-1 mt-0.5">
          ${day.isToday ? '<span class="w-1.5 h-1.5 rounded-full bg-rose-400"></span>' : ''}
          ${hasDishes ? '<span class="text-[9px] font-bold ' + (isActive ? 'text-white/90' : 'text-brand-600') + '">已点</span>' : '<span class="text-[9px] opacity-40">未点</span>'}
        </div>
      </button>
    `;
  }).join('');
}

// --- 渲染当天午餐与晚餐 ---
function renderCurrentDayMeals() {
  const plan = appState.mealPlans[appState.selectedDateStr] || { lunch: [], dinner: [] };
  const lunchContainer = document.getElementById('lunch-dish-list');
  const dinnerContainer = document.getElementById('dinner-dish-list');

  if (lunchContainer) {
    lunchContainer.innerHTML = renderMealDishesList(plan.lunch, 'lunch');
  }
  if (dinnerContainer) {
    dinnerContainer.innerHTML = renderMealDishesList(plan.dinner, 'dinner');
  }

  if (window.lucide) {
    lucide.createIcons();
  }
}

function renderMealDishesList(dishIds = [], mealType) {
  if (!dishIds || dishIds.length === 0) {
    return `
      <div class="py-7 flex flex-col items-center justify-center text-center text-stone-400 border border-dashed border-stone-200 rounded-2xl bg-stone-50/50">
        <i data-lucide="cooking-pot" class="w-7 h-7 stroke-1 text-stone-300 mb-1.5"></i>
        <p class="text-xs font-bold text-stone-500">还空空如也呢</p>
        <p class="text-[11px] text-stone-400 mt-0.5">快点击右上角“+ 点菜”排餐吧</p>
      </div>
    `;
  }

  return dishIds.map((dishId, idx) => {
    const dish = appState.dishes.find(d => d.id === dishId);
    if (!dish) return '';

    return `
      <div class="dish-card flex items-center justify-between p-2.5 bg-stone-50/80 hover:bg-stone-50 border border-stone-200/60 rounded-2xl group transition-all">
        <div class="flex items-center gap-3 min-w-0">
          <img src="${dish.image}" alt="${dish.name}" class="w-12 h-12 rounded-xl object-cover flex-shrink-0 shadow-sm">
          <div class="min-w-0">
            <h4 class="text-sm font-black text-stone-900 truncate">${dish.name}</h4>
            <div class="flex flex-wrap gap-1 mt-0.5">
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-amber-100/70 text-amber-700 font-bold">${dish.category}</span>
              ${(dish.tags || []).slice(0, 2).map(tag => `<span class="text-[10px] px-1.5 py-0.5 rounded bg-stone-200/60 text-stone-600">${tag}</span>`).join('')}
            </div>
          </div>
        </div>
        <button onclick="removeDishFromMeal('${mealType}', ${idx})" title="移除此菜" class="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors ml-2 flex-shrink-0">
          <i data-lucide="trash-2" class="w-4 h-4"></i>
        </button>
      </div>
    `;
  }).join('');
}

function removeDishFromMeal(mealType, index) {
  const plan = appState.mealPlans[appState.selectedDateStr];
  if (!plan || !plan[mealType]) return;

  plan[mealType].splice(index, 1);
  saveToStorage();
  renderCurrentDayMeals();
  renderWeekSelector();
  showToast('已从餐单中移除');
}

// --- 点菜选择器弹窗 ---
function openDishPicker(mealType) {
  appState.pickerTargetMeal = mealType;
  appState.activePickerCategoryFilter = '全部';
  const modal = document.getElementById('dish-picker-modal');
  const title = document.getElementById('picker-target-title');
  const search = document.getElementById('picker-search-input');

  const weekDays = getWeekDates(appState.weekOffset);
  const activeDay = weekDays.find(d => d.dateStr === appState.selectedDateStr);
  const dayName = activeDay ? `${activeDay.weekName} (${activeDay.month}月${activeDay.dayNumber}日)` : '';
  const mealName = mealType === 'lunch' ? '☀️ 午餐' : '🌙 晚餐';

  if (title) {
    title.textContent = `${dayName} · ${mealName}`;
  }
  if (search) {
    search.value = '';
  }

  renderPickerCategoryFilterBar();
  filterPickerDishes();

  if (modal) {
    modal.classList.remove('hidden');
  }
  if (window.lucide) {
    lucide.createIcons();
  }
}

function closeDishPicker() {
  const modal = document.getElementById('dish-picker-modal');
  if (modal) modal.classList.add('hidden');
}

function renderPickerCategoryFilterBar() {
  const container = document.getElementById('picker-category-filter-bar');
  if (!container) return;

  const currentCat = appState.activePickerCategoryFilter || '全部';
  const allCats = ['全部', ...appState.categories];

  container.innerHTML = allCats.map(cat => {
    const isActive = currentCat === cat;
    return `
      <button type="button" onclick="setPickerCategoryFilter('${cat}')" 
        class="px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
          isActive 
            ? 'bg-brand-500 text-white shadow-xs' 
            : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
        }">
        ${cat}
      </button>
    `;
  }).join('');
}

function setPickerCategoryFilter(cat) {
  appState.activePickerCategoryFilter = cat;
  renderPickerCategoryFilterBar();
  filterPickerDishes();
}

function filterPickerDishes() {
  const searchInput = document.getElementById('picker-search-input');
  const keyword = (searchInput ? searchInput.value : '').trim().toLowerCase();
  const currentCat = appState.activePickerCategoryFilter || '全部';

  const filtered = appState.dishes.filter(d => {
    const matchCat = (currentCat === '全部') || (d.category === currentCat);
    const matchKey = !keyword || 
      d.name.toLowerCase().includes(keyword) ||
      d.category.toLowerCase().includes(keyword) ||
      (d.tags || []).some(t => t.toLowerCase().includes(keyword));
    return matchCat && matchKey;
  });
  renderPickerDishes(filtered);
}

function renderPickerDishes(dishList) {
  const container = document.getElementById('picker-dishes-container');
  if (!container) return;

  if (dishList.length === 0) {
    container.innerHTML = `
      <div class="col-span-2 py-10 text-center text-stone-400">
        <p class="text-xs">没有找到符合的菜品~</p>
      </div>
    `;
    return;
  }

  container.innerHTML = dishList.map(dish => {
    return `
      <div onclick="addDishToCurrentMeal('${dish.id}')" 
        class="dish-card bg-stone-50 hover:bg-amber-50/50 p-2.5 rounded-2xl border border-stone-200/80 cursor-pointer flex flex-col justify-between group transition-all">
        <div>
          <div class="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-2 bg-stone-200">
            <img src="${dish.image}" alt="${dish.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
            <span class="absolute top-1.5 left-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded bg-black/60 text-white backdrop-blur-sm">${dish.category}</span>
          </div>
          <h4 class="text-xs font-black text-stone-900 truncate mb-1">${dish.name}</h4>
          <p class="text-[10px] text-stone-400 truncate">${(dish.tags || []).join(' · ')}</p>
        </div>
        <button type="button" class="mt-2 w-full py-1 bg-brand-500 hover:bg-brand-600 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1 shadow-sm">
          <i data-lucide="plus" class="w-3.5 h-3.5"></i> 加入
        </button>
      </div>
    `;
  }).join('');

  if (window.lucide) {
    lucide.createIcons();
  }
}

function addDishToCurrentMeal(dishId) {
  const dateStr = appState.selectedDateStr;
  const mealType = appState.pickerTargetMeal;

  if (!appState.mealPlans[dateStr]) {
    appState.mealPlans[dateStr] = { lunch: [], dinner: [] };
  }
  if (!appState.mealPlans[dateStr][mealType]) {
    appState.mealPlans[dateStr][mealType] = [];
  }

  appState.mealPlans[dateStr][mealType].push(dishId);
  saveToStorage();
  renderCurrentDayMeals();
  renderWeekSelector();

  const dish = appState.dishes.find(d => d.id === dishId);
  showToast(`已成功添加【${dish ? dish.name : '新菜品'}】！`);
}

// --- 选择困难拯救器：一键盲盒搭配 (一硬一荤一素或荤素均衡) ---
function surpriseMealPlan() {
  const meats = appState.dishes.filter(d => d.category.includes('荤') || d.category.includes('硬') || d.category.includes('肉') || d.category.includes('鸡') || d.category.includes('虾'));
  const vegs = appState.dishes.filter(d => d.category.includes('素') || d.category.includes('菜') || d.category.includes('清爽'));

  // 随机挑出
  const pickRandom = (arr) => arr.length > 0 ? arr[Math.floor(Math.random() * arr.length)] : null;

  const chosen = [];
  const m = pickRandom(meats.length > 0 ? meats : appState.dishes);
  if (m) chosen.push(m.id);

  const v = pickRandom(vegs.length > 0 ? vegs : appState.dishes);
  if (v && !chosen.includes(v.id)) chosen.push(v.id);

  const pool = appState.dishes.filter(d => !chosen.includes(d.id));
  const s = pickRandom(pool.length > 0 ? pool : appState.dishes);
  if (s && !chosen.includes(s.id)) chosen.push(s.id);

  const dateStr = appState.selectedDateStr;
  if (!appState.mealPlans[dateStr]) {
    appState.mealPlans[dateStr] = { lunch: [], dinner: [] };
  }

  // 默认直接赋给晚餐（如果是晚上），或根据当前时间决定
  const currentHour = new Date().getHours();
  const targetMeal = currentHour < 14 ? 'lunch' : 'dinner';
  appState.mealPlans[dateStr][targetMeal] = chosen;

  saveToStorage();
  renderCurrentDayMeals();
  renderWeekSelector();
  showToast(`菜单已安排！已为今天${targetMeal === 'lunch' ? '午餐' : '晚餐'}自动搭配了 3 道美味！✨`);
}

// --- 菜品大厅与分类筛选 ---
function renderCategoryFilterBar() {
  const container = document.getElementById('category-filter-bar');
  if (!container) return;

  const allCats = ['全部', ...appState.categories];
  container.innerHTML = allCats.map(cat => {
    const isActive = appState.activeCategoryFilter === cat;
    return `
      <button onclick="setCategoryFilter('${cat}')" 
        class="px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
          isActive 
            ? 'bg-brand-500 text-white shadow-sm shadow-brand-500/20' 
            : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
        }">
        ${cat}
      </button>
    `;
  }).join('');
}

function setCategoryFilter(cat) {
  appState.activeCategoryFilter = cat;
  renderCategoryFilterBar();
  filterDishes();
}

function filterDishes() {
  const searchInput = document.getElementById('search-dish-input');
  const keyword = (searchInput ? searchInput.value : '').trim().toLowerCase();
  const currentCat = appState.activeCategoryFilter;

  const filtered = appState.dishes.filter(dish => {
    const matchCat = (currentCat === '全部') || (dish.category === currentCat);
    const matchKeyword = !keyword || 
      dish.name.toLowerCase().includes(keyword) ||
      dish.category.toLowerCase().includes(keyword) ||
      (dish.tags || []).some(t => t.toLowerCase().includes(keyword));
    return matchCat && matchKeyword;
  });

  renderDishesGrid(filtered);
}

function renderDishesGrid(list = null) {
  const container = document.getElementById('dishes-grid');
  if (!container) return;

  const displayList = list !== null ? list : appState.dishes;

  if (displayList.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center text-stone-400">
        <i data-lucide="inbox" class="w-10 h-10 stroke-1 mx-auto text-stone-300 mb-2"></i>
        <p class="text-sm font-bold text-stone-500">没有找到相关菜品</p>
        <p class="text-xs text-stone-400 mt-1">快去“拍新菜”里增加第一道属于你们的拿手美味吧~</p>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
    return;
  }

  container.innerHTML = displayList.map(dish => {
    return `
      <div class="dish-card bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-soft flex flex-col justify-between group">
        <div class="card-main-content flex flex-col">
          <div class="card-thumb-wrap relative w-full aspect-[4/3] bg-stone-100 overflow-hidden">
            <img src="${dish.image}" alt="${dish.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
            <span class="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-lg bg-black/60 text-white backdrop-blur-md">${dish.category}</span>
          </div>
          <div class="card-info-wrap p-3">
            <h3 class="font-black text-stone-900 text-sm truncate mb-1">${dish.name}</h3>
            <div class="flex flex-wrap gap-1 mb-1.5">
              ${(dish.tags || []).slice(0, 3).map(tag => `<span class="text-[10px] px-1.5 py-0.5 rounded bg-stone-100 text-stone-600">${tag}</span>`).join('')}
            </div>
            ${dish.notes ? `<p class="text-[10px] text-stone-400 line-clamp-1 italic">“${dish.notes}”</p>` : ''}
          </div>
        </div>
        <div class="card-action-btn p-2.5 pt-0 border-t border-stone-50 flex gap-1.5">
          <button onclick="quickAddToToday('${dish.id}', 'lunch')" class="flex-1 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-xl text-[11px] font-bold text-center transition-colors">
            + 午餐
          </button>
          <button onclick="quickAddToToday('${dish.id}', 'dinner')" class="flex-1 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-[11px] font-bold text-center transition-colors">
            + 晚餐
          </button>
        </div>
      </div>
    `;
  }).join('');

  if (window.lucide) {
    lucide.createIcons();
  }
}

function quickAddToToday(dishId, mealType) {
  const dateStr = appState.selectedDateStr;
  if (!appState.mealPlans[dateStr]) {
    appState.mealPlans[dateStr] = { lunch: [], dinner: [] };
  }
  if (!appState.mealPlans[dateStr][mealType]) {
    appState.mealPlans[dateStr][mealType] = [];
  }
  appState.mealPlans[dateStr][mealType].push(dishId);
  saveToStorage();
  renderCurrentDayMeals();
  renderWeekSelector();

  const dish = appState.dishes.find(d => d.id === dishId);
  showToast(`已将【${dish ? dish.name : '菜品'}】加入排餐！`);
}

// --- 拍照 / 本地相册选图与压缩上传 ---
function triggerCameraInput() {
  const input = document.getElementById('camera-file-input');
  if (input) input.click();
}

function triggerLocalFileInput() {
  const input = document.getElementById('local-file-input');
  if (input) input.click();
}

function handlePhotoUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const rawDataUrl = e.target.result;
    // 压缩图片至最大宽 800px，确保本地存储超快不卡顿
    compressImage(rawDataUrl, 800, 0.75, (compressedBase64) => {
      appState.tempUploadImage = compressedBase64;
      const previewImg = document.getElementById('photo-preview-img');
      const placeholder = document.getElementById('upload-placeholder');
      const reGroup = document.getElementById('re-upload-group');

      if (previewImg) {
        previewImg.src = compressedBase64;
        previewImg.classList.remove('hidden');
      }
      if (placeholder) placeholder.classList.add('hidden');
      if (reGroup) reGroup.classList.remove('hidden');
      showToast('照片已成功上传并高清优化！');
    });
  };
  reader.readAsDataURL(file);
}

function compressImage(base64Src, maxWidth, quality, callback) {
  const img = new Image();
  img.src = base64Src;
  img.onload = function() {
    let width = img.width;
    let height = img.height;

    if (width > maxWidth) {
      height = Math.round((height * maxWidth) / width);
      width = maxWidth;
    }

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, width, height);

    const compressed = canvas.toDataURL('image/jpeg', quality);
    callback(compressed);
  };
}

function appendTag(tagText) {
  const input = document.getElementById('new-dish-tags');
  if (!input) return;
  const current = input.value.trim();
  const tags = current ? current.split(/[,，\s]+/) : [];
  if (!tags.includes(tagText)) {
    tags.push(tagText);
    input.value = tags.join(', ');
  }
}

function renderCategorySelectOptions(selectElementId, selectedValue = '') {
  const select = document.getElementById(selectElementId);
  if (!select) return;

  select.innerHTML = appState.categories.map(cat => {
    const isSelected = cat === selectedValue ? 'selected' : '';
    return `<option value="${cat}" ${isSelected}>${cat}</option>`;
  }).join('');
}

function saveNewDish() {
  const nameInput = document.getElementById('new-dish-name');
  const catSelect = document.getElementById('new-dish-category');
  const tagsInput = document.getElementById('new-dish-tags');
  const notesInput = document.getElementById('new-dish-notes');

  const name = (nameInput.value || '').trim();
  if (!name) {
    showToast('请填写菜品名称哦~');
    nameInput.focus();
    return;
  }

  // 如果没有拍照，使用精美的默认美食图片占位
  const photo = appState.tempUploadImage || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80';
  const category = catSelect.value || appState.categories[0];
  const tags = (tagsInput.value || '')
    .split(/[,，\s]+/)
    .map(t => t.trim())
    .filter(Boolean);
  const notes = (notesInput.value || '').trim();

  const newDish = {
    id: 'dish_' + Date.now(),
    name,
    category,
    tags: tags.length > 0 ? tags : ['大厨拿手'],
    notes,
    image: photo,
    createdAt: Date.now()
  };

  appState.dishes.unshift(newDish);
  saveToStorage();

  // 重置表单
  nameInput.value = '';
  tagsInput.value = '';
  notesInput.value = '';
  appState.tempUploadImage = '';
  const previewImg = document.getElementById('photo-preview-img');
  const placeholder = document.getElementById('upload-placeholder');
  const reGroup = document.getElementById('re-upload-group');
  const camInput = document.getElementById('camera-file-input');
  const localInput = document.getElementById('local-file-input');

  if (previewImg) previewImg.classList.add('hidden');
  if (placeholder) placeholder.classList.remove('hidden');
  if (reGroup) reGroup.classList.add('hidden');
  if (camInput) camInput.value = '';
  if (localInput) localInput.value = '';

  showToast(`🎉 成功收录【${name}】到菜谱库！`);
  switchTab('dishes');
}

// --- 管理后台 (Admin) 功能 ---
function updateStats() {
  const dishCount = document.getElementById('stat-total-dishes');
  const catCount = document.getElementById('stat-total-categories');
  const planCount = document.getElementById('stat-week-planned');

  if (dishCount) dishCount.textContent = appState.dishes.length;
  if (catCount) catCount.textContent = appState.categories.length;

  if (planCount) {
    let totalPlanned = 0;
    const weekDays = getWeekDates(appState.weekOffset);
    weekDays.forEach(day => {
      const p = appState.mealPlans[day.dateStr];
      if (p) {
        totalPlanned += (p.lunch ? p.lunch.length : 0);
        totalPlanned += (p.dinner ? p.dinner.length : 0);
      }
    });
    planCount.textContent = totalPlanned;
  }
}

function renderAdminCategories() {
  const container = document.getElementById('admin-categories-tags');
  if (!container) return;

  container.innerHTML = appState.categories.map(cat => {
    return `
      <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-stone-200 rounded-xl text-xs font-bold text-stone-700 shadow-sm">
        ${cat}
        <button onclick="deleteCategory('${cat}')" class="text-stone-400 hover:text-rose-500 transition-colors">
          <i data-lucide="x" class="w-3 h-3"></i>
        </button>
      </span>
    `;
  }).join('');

  if (window.lucide) {
    lucide.createIcons();
  }
}

function addCustomCategory() {
  const input = document.getElementById('new-category-input');
  const cat = (input.value || '').trim();
  if (!cat) return;

  if (!appState.categories.includes(cat)) {
    appState.categories.push(cat);
    saveToStorage();
    renderAdminCategories();
    renderCategoryFilterBar();
    showToast(`已添加分类【${cat}】`);
  }
  input.value = '';
}

function deleteCategory(cat) {
  if (appState.categories.length <= 1) {
    showToast('至少保留一个分类哦！');
    return;
  }
  if (confirm(`确定要删除分类【${cat}】吗？现有属于该分类的菜品不会丢失。`)) {
    appState.categories = appState.categories.filter(c => c !== cat);
    saveToStorage();
    renderAdminCategories();
    renderCategoryFilterBar();
    showToast(`已删除分类【${cat}】`);
  }
}

function renderAdminTable() {
  const tbody = document.getElementById('admin-dishes-tbody');
  if (!tbody) return;

  if (appState.dishes.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="py-6 text-center text-stone-400 text-xs">暂无任何菜品</td></tr>`;
    return;
  }

  tbody.innerHTML = appState.dishes.map(dish => {
    return `
      <tr class="hover:bg-stone-50/70 transition-colors">
        <td class="py-2.5 px-3">
          <img src="${dish.image}" alt="${dish.name}" class="w-10 h-10 rounded-lg object-cover bg-stone-100 shadow-sm">
        </td>
        <td class="py-2.5 px-3 font-bold text-stone-900 text-xs">${dish.name}</td>
        <td class="py-2.5 px-3 text-xs text-stone-600">
          <span class="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 font-semibold">${dish.category}</span>
        </td>
        <td class="py-2.5 px-3 text-xs text-stone-400 truncate max-w-[140px]">${(dish.tags || []).join(', ')}</td>
        <td class="py-2.5 px-3 text-right space-x-1">
          <button onclick="openEditDishModal('${dish.id}')" class="px-2.5 py-1 text-xs font-bold text-brand-600 hover:bg-brand-50 rounded-lg transition-colors">修改</button>
          <button onclick="deleteDishConfirm('${dish.id}')" class="px-2.5 py-1 text-xs font-bold text-rose-500 hover:bg-rose-50 rounded-lg transition-colors">删除</button>
        </td>
      </tr>
    `;
  }).join('');
}

// --- 菜品编辑与删除 ---
let tempEditPhoto = '';

function openEditDishModal(dishId) {
  const dish = appState.dishes.find(d => d.id === dishId);
  if (!dish) return;

  tempEditPhoto = '';
  document.getElementById('edit-dish-id').value = dish.id;
  document.getElementById('edit-dish-name').value = dish.name;
  document.getElementById('edit-dish-tags').value = (dish.tags || []).join(', ');

  renderCategorySelectOptions('edit-dish-category', dish.category);

  const modal = document.getElementById('edit-dish-modal');
  if (modal) modal.classList.remove('hidden');
}

function closeEditDishModal() {
  const modal = document.getElementById('edit-dish-modal');
  if (modal) modal.classList.add('hidden');
}

function handleEditPhotoUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    compressImage(e.target.result, 800, 0.75, (base64) => {
      tempEditPhoto = base64;
    });
  };
  reader.readAsDataURL(file);
}

function submitEditDish() {
  const id = document.getElementById('edit-dish-id').value;
  const name = document.getElementById('edit-dish-name').value.trim();
  const category = document.getElementById('edit-dish-category').value;
  const tags = document.getElementById('edit-dish-tags').value.split(/[,，\s]+/).filter(Boolean);

  if (!name) {
    showToast('菜名不能为空！');
    return;
  }

  const dish = appState.dishes.find(d => d.id === id);
  if (dish) {
    dish.name = name;
    dish.category = category;
    dish.tags = tags;
    if (tempEditPhoto) {
      dish.image = tempEditPhoto;
    }
    saveToStorage();
    renderAdminTable();
    renderDishesGrid();
    renderCurrentDayMeals();
    closeEditDishModal();
    showToast('菜品信息修改成功！');
  }
}

function deleteDishConfirm(dishId) {
  const dish = appState.dishes.find(d => d.id === dishId);
  if (!dish) return;

  if (confirm(`确定要从菜谱中删除【${dish.name}】吗？`)) {
    appState.dishes = appState.dishes.filter(d => d.id !== dishId);
    // 从排餐计划中也清洗掉
    Object.keys(appState.mealPlans).forEach(dateStr => {
      const p = appState.mealPlans[dateStr];
      if (p.lunch) p.lunch = p.lunch.filter(id => id !== dishId);
      if (p.dinner) p.dinner = p.dinner.filter(id => id !== dishId);
    });

    saveToStorage();
    renderAdminTable();
    renderDishesGrid();
    renderCurrentDayMeals();
    showToast(`已删除【${dish.name}】`);
  }
}

// --- 数据备份与还原 ---
function exportDataBackup() {
  const exportData = {
    appName: '吃什么 - 家庭点菜系统备份',
    version: '1.0',
    exportTime: new Date().toISOString(),
    categories: appState.categories,
    dishes: appState.dishes,
    mealPlans: appState.mealPlans
  };

  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `吃什么-家庭菜谱备份-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('备份文件已导出成功！');
}

function importDataBackup(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);
      if (data.dishes && Array.isArray(data.dishes)) {
        appState.dishes = data.dishes;
        if (data.categories) appState.categories = data.categories;
        if (data.mealPlans) appState.mealPlans = data.mealPlans;

        saveToStorage();
        initApp();
        showToast('数据恢复成功！');
      } else {
        alert('文件格式不正确，未能解析菜谱数据！');
      }
    } catch (err) {
      alert('读取备份文件失败，请检查文件是否完整！');
    }
  };
  reader.readAsText(file);
}

function resetDefaultDishesConfirm() {
  if (confirm('确定要恢复为内置的 22 道精选家常菜谱吗？现有自定义菜谱将被重置。')) {
    appState.dishes = DEFAULT_DISHES;
    appState.categories = DEFAULT_CATEGORIES;
    saveToStorage();
    initApp();
    showToast('已重置为大厨 22 道精选家常菜谱！');
  }
}

// --- 一键分享点菜清单给大厨 (微信点菜) ---
function shareMealPlanToChef() {
  const dateStr = appState.selectedDateStr;
  const currentPlan = appState.mealPlans[dateStr] || { lunch: [], dinner: [] };

  const getDishNames = (ids) => {
    if (!ids || ids.length === 0) return '尚未点菜（等大厨发挥~）';
    const names = ids.map(id => {
      const d = appState.dishes.find(item => item.id === id);
      return d ? d.name : '';
    }).filter(Boolean);
    return names.length > 0 ? names.join('、') : '尚未点菜（等大厨发挥~）';
  };

  const lunchDishes = getDishNames(currentPlan.lunch);
  const dinnerDishes = getDishNames(currentPlan.dinner);

  // 计算星期几
  const dateObj = new Date(dateStr + 'T00:00:00');
  const daysOfWeek = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  const dayName = daysOfWeek[dateObj.getDay()];
  const formattedDate = `${dateObj.getMonth() + 1}月${dateObj.getDate()}日 (${dayName})`;

  const rawLunchNames = (currentPlan.lunch || []).map(id => {
    const d = appState.dishes.find(item => item.id === id);
    return d ? d.name : '';
  }).filter(Boolean).join(',');

  const rawDinnerNames = (currentPlan.dinner || []).map(id => {
    const d = appState.dishes.find(item => item.id === id);
    return d ? d.name : '';
  }).filter(Boolean).join(',');

  const shareText = `🍽️ 【${formattedDate} 点菜清单来啦！】\n☀️ 午餐：${lunchDishes}\n🌙 晚餐：${dinnerDishes}\n\n👨‍🍳 大厨请批阅，准备好大展身手啦~ ❤️\n#吃什么:${dateStr}|${rawLunchNames}|${rawDinnerNames}#`;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(shareText).then(() => {
      showToast('📋 已复制点菜清单！快去微信发给大厨吧~');
    }).catch(() => {
      copyShareFallback(shareText);
    });
  } else {
    copyShareFallback(shareText);
  }
}

function copyShareFallback(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
    showToast('📋 已复制点菜清单！快去微信发给大厨吧~');
  } catch (err) {
    prompt('请长按下方文字复制点菜清单发给微信大厨：', text);
  }
  document.body.removeChild(textarea);
}

// --- 微信点菜清单导入功能 ---
function openImportModal() {
  const modal = document.getElementById('import-dish-modal');
  if (modal) {
    modal.classList.remove('hidden');
    const input = document.getElementById('import-text-input');
    if (input) input.value = '';
    if (window.lucide) lucide.createIcons();
  }
}

function closeImportModal() {
  const modal = document.getElementById('import-dish-modal');
  if (modal) modal.classList.add('hidden');
}

async function readFromClipboard() {
  try {
    if (navigator.clipboard && navigator.clipboard.readText) {
      const text = await navigator.clipboard.readText();
      const input = document.getElementById('import-text-input');
      if (input && text) {
        input.value = text;
        showToast('已从剪贴板读取内容！');
      }
    } else {
      showToast('浏览器权限限制，请直接长按输入框粘贴');
    }
  } catch (e) {
    showToast('未能读取剪贴板，请长按输入框直接粘贴');
  }
}

function findOrCreateDish(name) {
  if (!name) return null;
  const clean = name.trim();
  if (!clean) return null;
  let found = appState.dishes.find(d => d.name === clean);
  if (!found) {
    found = appState.dishes.find(d => d.name.includes(clean) || clean.includes(d.name));
  }
  if (found) return found.id;

  const newId = 'dish_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);
  const newDish = {
    id: newId,
    name: clean,
    category: '家常荤菜',
    tags: ['女友钦点'],
    notes: '女友微信点餐录入',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    createdAt: Date.now()
  };
  appState.dishes.unshift(newDish);
  return newId;
}

function doImportMealPlan() {
  const input = document.getElementById('import-text-input');
  const text = input ? input.value.trim() : '';
  if (!text) {
    alert('请先粘贴微信点菜内容！');
    return;
  }

  let targetDate = appState.selectedDateStr;
  let lunchDishNames = [];
  let dinnerDishNames = [];

  // 1. 尝试匹配特征口令：#吃什么:YYYY-MM-DD|菜1,菜2|菜3,菜4#
  const matchCode = text.match(/#吃什么:(.*?)\|?(.*?)\|(.*?)#/);
  if (matchCode) {
    if (matchCode[1] && /^\d{4}-\d{2}-\d{2}$/.test(matchCode[1].trim())) {
      targetDate = matchCode[1].trim();
    }
    if (matchCode[2]) {
      lunchDishNames = matchCode[2].split(',').map(s => s.trim()).filter(Boolean);
    }
    if (matchCode[3]) {
      dinnerDishNames = matchCode[3].split(',').map(s => s.trim()).filter(Boolean);
    }
  } else {
    // 2. 尝试从自然微信文字提取
    const dateMatch = text.match(/(\d{4}-\d{2}-\d{2})/);
    if (dateMatch) {
      targetDate = dateMatch[1];
    } else {
      const cnDateMatch = text.match(/(\d{1,2})月(\d{1,2})日/);
      if (cnDateMatch) {
        const year = new Date().getFullYear();
        const m = String(cnDateMatch[1]).padStart(2, '0');
        const d = String(cnDateMatch[2]).padStart(2, '0');
        targetDate = `${year}-${m}-${d}`;
      }
    }

    const lunchMatch = text.match(/午餐[：:]([^\n\r#]+)/);
    if (lunchMatch) {
      lunchDishNames = lunchMatch[1].split(/[、,，\s+]+/).map(s => s.trim()).filter(s => s && s !== '尚未点菜（等大厨发挥~）');
    }

    const dinnerMatch = text.match(/晚餐[：:]([^\n\r#]+)/);
    if (dinnerMatch) {
      dinnerDishNames = dinnerMatch[1].split(/[、,，\s+]+/).map(s => s.trim()).filter(s => s && s !== '尚未点菜（等大厨发挥~）');
    }
  }

  if (lunchDishNames.length === 0 && dinnerDishNames.length === 0) {
    alert('未能识别到有效的午餐或晚餐菜品，请确认文字内容是否包含“午餐：...”或“晚餐：...”！');
    return;
  }

  const lunchIds = lunchDishNames.map(name => findOrCreateDish(name)).filter(Boolean);
  const dinnerIds = dinnerDishNames.map(name => findOrCreateDish(name)).filter(Boolean);

  if (!appState.mealPlans[targetDate]) {
    appState.mealPlans[targetDate] = { lunch: [], dinner: [] };
  }
  appState.mealPlans[targetDate].lunch = lunchIds;
  appState.mealPlans[targetDate].dinner = dinnerIds;

  saveToStorage();

  appState.selectedDateStr = targetDate;
  closeImportModal();
  initCalendarDates();
  renderWeekSelector();
  renderCurrentDayMeals();
  renderAdminTable();
  updateStats();

  showToast('🎉 女友点菜已成功排入日历！大厨开始准备大餐吧~');
}

// --- 轻量 Toast 提示系统 ---
let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById('toast');
  const msgEl = document.getElementById('toast-message');
  if (!toast || !msgEl) return;

  msgEl.textContent = message;
  toast.classList.add('toast-show');

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('toast-show');
  }, 2300);
}

// 页面加载完成后启动应用
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

