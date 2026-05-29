/* 
  =========================================
  GigaSamobranka Redesign client-side logic
  Fully interactive simulated experience
  =========================================
*/

// --- State Management ---
let appState = {
  activeTab: 'about-section',
  uploadedFiles: [],
  selectedDifficulty: 'easy',
  decks: [
    {
      id: 0,
      emoji: '🦊',
      subject: 'Скучающий человек',
      title: 'Выход из Чудово с лисичкой',
      meta: '8 идей · Умираю от скуки',
      badgeClass: 'badge-lang',
      cards: [
        { q: 'Идея №1: Устроить фотосессию с лисичкой в разных локациях Чудово.', a: '<strong>Как реализовать:</strong> Сделайте безопасную прикормку для лисички. Возьмите хорошую камеру или телефон, выберите живописные места (например, старинный вокзал в Чудово, берег реки Кересть) и сделайте серию атмосферных кадров в стиле National Geographic.' },
        { q: 'Идея №2: Организовать мини-путешествие выходного дня в Великий Новгород.', a: '<strong>Как реализовать:</strong> Купите билет на электричку до Новгорода (всего час езды). Посетите Новгородский Кремль, погуляйте по Ярославову дворищу и вернитесь к вечеру с новыми силами.' },
        { q: 'Идея №3: Начать писать фантастический дневник о приключениях человека и лицы в параллельном Чудово.', a: '<strong>Как реализовать:</strong> Заведите красивый блокнот или Telegram-канал. Каждый день описывайте вымышленные приключения с лисичкой-сестричкой, добавляя элементы магии и местного колорита.' },
        { q: 'Идея №4: Собрать гербарий и сделать арт-коллаж из растений Чудовского района.', a: '<strong>Как реализовать:</strong> Отправьтесь на прогулку в ближайший лесопарк. Соберите листья, цветы и травы, высушите их между страницами книги и соберите стильный постер для интерьера.' },
        { q: 'Идея №5: Провести кулинарный вечер «Чудовские блины для лисички».', a: '<strong>Как реализовать:</strong> Приготовьте русские блины по старинному рецепту. Лисичке блины давать не стоит (им вредно сладкое и жареное), но сделайте красивую сервировку и угостите друзей.' },
        { q: 'Идея №6: Написать и отправить открытки с лисичкой друзьям из Чудовского почтового отделения.', a: '<strong>Как реализовать:</strong> Купите или нарисуйте открытки с изображением лис, зайдите на местную почту, наклейте марки и отправьте их во все уголки страны с теплыми словами.' },
        { q: 'Идея №7: Провести вечер астрономии на окраине Чудово.', a: '<strong>Как реализовать:</strong> Найдите место с минимальной засветкой. Скачайте приложение Star Walk, возьмите плед, термос с чаем и изучайте созвездия.' },
        { q: 'Идея №8: Создать аудиогид по Чудово с точки зрения лисы.', a: '<strong>Как реализовать:</strong> Запишите на диктофон короткие забавные истории о местных достопримечательностях, озвученные от лица лисы. Опубликуйте на платформе izi.TRAVEL.' }
      ]
    },
    {
      id: 1,
      emoji: '🎨',
      subject: 'Художник',
      title: 'Художественные челленджи',
      meta: '6 идей · Творческий кризис',
      badgeClass: 'badge-math',
      cards: [
        { q: 'Рисование одной линией без отрыва руки.', a: '<strong>Как реализовать:</strong> Выберите объект (например, чашку или маскота Самобранку). Поставьте карандаш на бумагу и завершите рисунок, не поднимая грифель. Это развивает чувство формы.' },
        { q: 'Ограниченная палитра из трех цветов.', a: '<strong>Как реализовать:</strong> Случайным образом выберите только 3 маркера или краски. Создайте полноценный рисунок, смешивая только эти цвета для получения теней и полутонов.' },
        { q: 'Нарисовать звук или музыку.', a: '<strong>Как реализовать:</strong> Включите динамичный трек или расслабляющий эмбиент. Закройте глаза, прочувствуйте ритм и передайте его на холсте с помощью абстрактных линий, пятен и текстур.' },
        { q: 'Автопортрет в необычном зеркале или отражении.', a: '<strong>Как реализовать:</strong> Найдите металлическую ложку, елочный шар или мыльный пузырь. Нарисуйте свое искаженное отражение со всеми деталями окружения.' },
        { q: 'Слияние органики и механики (Биомеханика).', a: '<strong>Как реализовать:</strong> Возьмите за основу цветок или животное и интегрируйте в него шестеренки, провода или металлические пластины.' },
        { q: 'Рисование текстурными материалами.', a: '<strong>Как реализовать:</strong> Вместо кисти используйте губку, смятую бумагу, зубную щетку или пальцы. Создайте пейзаж, ориентируясь на необычные отпечатки.' }
      ]
    },
    {
      id: 2,
      emoji: '🎮',
      subject: 'Геймдизайнер',
      title: 'Механики для инди-платформера',
      meta: '6 идей · Ищу вдохновение',
      badgeClass: 'badge-world',
      cards: [
        { q: 'Гравитационный реверс по таймеру.', a: '<strong>Как реализовать:</strong> Каждые 5 секунд гравитация меняет направление на противоположное. Разработайте уровни, где игроку нужно рассчитывать время прыжка, чтобы «упасть» на потолок.' },
        { q: 'Мир двигается только тогда, когда двигается персонаж.', a: '<strong>Как реализовать:</strong> Заимствуйте механику из Superhot. Когда персонаж стоит, враги и платформы замирают. Это превращает экшен-платформер в тактическую головоломку.' },
        { q: 'Прыжки с помощью звуковых волн.', a: '<strong>Как реализовать:</strong> Дайте персонажу мегафон. Звуковая волна отбрасывает его назад (реактивная тяга) и активирует переключатели на расстоянии.' },
        { q: 'Изменение размера персонажа в реальном времени.', a: '<strong>Как реализовать:</strong> Кнопка уменьшения позволяет пролезать в щели, а кнопка увеличения — ломать препятствия и давить врагов под весом.' },
        { q: 'Порталы рисования (как мел на доске).', a: '<strong>Как реализовать:</strong> Игрок может рисовать мелом линии на экране, которые превращаются в физические платформы или порталы для скольжения.' },
        { q: 'Тень героя как отдельный персонаж.', a: '<strong>Как реализовать:</strong> Игрок может записывать свои движения, а затем его «тень» повторяет их, помогая нажимать кнопки в труднодоступных местах.' }
      ]
    },
    {
      id: 3,
      emoji: '🏗️',
      subject: 'Архитектор / Строитель',
      title: 'Умные остановки в Чудово',
      meta: '5 идей · Мозговой штурм',
      badgeClass: 'badge-lit',
      cards: [
        { q: 'Остановка-оранжерея с подогревом от грунтовых вод.', a: '<strong>Как реализовать:</strong> Спроектируйте закрытый павильон со встроенной теплицей. Используйте тепловой насос для обогрева лавочек и поддержания жизни растений зимой.' },
        { q: 'Интерактивная библиотека с маскотом.', a: '<strong>Как реализовать:</strong> Установите полки для буккроссинга и сенсорный экран с виртуальным гидом-лисичкой, которая советует книги и рассказывает истории края.' },
        { q: 'Солнечные навесы в форме листьев деревьев.', a: '<strong>Как реализовать:</strong> Разработайте крышу остановки в виде листьев с гибкими солнечными панелями, питающими USB-порты и вечернее освещение.' },
        { q: 'Модульная конструкция из переработанных материалов.', a: '<strong>Как реализовать:</strong> Используйте каркас из вторичного пластика и дерева. Конструкция собирается как конструктор под любой размер пассажиропотока.' },
        { q: 'Остановка с кинетическим мощением перед ней.', a: '<strong>Как реализовать:</strong> Уложите перед остановкой плиты, генерирующие электричество от шагов пешеходов, обеспечивая автономную работу информационного табло.' }
      ]
    }
  ],
  activeDeck: null,
  activeCardIndex: 0
};

