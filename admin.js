/**
 * 《吃什么》 - 大厨专属独立后台管理工作台
 * 核心逻辑与手机模拟器联动中枢
 */

// 预置默认数据常量
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

const DEFAULT_UI_SETTINGS = {
  density: 'comfortable', // 'comfortable' (宽松舒适) | 'compact' (紧凑)
  dishLayout: 'single-col', // 'single-col' (单列大图) | 'double-col' (双列)
  theme: 'orange', // 'orange' | 'green' | 'pink' | 'stone'
  radius: 'large', // 'large' (24px) | 'medium' (16px) | 'small' (10px)
  fontSize: 'standard' // 'standard' | 'large'
};

let adminState = {
  activeTab: 'ui',
  uiSettings: { ...DEFAULT_UI_SETTINGS },
  dishes: [],
  categories: [],
  mealPlans: {},
  tempUploadImage: ''
};

// --- 初始化 ---
document.addEventListener('DOMContentLoaded', () => {
  initAdmin();
});

function initAdmin() {
  loadAdminStorage();
  loadAdminUiSettings();
  renderAdminDishesTable();
  renderAdminCategoriesBadge();
  populateCategorySelects();
  updateAdminStats();

  if (window.lucide) {
    lucide.createIcons();
  }
}

// --- 存储读取 ---
function loadAdminStorage() {
  try {
    const savedDishes = localStorage.getItem('wt_dishes');
    adminState.dishes = savedDishes ? JSON.parse(savedDishes) : DEFAULT_DISHES;

    const savedCats = localStorage.getItem('wt_categories');
    adminState.categories = savedCats ? JSON.parse(savedCats) : DEFAULT_CATEGORIES;

    const savedPlans = localStorage.getItem('wt_meal_plans');
    adminState.mealPlans = savedPlans ? JSON.parse(savedPlans) : {};
  } catch (e) {
    console.error('加载本地存储失败', e);
    adminState.dishes = DEFAULT_DISHES;
    adminState.categories = DEFAULT_CATEGORIES;
  }
}

function saveAdminStorage() {
  try {
    localStorage.setItem('wt_dishes', JSON.stringify(adminState.dishes));
    localStorage.setItem('wt_categories', JSON.stringify(adminState.categories));
    localStorage.setItem('wt_meal_plans', JSON.stringify(adminState.mealPlans));
    notifyPhonePreview({ type: 'WT_RELOAD_DATA' });
    updateAdminStats();
  } catch (e) {
    console.warn('存储超限警告', e);
    showAdminToast('存储提示：数据较多，建议定期备份！');
  }
}

// --- 后台选项卡切换 ---
function switchAdminTab(tabName) {
  adminState.activeTab = tabName;
  ['ui', 'dishes', 'categories', 'stats'].forEach(t => {
    const panel = document.getElementById(`panel-${t}`);
    const btn = document.getElementById(`btn-tab-${t}`);
    if (panel) panel.classList.toggle('hidden', t !== tabName);
    if (btn) btn.classList.toggle('active', t === tabName);
  });

  if (tabName === 'dishes') {
    renderAdminDishesTable();
    populateCategorySelects();
  } else if (tabName === 'categories') {
    renderAdminCategoriesBadge();
  } else if (tabName === 'stats') {
    updateAdminStats();
  }

  if (window.lucide) {
    lucide.createIcons();
  }
}

// --- 🎨 手机 UI 视觉调优引擎 ---
function loadAdminUiSettings() {
  try {
    const saved = localStorage.getItem('wt_ui_settings');
    adminState.uiSettings = saved ? { ...DEFAULT_UI_SETTINGS, ...JSON.parse(saved) } : { ...DEFAULT_UI_SETTINGS };
  } catch (e) {
    adminState.uiSettings = { ...DEFAULT_UI_SETTINGS };
  }

  // 同步到表单控件
  syncUiControlsToState();
  // 预览一次
  previewUiChange();
}