// --- Mascot Motivational Quotes ---
const mascotQuotes = [
  "Творческий кризис? Позволь мне накрыть стол свежими идеями! 💡",
  "Я готова! Расскажи о своем запросе, и карточки с идеями выткутся сами! ✨",
  "Для художников, геймеров, архитекторов... Я найду решение для каждого! 🎨",
  "Креативные карточки помогают структурировать мысли и находить инсайты. 🧠",
  "Когда нет вдохновения — Самобранка выручит! Идеальная концепция родится за секунду. 🚀"
];

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initPlaygroundCard();
  initDifficultyPicker();
  initAuthModal();
  initDragAndDrop();
  updateLibraryBadge();
  initMascotClicks();
  renderDecksGrid();
  
  // Добавляем обработчик формы
  const genForm = document.getElementById('generatorForm');
  if (genForm) {
    genForm.addEventListener('submit', generateCards);
  }
  
  // Render LaTeX on page load
  if (window.renderMathInElement) {
    renderMathInElement(document.body, {
      delimiters: [
        {left: '$$', right: '$$', display: true},
        {left: '$', right: '$', display: false}
      ]
    });
  }
});

// --- Mascot Quote Bubble ---
function initMascotClicks() {
  const mascots = document.querySelectorAll('.hero-mascot, .sidebar-mascot, .header-mascot');
  mascots.forEach(mascot => {
    mascot.addEventListener('click', () => {
      const bubbleText = document.querySelector('.bubble-text');
      const sidebarSpeech = document.querySelector('.sidebar-speech p');
      const randomQuote = mascotQuotes[Math.floor(Math.random() * mascotQuotes.length)];
      
      if (bubbleText) {
        bubbleText.innerHTML = `<strong>Самобранка говорит:</strong> "${randomQuote}"`;
        // Quick scaling animation
        bubbleText.parentElement.style.transform = 'scale(1.05)';
        setTimeout(() => {
          bubbleText.parentElement.style.transform = 'scale(1)';
        }, 200);
      }
      if (sidebarSpeech) {
        sidebarSpeech.innerHTML = `"${randomQuote}"`;
      }
      showToast("🧙‍♂️ Скатерть-Самобранка поделилась советом!");
    });
  });
}

// --- Navigation Tabs Logic ---
function initTabs() {
  const navTabs = document.getElementById('navTabs');
  const tabs = navTabs.querySelectorAll('.nav-tab');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetSection = tab.getAttribute('data-target');
      switchTab(targetSection);
    });
  });
}

function switchTab(sectionId) {
  // Update state
  appState.activeTab = sectionId;
  
  // Update Active navigation tab styling
  const tabs = document.querySelectorAll('.nav-tab');
  tabs.forEach(tab => {
    if (tab.getAttribute('data-target') === sectionId) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  // Toggle Visibility of Sections
  const sections = document.querySelectorAll('.tab-content');
  sections.forEach(section => {
    if (section.id === sectionId) {
      section.classList.add('active');
    } else {
      section.classList.remove('active');
    }
  });

  // Scroll to top of section
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- Playground Card Flip (Bento Grid) ---
function initPlaygroundCard() {
  const playgroundCard = document.getElementById('playgroundCard');
  if (playgroundCard) {
    playgroundCard.addEventListener('click', () => {
      playgroundCard.classList.toggle('flipped');
    });
  }
}

// --- Difficulty Picker Logic ---
function initDifficultyPicker() {
  const diffButtons = document.querySelectorAll('.diff-btn');
  const hiddenInput = document.getElementById('difficultyInput');
  
  diffButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      diffButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const val = btn.getAttribute('data-value');
      hiddenInput.value = val;
      appState.selectedDifficulty = val;
    });
  });
}

// --- Counter input adjustment ---
function adjustCounter(change) {
  const countInput = document.getElementById('countInput');
  let currentVal = parseInt(countInput.value);
  let newVal = currentVal + change;
  if (newVal >= 3 && newVal <= 30) {
    countInput.value = newVal;
  }
}

// --- Toast Messaging ---
function showToast(message) {
  const toast = document.getElementById('appToast');
  toast.innerText = message;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

// --- Drag and Drop File Upload ---
function initDragAndDrop() {
  const dropzone = document.getElementById('dropzone');
  
  if (!dropzone) return;
  
  ['dragenter', 'dragover'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropzone.style.borderColor = 'var(--primary-600)';
      dropzone.style.backgroundColor = 'var(--primary-50)';
    }, false);
  });
  
  ['dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropzone.style.borderColor = 'rgba(120, 53, 15, 0.25)';
      dropzone.style.backgroundColor = 'var(--bg-app)';
    }, false);
  });
  
  dropzone.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    addUploadedFiles(files);
  });
}