function syncUiControlsToState() {
  const s = adminState.uiSettings;

  // 密度单选
  document.querySelectorAll('input[name="ui-density"]').forEach(radio => {
    radio.checked = (radio.value === s.density);
  });
  updateOptionCards('ui-option-density', s.density);

  // 布局单选
  document.querySelectorAll('input[name="ui-layout"]').forEach(radio => {
    radio.checked = (radio.value === s.dishLayout);
  });
  updateOptionCards('ui-option-layout', s.dishLayout);

  // 主题按钮
  document.querySelectorAll('.theme-btn').forEach(btn => {
    const isAct = btn.dataset.theme === s.theme;
    btn.classList.toggle('border-brand-500', isAct);
    btn.classList.toggle('bg-brand-50/50', isAct);
    btn.classList.toggle('border-slate-200', !isAct);
  });

  // 圆角下拉
  const radiusSel = document.getElementById('select-radius');
  if (radiusSel) radiusSel.value = s.radius;

  // 字号下拉
  const fontSel = document.getElementById('select-font-size');
  if (fontSel) fontSel.value = s.fontSize;
}

function updateOptionCards(className, currentValue) {
  document.querySelectorAll(`.${className}`).forEach(card => {
    const isChecked = card.dataset.value === currentValue;
    card.classList.toggle('border-brand-500', isChecked);
    card.classList.toggle('bg-brand-50/40', isChecked);
    card.classList.toggle('border-slate-200', !isChecked);

    const dot = card.querySelector('span:last-child');
    if (dot) {
      dot.className = isChecked 
        ? 'w-4 h-4 rounded-full bg-brand-500 border-2 border-white shadow-sm flex items-center justify-center'
        : 'w-4 h-4 rounded-full border border-slate-300';
    }
  });
}

function previewUiChange() {
  // 从界面收集当前配置
  const densityRadio = document.querySelector('input[name="ui-density"]:checked');
  const layoutRadio = document.querySelector('input[name="ui-layout"]:checked');
  const radiusSel = document.getElementById('select-radius');
  const fontSel = document.getElementById('select-font-size');

  if (densityRadio) adminState.uiSettings.density = densityRadio.value;
  if (layoutRadio) adminState.uiSettings.dishLayout = layoutRadio.value;
  if (radiusSel) adminState.uiSettings.radius = radiusSel.value;
  if (fontSel) adminState.uiSettings.fontSize = fontSel.value;

  updateOptionCards('ui-option-density', adminState.uiSettings.density);
  updateOptionCards('ui-option-layout', adminState.uiSettings.dishLayout);

  // 向右侧手机 iframe 发送更新指令，毫秒级即时响应！
  notifyPhonePreview({
    type: 'WT_UPDATE_UI',
    settings: adminState.uiSettings
  });
}

function setTheme(themeName) {
  adminState.uiSettings.theme = themeName;
  document.querySelectorAll('.theme-btn').forEach(btn => {
    const isAct = btn.dataset.theme === themeName;
    btn.classList.toggle('border-brand-500', isAct);
    btn.classList.toggle('bg-brand-50/50', isAct);
    btn.classList.toggle('border-slate-200', !isAct);
  });
  previewUiChange();
}

function saveUiSettings() {
  previewUiChange();
  try {
    localStorage.setItem('wt_ui_settings', JSON.stringify(adminState.uiSettings));
    notifyPhonePreview({
      type: 'WT_UPDATE_UI',
      settings: adminState.uiSettings
    });
    showAdminToast('✨ 手机 UI 视觉设定已成功保存并实时生效！');
  } catch (e) {
    alert('保存设置失败');
  }
}

function resetDefaultUi() {
  adminState.uiSettings = { ...DEFAULT_UI_SETTINGS };
  syncUiControlsToState();
  saveUiSettings();
  showAdminToast('已恢复为官方推荐的舒适宽敞 UI 风格！');
}

// --- 📱 与右侧真机预览窗口实时双向通讯 ---
function notifyPhonePreview(data) {
  const iframe = document.getElementById('preview-frame');
  if (iframe && iframe.contentWindow) {
    iframe.contentWindow.postMessage(data, '*');
  }
}

function reloadPreview() {
  const iframe = document.getElementById('preview-frame');
  if (iframe) {
    iframe.src = 'index.html?t=' + Date.now();
    showAdminToast('手机预览视窗已刷新');
  }
}

function changeDeviceSize(val) {
  const [w, h] = val.split(',').map(Number);
  const container = document.getElementById('phone-container');
  if (container) {
    container.style.width = `${w}px`;
    container.style.height = `${h}px`;
  }
}