function triggerFileInput() {
  document.getElementById('fileInput').click();
}

function handleFileSelect(event) {
  const files = event.target.files;
  addUploadedFiles(files);
}

function addUploadedFiles(files) {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (appState.uploadedFiles.length >= 10) {
      showToast("⚠️ Превышен лимит файлов: максимум 10 файлов.");
      break;
    }
    // Check format
    const extension = file.name.split('.').pop().toLowerCase();
    const allowed = ['txt', 'pdf', 'docx', 'pptx', 'md'];
    if (!allowed.includes(extension)) {
      showToast(`⚠️ Формат .${extension} не поддерживается.`);
      continue;
    }
    appState.uploadedFiles.push(file);
  }
  renderUploadedFiles();
}

function renderUploadedFiles() {
  const list = document.getElementById('selectedFilesList');
  list.innerHTML = '';
  
  appState.uploadedFiles.forEach((file, index) => {
    const item = document.createElement('div');
    item.className = 'file-item';
    item.innerHTML = `
      <span>📄 ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} МБ)</span>
      <button type="button" class="file-item-remove" onclick="removeFile(${index})">✕</button>
    `;
    list.appendChild(item);
  });
}

function removeFile(index) {
  appState.uploadedFiles.splice(index, 1);
  renderUploadedFiles();
}

// --- Loading Demos Quick-action ---
function loadDemo(type) {
  const subject = document.getElementById('subjectSelect');
  const grade = document.getElementById('classSelect');
  const topic = document.getElementById('topicInput');
  const textInput = document.getElementById('textInput');
  
  if (type === 'chudovo') {
    subject.value = 'Скучающий человек';
    grade.value = 'Умираю от скуки';
    topic.value = 'Сижу месяц в Чудово с лисичкой-сестричкой, не знаю как выйти из ситуации';
    textInput.value = 'Чудово — город в Новгородской области. Здесь красивая природа, тишина, водятся лисицы, но иногда становится очень скучно. Требуются идеи для развлечения и выхода из рутины.';
  } else if (type === 'artist') {
    subject.value = 'Художник';
    grade.value = 'Творческий кризис';
    topic.value = 'Художественные челленджи для выхода из застоя';
    textInput.value = 'Нужны необычные и вдохновляющие упражнения по рисованию, которые заставят мозг работать иначе, выйдут за рамки привычной академической школы и вернут страсть к творчеству.';
  } else if (type === 'gamedev') {
    subject.value = 'Геймдизайнер';
    grade.value = 'Ищу вдохновение';
    topic.value = 'Креативные игровые механики для инди-платформера';
    textInput.value = 'Разрабатываю инди-игру. Нужны свежие геймплейные механики, завязанные на физику, время или искажение пространства, чтобы удивить искушенных игроков.';
  } else if (type === 'architecture') {
    subject.value = 'Архитектор / Строитель';
    grade.value = 'Мозговой штурм';
    topic.value = 'Концепции умных остановок общественного транспорта';
    textInput.value = 'Требуются архитектурные концепции для городских остановок, сочетающие экологичность, современные технологии, локальную идентичность и комфорт для жителей.';
  }
  
  showToast("📋 Демо-данные успешно загружены в форму!");
  
  // Instantly scroll down a little bit to form
  const element = document.getElementById('generatorForm');
  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// --- API Integration (Vercel / Local) ---
async function callScarlexApi(input) {
  console.log('DEBUG: Sending request to API:', input);
  try {
    // В Vercel API будет доступно по относительному пути /api/generate
    // Если работаем локально как файл, используем полный путь к серверу
    const isLocalFile = window.location.protocol === 'file:';
    const proxyUrl = isLocalFile ? "http://127.0.0.1:3000/api/generate" : "/api/generate";
    
    const response = await fetch(proxyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(input)
    });

    console.log('DEBUG: Response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('DEBUG: Error response data:', errorData);
      throw new Error(errorData.error || `Server Error: ${response.status}`);
    }

    const data = await response.json();
    console.log('DEBUG: Successful data received:', data);
    return data;
  } catch (err) {
    console.error('DEBUG: Fetch error:', err);
    throw err;
  }
}