// --- 🍲 菜谱管理逻辑 ---
function renderAdminDishesTable(filteredList = null) {
  const tbody = document.getElementById('admin-dishes-table-body');
  if (!tbody) return;

  const list = filteredList !== null ? filteredList : adminState.dishes;

  const countBadge = document.getElementById('tab-dish-count');
  if (countBadge) countBadge.textContent = adminState.dishes.length;

  if (list.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="py-12 text-center text-slate-400">
          <i data-lucide="inbox" class="w-8 h-8 mx-auto text-slate-300 mb-1.5 stroke-1"></i>
          <p class="text-xs font-bold text-slate-500">没有找到匹配的菜品</p>
        </td>
      </tr>
    `;
    if (window.lucide) lucide.createIcons();
    return;
  }

  tbody.innerHTML = list.map(dish => {
    return `
      <tr class="hover:bg-slate-50/80 transition-colors">
        <td class="py-2.5 px-3">
          <img src="${dish.image}" alt="${dish.name}" class="w-11 h-11 rounded-xl object-cover border border-slate-200 shadow-xs">
        </td>
        <td class="py-2.5 px-3">
          <p class="font-black text-slate-900 text-xs">${dish.name}</p>
          <p class="text-[10px] text-slate-400">ID: ${dish.id}</p>
        </td>
        <td class="py-2.5 px-3">
          <span class="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold">${dish.category}</span>
        </td>
        <td class="py-2.5 px-3">
          <div class="flex flex-wrap gap-1 max-w-[180px]">
            ${(dish.tags || []).map(t => `<span class="text-[9px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-700">${t}</span>`).join('')}
          </div>
        </td>
        <td class="py-2.5 px-3 max-w-[160px]">
          <p class="text-[10px] text-slate-500 truncate" title="${dish.notes || ''}">
            ${dish.notes ? `“${dish.notes}”` : '<span class="text-slate-300">暂无备忘</span>'}
          </p>
        </td>
        <td class="py-2.5 px-3 text-right">
          <div class="flex items-center justify-end gap-1.5">
            <button onclick="openEditDishModal('${dish.id}')" class="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-bold transition-all">
              编辑
            </button>
            <button onclick="deleteDishConfirm('${dish.id}')" class="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg text-[11px] font-bold transition-all">
              删除
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  if (window.lucide) {
    lucide.createIcons();
  }
}

function filterAdminDishes() {
  const keyword = (document.getElementById('admin-search-input')?.value || '').trim().toLowerCase();
  const cat = document.getElementById('admin-category-filter')?.value || '全部';

  const filtered = adminState.dishes.filter(d => {
    const matchCat = (cat === '全部') || (d.category === cat);
    const matchKey = !keyword || 
      d.name.toLowerCase().includes(keyword) ||
      d.category.toLowerCase().includes(keyword) ||
      (d.tags || []).some(t => t.toLowerCase().includes(keyword));
    return matchCat && matchKey;
  });

  renderAdminDishesTable(filtered);
}

function populateCategorySelects() {
  const adminFilter = document.getElementById('admin-category-filter');
  const modalSelect = document.getElementById('modal-dish-category');

  if (adminFilter) {
    const currentVal = adminFilter.value || '全部';
    adminFilter.innerHTML = '<option value="全部">全部分类</option>' + 
      adminState.categories.map(c => `<option value="${c}">${c}</option>`).join('');
    adminFilter.value = currentVal;
  }

  if (modalSelect) {
    modalSelect.innerHTML = adminState.categories.map(c => `<option value="${c}">${c}</option>`).join('');
  }
}

// --- 菜品编辑与新增弹窗 ---
function openEditDishModal(dishId) {
  const dish = adminState.dishes.find(d => d.id === dishId);
  if (!dish) return;

  document.getElementById('modal-title').textContent = `编辑菜品：${dish.name}`;
  document.getElementById('modal-dish-id').value = dish.id;
  document.getElementById('modal-dish-name').value = dish.name;
  document.getElementById('modal-dish-tags').value = (dish.tags || []).join(' ');
  document.getElementById('modal-dish-notes').value = dish.notes || '';
  document.getElementById('modal-dish-img-preview').src = dish.image;
  adminState.tempUploadImage = dish.image;

  populateCategorySelects();
  document.getElementById('modal-dish-category').value = dish.category;

  document.getElementById('edit-dish-modal').classList.remove('hidden');
}

function openAddNewDishModal() {
  document.getElementById('modal-title').textContent = '录入新菜品';
  document.getElementById('modal-dish-id').value = '';
  document.getElementById('modal-dish-name').value = '';
  document.getElementById('modal-dish-tags').value = '';
  document.getElementById('modal-dish-notes').value = '';
  document.getElementById('modal-dish-img-preview').src = 'dishes/dish_01.jpg';
  adminState.tempUploadImage = 'dishes/dish_01.jpg';

  populateCategorySelects();
  document.getElementById('edit-dish-modal').classList.remove('hidden');
}

function closeEditModal() {
  document.getElementById('edit-dish-modal').classList.add('hidden');
}

function handleModalPhotoUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(evt) {
    const img = new Image();
    img.onload = function() {
      const maxDim = 1080;
      let w = img.width, h = img.height;
      if (w > maxDim || h > maxDim) {
        if (w > h) { h = Math.round((h * maxDim) / w); w = maxDim; }
        else { w = Math.round((w * maxDim) / h); h = maxDim; }
      }
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, w, h);
      const compressed = canvas.toDataURL('image/jpeg', 0.85);

      adminState.tempUploadImage = compressed;
      document.getElementById('modal-dish-img-preview').src = compressed;
    };
    img.src = evt.target.result;
  };
  reader.readAsText ? reader.readAsDataURL(file) : null;
}

function submitModalDish() {
  const id = document.getElementById('modal-dish-id').value.trim();
  const name = document.getElementById('modal-dish-name').value.trim();
  const category = document.getElementById('modal-dish-category').value;
  const tagsStr = document.getElementById('modal-dish-tags').value.trim();
  const notes = document.getElementById('modal-dish-notes').value.trim();

  if (!name) {
    alert('请输入菜品名称！');
    return;
  }

  const tags = tagsStr ? tagsStr.split(/[\s,，]+/).filter(Boolean) : [];

  if (id) {
    // 编辑现有菜品
    const idx = adminState.dishes.findIndex(d => d.id === id);
    if (idx !== -1) {
      adminState.dishes[idx] = {
        ...adminState.dishes[idx],
        name,
        category,
        tags,
        notes,
        image: adminState.tempUploadImage || adminState.dishes[idx].image
      };
      showAdminToast(`已成功保存【${name}】！`);
    }
  } else {
    // 新增菜品
    const newId = 'dish_custom_' + Date.now();
    const newDish = {
      id: newId,
      name,
      category,
      tags,
      notes,
      image: adminState.tempUploadImage || 'dishes/dish_01.jpg',
      createdAt: Date.now()
    };
    adminState.dishes.unshift(newDish);
    showAdminToast(`已成功录入新菜品【${name}】！`);
  }

  saveAdminStorage();
  closeEditModal();
  renderAdminDishesTable();
}

function deleteDishConfirm(dishId) {
  const dish = adminState.dishes.find(d => d.id === dishId);
  if (!dish) return;

  if (confirm(`确定要从菜谱库中移除【${dish.name}】吗？`)) {
    adminState.dishes = adminState.dishes.filter(d => d.id !== dishId);
    saveAdminStorage();
    renderAdminDishesTable();
    showAdminToast(`已删除【${dish.name}】`);
  }
}

// --- 🏷️ 分类管理 ---
function renderAdminCategoriesBadge() {
  const container = document.getElementById('categories-badge-list');
  if (!container) return;

  container.innerHTML = adminState.categories.map(cat => {
    const count = adminState.dishes.filter(d => d.category === cat).length;
    return `
      <div class="px-3 py-1.5 bg-white border border-slate-200 rounded-xl flex items-center gap-2 shadow-xs">
        <span class="text-xs font-bold text-slate-800">${cat}</span>
        <span class="text-[10px] px-1.5 py-0.2 bg-slate-100 text-slate-500 rounded font-semibold">${count}道菜</span>
        <button onclick="deleteCategoryConfirm('${cat}')" class="text-slate-400 hover:text-rose-500 ml-1 text-xs">✕</button>
      </div>
    `;
  }).join('');
}