// --- Dynamic Deck Generation ---
function generateCards(event) {
  event.preventDefault();
  
  const submitBtn = document.getElementById('submitBtn');
  const subject = document.getElementById('subjectSelect').value;
  const grade = document.getElementById('classSelect').value;
  const topic = document.getElementById('topicInput').value;
  const count = parseInt(document.getElementById('countInput').value);
  const textData = document.getElementById('textInput').value;
  
  // UI Loading Transition on submit button
  submitBtn.disabled = true;
  const originalHtml = submitBtn.innerHTML;
  
  // Custom loader messages
  let step = 0;
  const loadingMessages = [
    "✨ Расстилаем Волшебную Самобранку...",
    "🔍 Ищем вдохновение для запроса: " + topic + "...",
    "🧵 Вышиваем карточки узорами креативности...",
    "🍽️ Подаем горячие идеи на стол!"
  ];
  
  submitBtn.innerHTML = `<span class="btn-sparkle">🌀</span> <span class="btn-text">${loadingMessages[0]}</span>`;
  
  const loadingInterval = setInterval(() => {
    step++;
    if (step < loadingMessages.length) {
      submitBtn.innerHTML = `<span class="btn-sparkle">🌀</span> <span class="btn-text">${loadingMessages[step]}</span>`;
    }
  }, 800);

  // Try real API through proxy
  callScarlexApi({ subject, grade, topic, count, textData, difficulty: appState.selectedDifficulty })
    .then(cards => {
      finalizeGeneration(cards, { subject, grade, topic, count, originalHtml, loadingInterval });
    })
    .catch(err => {
      console.error(err);
      showToast("❌ Ошибка: " + err.message + ". Проверьте, запущен ли сервер и настроен ли .env");
      
      // Reset Button on total failure
      clearInterval(loadingInterval);
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalHtml;
    });
}

function generateMockCards(subject, grade, topic, count) {
  const cards = [];
  for (let i = 1; i <= count; i++) {
    cards.push({
      q: `Идея №${i} по запросу "${topic}": Креативная концепция №${i}`,
      a: `<strong>Как реализовать:</strong> Пошаговый план решения для роли "${subject}" в ситуации "${grade}" с глубиной проработки "${appState.selectedDifficulty == 'easy' ? 'Поверхностно' : appState.selectedDifficulty == 'medium' ? 'Сбалансированно' : 'Глубоко'}".<br>Шаг 1: Сделайте набросок или сформулируйте концепт.<br>Шаг 2: Добавьте контекст и детали.<br>Шаг 3: Протестируйте прототип!`
    });
  }
  return cards;
}

function finalizeGeneration(cards, params) {
  const { subject, grade, topic, count, originalHtml, loadingInterval } = params;
  
  clearInterval(loadingInterval);
  const submitBtn = document.getElementById('submitBtn');
  
  // Create new deck in state
  const newDeckId = appState.decks.length;
  const badgeMap = {
    'Художник': 'badge-math',
    'Скучающий человек': 'badge-lang',
    'Геймдизайнер': 'badge-world',
    'Архитектор / Строитель': 'badge-lit',
    'Предприниматель': 'badge-default',
    'Писатель / Сценарист': 'badge-default'
  };
  
  const emojiMap = {
    'Художник': '🎨',
    'Скучающий человек': '🦊',
    'Геймдизайнер': '🎮',
    'Архитектор / Строитель': '🏗️',
    'Предприниматель': '💼',
    'Писатель / Сценарист': '✍️'
  };
  
  const newDeck = {
    id: newDeckId,
    emoji: emojiMap[subject] || '💡',
    subject: subject,
    title: topic,
    meta: `${cards.length} идей · ${grade}`,
    badgeClass: badgeMap[subject] || 'badge-default',
    cards: cards
  };
  
  appState.decks.unshift(newDeck);
  
  // Reset Form
  document.getElementById('generatorForm').reset();
  appState.uploadedFiles = [];
  renderUploadedFiles();
  
  // Reset Button
  submitBtn.disabled = false;
  submitBtn.innerHTML = originalHtml;
  
  // Refresh UI
  updateLibraryBadge();
  renderDecksGrid();
  
  // Switch to Library and Show toast success
  switchTab('library-section');
  showToast(`✨ Умная Самобранка накрыла стол идеями по теме "${topic}"!`);
}

// --- Library rendering & Badge update ---
function updateLibraryBadge() {
  const badge = document.getElementById('libraryCount');
  if (badge) {
    badge.innerText = appState.decks.length;
  }
}

function renderDecksGrid() {
  const grid = document.getElementById('decksGrid');
  if (!grid) return;
  
  grid.innerHTML = '';
  
  appState.decks.forEach(deck => {
    const card = document.createElement('div');
    card.className = 'deck-card';
    card.onclick = () => openDeck(deck.id);
    
    card.innerHTML = `
      <div class="deck-emoji">${deck.emoji}</div>
      <div class="deck-body">
        <span class="deck-badge ${deck.badgeClass}">${deck.subject}</span>
        <h3 class="deck-title">${deck.title}</h3>
        <p class="deck-meta">${deck.meta}</p>
      </div>
      <div class="deck-footer">
        <span class="deck-action">Изучать →</span>
      </div>
    `;
    
    grid.appendChild(card);
  });
}

// --- Flashcard study mode viewer logic ---
function openDeck(deckId) {
  const deck = appState.decks.find(d => d.id === deckId);
  if (!deck) return;
  
  appState.activeDeck = deck;
  appState.activeCardIndex = 0;
  
  const overlay = document.getElementById('studyOverlay');
  document.getElementById('studyDeckTitle').innerText = deck.title;
  
  updateStudyCardUI();
  updateStudyMascot('thinking'); // Инициализируем маскота в состоянии "думает"
  overlay.style.display = 'block';
}

function closeStudyMode() {
  document.getElementById('studyOverlay').style.display = 'none';
  // Reset card state to not flipped
  document.getElementById('studyCard').classList.remove('flipped');
}

function flipStudyCard() {
  const card = document.getElementById('studyCard');
  card.classList.toggle('flipped');
  
  const isFlipped = card.classList.contains('flipped');
  if (isFlipped) {
    updateStudyMascot('happy'); // Маскот радуется правильному ответу
  } else {
    updateStudyMascot('thinking'); // Возвращается к размышлениям
  }
}

function navigateCard(direction) {
  const deck = appState.activeDeck;
  if (!deck) return;
  
  let newIndex = appState.activeCardIndex + direction;
  
  if (newIndex >= 0 && newIndex < deck.cards.length) {
    // Reset flip animation first
    const cardEl = document.getElementById('studyCard');
    cardEl.classList.remove('flipped');
    
    // Маскот снова начинает думать над новым вопросом
    updateStudyMascot('thinking');
    
    // Wait a tiny fraction for flip transition reset, then swap content
    setTimeout(() => {
      appState.activeCardIndex = newIndex;
      updateStudyCardUI();
    }, 150);
  } else if (newIndex >= deck.cards.length) {
    showToast("🎉 Отличная работа! Вы изучили все карточки в наборе!");
    closeStudyMode();
  } else {
    showToast("👈 Это первая карточка в наборе.");
  }
}

function updateStudyCardUI() {
  const deck = appState.activeDeck;
  const index = appState.activeCardIndex;
  const card = deck.cards[index];
  
  // Set question and answer
  document.getElementById('studyQuestion').innerHTML = card.q;
  document.getElementById('studyAnswer').innerHTML = card.a;
  
  // Render dynamic mathematical formulas in KaTeX
  if (window.renderMathInElement) {
    renderMathInElement(document.getElementById('studyQuestion'), {
      delimiters: [
        {left: '$$', right: '$$', display: true},
        {left: '$', right: '$', display: false}
      ]
    });
    renderMathInElement(document.getElementById('studyAnswer'), {
      delimiters: [
        {left: '$$', right: '$$', display: true},
        {left: '$', right: '$', display: false}
      ]
    });
  }
  
  // Progress indicators
  document.getElementById('studyProgressText').innerText = `Карточка ${index + 1} из ${deck.cards.length}`;
  
  const percent = ((index + 1) / deck.cards.length) * 100;
  document.getElementById('studyProgressBar').style.width = `${percent}%`;
  
  // Toggle navigation button disabled states
  document.getElementById('prevCardBtn').disabled = (index === 0);
  if (index === deck.cards.length - 1) {
    document.getElementById('nextCardBtn').innerText = "Завершить 🏁";
  } else {
    document.getElementById('nextCardBtn').innerText = "Вперед →";
  }
}