function addNewCategory() {
  const input = document.getElementById('new-category-name');
  const val = (input ? input.value : '').trim();
  if (!val) return;

  if (adminState.categories.includes(val)) {
    alert('该分类已存在！');
    return;
  }

  adminState.categories.push(val);
  input.value = '';
  saveAdminStorage();
  renderAdminCategoriesBadge();
  populateCategorySelects();
  showAdminToast(`已成功添加分类【${val}】！`);
}

function deleteCategoryConfirm(catName) {
  if (adminState.categories.length <= 1) {
    alert('至少需要保留一个分类！');
    return;
  }
  if (confirm(`确定要删除分类【${catName}】吗？`)) {
    adminState.categories = adminState.categories.filter(c => c !== catName);
    saveAdminStorage();
    renderAdminCategoriesBadge();
    populateCategorySelects();
    showAdminToast(`已删除分类【${catName}】`);
  }
}

// --- 统计面板 ---
function updateAdminStats() {
  const statDishes = document.getElementById('stat-dishes');
  const statCats = document.getElementById('stat-cats');
  const statPlanned = document.getElementById('stat-planned');

  if (statDishes) statDishes.textContent = adminState.dishes.length;
  if (statCats) statCats.textContent = adminState.categories.length;

  let totalMeals = 0;
  Object.values(adminState.mealPlans).forEach(day => {
    if (day.lunch) totalMeals += day.lunch.length;
    if (day.dinner) totalMeals += day.dinner.length;
  });
  if (statPlanned) statPlanned.textContent = totalMeals;
}

// --- 备份导出与数据恢复 ---
function exportDataBackup() {
  const backup = {
    version: '2026_09_23_v22',
    exportTime: new Date().toISOString(),
    uiSettings: adminState.uiSettings,
    categories: adminState.categories,
    dishes: adminState.dishes,
    mealPlans: adminState.mealPlans
  };

  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `吃什么_菜谱与配置备份_${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showAdminToast('备份文件已下载！');
}

function importDataBackup(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);
      if (data.dishes && Array.isArray(data.dishes)) {
        adminState.dishes = data.dishes;
        if (data.categories) adminState.categories = data.categories;
        if (data.mealPlans) adminState.mealPlans = data.mealPlans;
        if (data.uiSettings) adminState.uiSettings = data.uiSettings;

        saveAdminStorage();
        if (data.uiSettings) {
          localStorage.setItem('wt_ui_settings', JSON.stringify(data.uiSettings));
          syncUiControlsToState();
        }
        renderAdminDishesTable();
        renderAdminCategoriesBadge();
        populateCategorySelects();
        reloadPreview();
        showAdminToast('数据恢复成功！');
      } else {
        alert('文件内容格式不正确！');
      }
    } catch (err) {
      alert('无法解析备份文件！');
    }
  };
  reader.readAsText(file);
}

function resetDefaultDishesConfirm() {
  if (confirm('确定要将菜谱库重置为您实拍的 22 道标准家常菜吗？')) {
    // 强制触发客户端 loadFromStorage 重新载入内置 22 道菜
    localStorage.removeItem('wt_menu_version');
    localStorage.removeItem('wt_dishes');
    localStorage.removeItem('wt_categories');
    
    // 重新从 index.html 获取内置菜品，或刷新页面
    reloadPreview();
    setTimeout(() => {
      loadAdminStorage();
      renderAdminDishesTable();
      renderAdminCategoriesBadge();
      populateCategorySelects();
      updateAdminStats();
      showAdminToast('已成功重置为大厨 22 道拿手家常菜！');
    }, 500);
  }
}

// --- Toast 提示 ---
function showAdminToast(msg) {
  const toast = document.getElementById('admin-toast');
  const text = document.getElementById('admin-toast-text');
  if (!toast || !text) return;

  text.textContent = msg;
  toast.classList.remove('opacity-0', 'translate-y-[-10px]');
  toast.classList.add('opacity-100', 'translate-y-0');

  setTimeout(() => {
    toast.classList.remove('opacity-100', 'translate-y-0');
    toast.classList.add('opacity-0', 'translate-y-[-10px]');
  }, 2200);
}