// --- Interactive Study Mascot Reactions ---
function updateStudyMascot(state) {
  const mascotImg = document.getElementById('studyStageMascot');
  const bubbleText = document.getElementById('studyMascotText');
  
  if (!mascotImg || !bubbleText) return;
  
  const thinkingTexts = [
    "Давай обдумаем эту идею! 🤔",
    "Как думаешь, легко ли это реализовать? 🧐",
    "Попробуй представить эту концепцию в деталях! 💡",
    "Хм, это может стать настоящим прорывом! 🧠",
    "Здесь скрывается отличный творческий ход! 🔍"
  ];
  
  const happyTexts = [
    "Какая отличная мысль! 🎉",
    "Это гениально! 🌟",
    "Прекрасный план реализации! 🏆",
    "Отличный креатив! Так держать! 🚀",
    "Ты просто генератор инсайтов! 🧠✨"
  ];
  
  if (state === 'thinking') {
    mascotImg.src = 'mascot_thinking.png';
    mascotImg.className = 'study-stage-mascot mascot-thinking';
    bubbleText.innerText = thinkingTexts[Math.floor(Math.random() * thinkingTexts.length)];
  } else if (state === 'happy') {
    mascotImg.src = 'mascot_happy.png';
    mascotImg.className = 'study-stage-mascot mascot-happy';
    bubbleText.innerText = happyTexts[Math.floor(Math.random() * happyTexts.length)];
  }
}

// --- Authentication Modal logic ---
function initAuthModal() {
  const modal = document.getElementById('authModal');
  const openBtn = document.getElementById('openAuthBtn');
  const closeBtn = document.getElementById('closeAuthBtn');
  
  openBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
  });
  
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });
  
  // Close on outer modal click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
  
  // Form Tabs switcher inside Modal
  const tabBtns = modal.querySelectorAll('.auth-tab-btn');
  const forms = modal.querySelectorAll('.auth-form');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const targetForm = btn.getAttribute('data-form');
      forms.forEach(form => {
        if (form.id === targetForm) {
          form.classList.add('active');
        } else {
          form.classList.remove('active');
        }
      });
    });
  });
}

function handleAuthSubmit(event, successMessage) {
  event.preventDefault();
  
  const modal = document.getElementById('authModal');
  modal.style.display = 'none';
  
  // Clear forms
  event.target.reset();
  
  // Change Auth Area in header to mock log in user profile
  const authArea = document.querySelector('.auth-area');
  authArea.innerHTML = `
    <div class="user-profile-badge" onclick="logoutUser()" title="Нажмите чтобы выйти">
      <span class="user-avatar">👩‍🏫</span>
      <span class="user-name">Мария И.</span>
    </div>
  `;
  
  // Custom styled profile style (appended if not exists)
  if (!document.getElementById('profile-style')) {
    const style = document.createElement('style');
    style.id = 'profile-style';
    style.innerHTML = `
      .user-profile-badge {
        display: flex;
        align-items: center;
        gap: 8px;
        background-color: var(--accent-50);
        border: 1.5px solid var(--border-color);
        padding: 8px 16px;
        border-radius: 100px;
        cursor: pointer;
        font-weight: 600;
        font-size: 13px;
        color: var(--accent-900);
        transition: var(--transition);
      }
      .user-profile-badge:hover {
        background-color: #fee2e2;
        border-color: #ef4444;
      }
    `;
    document.head.appendChild(style);
  }
  
  showToast("🔑 " + successMessage);
}

function logoutUser() {
  const authArea = document.querySelector('.auth-area');
  authArea.innerHTML = `
    <button class="btn btn-secondary btn-login" id="openAuthBtn">
      <span>Войти</span>
      <span class="login-icon">👤</span>
    </button>
  `;
  
  // Re-init modal triggers since button is re-created
  initAuthModal();
  showToast("🔓 Вы вышли из аккаунта.");
}
