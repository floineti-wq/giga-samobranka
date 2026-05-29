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
      emoji: '❄️',
      subject: 'Русский язык',
      title: 'Словарные слова: Зима',
      meta: '8 карточек · 1 класс',
      badgeClass: 'badge-lang',
      cards: [
        { q: 'Как пишется слово с пропущенной буквой: д..кабрь?', a: 'Правильно: <strong>декабрь</strong>. Это словарное слово, написание буквы "е" нужно запомнить.' },
        { q: 'Как пишется слово с пропущенной буквой: янв..рь?', a: 'Правильно: <strong>январь</strong>. Пишется буква "а".' },
        { q: 'Как пишется слово с пропущенной буквой: ф..враль?', a: 'Правильно: <strong>февраль</strong>. Пишется буква "е".' },
        { q: 'Как пишется слово с пропущенной буквой: м..роз?', a: 'Правильно: <strong>мороз</strong>. Пишется буква "о" (непроизносимая безударная гласная).' },
        { q: 'Как пишется слово с пропущенной буквой: к..ньки?', a: 'Правильно: <strong>коньки</strong>. Пишется буква "о" и мягкий знак для мягкости.' },
        { q: 'Как пишется слово с пропущенной буквой: сн..говик?', a: 'Правильно: <strong>снеговик</strong>. Проверочное слово — снег, пишется "е".' },
        { q: 'Как пишется слово с пропущенной буквой: вь..га?', a: 'Правильно: <strong>вьюга</strong>. Пишется разделительный мягкий знак перед буквой "ю".' },
        { q: 'Как пишется слово с пропущенной буквой: м..тель?', a: 'Правильно: <strong>метель</strong>. Проверочное слово — мёл, пишется "е".' }
      ]
    },
    {
      id: 1,
      emoji: '✖️',
      subject: 'Математика',
      title: 'Таблица умножения на 7',
      meta: '10 карточек · 2 класс',
      badgeClass: 'badge-math',
      cards: [
        { q: 'Сколько будет: $7 \\cdot 1$?', a: 'Ответ: <strong>7</strong>.' },
        { q: 'Сколько будет: $7 \\cdot 2$?', a: 'Ответ: <strong>14</strong>.' },
        { q: 'Сколько будет: $7 \\cdot 3$?', a: 'Ответ: <strong>21</strong>.' },
        { q: 'Сколько будет: $7 \\cdot 4$?', a: 'Ответ: <strong>28</strong>.' },
        { q: 'Сколько будет: $7 \\cdot 5$?', a: 'Ответ: <strong>35</strong>.' },
        { q: 'Сколько будет: $7 \\cdot 6$?', a: 'Ответ: <strong>42</strong>.' },
        { q: 'Сколько будет: $7 \\cdot 7$?', a: 'Ответ: <strong>49</strong>.' },
        { q: 'Сколько будет: $7 \\cdot 8$?', a: 'Ответ: <strong>56</strong>.' },
        { q: 'Сколько будет: $7 \\cdot 9$?', a: 'Ответ: <strong>63</strong>.' },
        { q: 'Сколько будет: $7 \\cdot 10$?', a: 'Ответ: <strong>70</strong>.' }
      ]
    },
    {
      id: 2,
      emoji: '🌳',
      subject: 'Окружающий мир',
      title: 'Окружающий мир: Лес',
      meta: '6 карточек · 3 класс',
      badgeClass: 'badge-world',
      cards: [
        { q: 'Какое дерево называют королем русского леса из-за его могучего вида и долголетия?', a: 'Это <strong>Дуб</strong>. Он живет до 1000 лет.' },
        { q: 'Какое животное называют "санитаром леса"?', a: 'Это <strong>Волк</strong>. Он помогает поддерживать баланс в природе.' },
        { q: 'Какая птица лечит деревья, доставая вредителей из-под коры?', a: 'Это <strong>Дятел</strong>. Его называют лесным доктором.' },
        { q: 'Назовите самый ядовитый гриб в наших лесах.', a: 'Это <strong>Бледная поганка</strong>. Даже маленький кусочек смертельно опасен.' },
        { q: 'Как называется наука, изучающая взаимоотношения живых организмов и леса?', a: 'Это <strong>Экология</strong>.' },
        { q: 'Какое хвойное дерево сбрасывает свои иголки на зиму?', a: 'Это <strong>Лиственница</strong>.' }
      ]
    },
    {
      id: 3,
      emoji: '🐺',
      subject: 'Литература',
      title: 'Литература: "Колобок"',
      meta: '8 карточек · 1 класс',
      badgeClass: 'badge-lit',
      cards: [
        { q: 'Из чего старуха испекла Колобка?', a: 'Из муки, сметаны и масла — <strong>по сусекам помела, по амбару поскребла</strong>.' },
        { q: 'Где остывал Колобок перед тем, как покатиться в путешествие?', a: 'На окошке.' },
        { q: 'Какого зверя первым встретил Колобок в лесу?', a: 'Первым встретился <strong>Заяц</strong>.' },
        { q: 'Какую песню пел Колобок всем животным?', a: '«Я Колобок, Колобок, по амбару метён, по сусекам скребён...»' },
        { q: 'Какого зверя встретил Колобок вторым по счету?', a: 'Вторым был <strong>Волк</strong>.' },
        { q: 'Какого зверя встретил Колобок третьим по счету?', a: 'Третьим встретился <strong>Медведь</strong>.' },
        { q: 'Кто обхитрил Колобка в самом конце сказки?', a: 'Хтрая <strong>Лиса</strong>.' },
        { q: 'Как именно Лисе удалось поймать Колобка?', a: 'Она притворилась глуховатой и попросила его сесть ей на носок и спеть еще разок.' }
      ]
    }
  ],
  activeDeck: null,
  activeCardIndex: 0
};

// --- Mascot Motivational Quotes ---
const mascotQuotes = [
  "Ученье — свет, а неученье — тьма! Накроем стол знаний? 🎒",
  "Я готова! Поделись темой урока, и карточки выткутся сами! ✨",
  "Математика, русский язык, биология... Для меня нет трудных задач! 📚",
  "Флеш-карточки помогают запоминать информацию в 3 раза быстрее! Проверено наукой. 🧠",
  "Учитель отдыхает — Самобранка работает! Идеальный урок готов за минуту. 🕒"
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
  
  if (type === 'winter') {
    subject.value = 'Русский язык';
    grade.value = '1';
    topic.value = 'Словарные слова на тему Зима';
    textInput.value = 'Декабрь, январь, февраль, мороз, коньки, снеговик, вьюга, метель. Это основные зимние слова для школьной программы.';
  } else if (type === 'math') {
    subject.value = 'Математика';
    grade.value = '2';
    topic.value = 'Таблица умножения на 7';
    textInput.value = 'Таблица умножения на 7. Примеры: 7x1=7, 7x2=14, 7x3=21, 7x4=28, 7x5=35, 7x6=42, 7x7=49, 7x8=56, 7x9=63, 7x10=70.';
  } else if (type === 'forest') {
    subject.value = 'Окружающий мир';
    grade.value = '3';
    topic.value = 'Окружающий мир: Лес';
    textInput.value = 'Лес — это сообщество деревьев, растений и животных. Здесь растут дубы, березы, ели, сосны, живут волки, лисы, дятлы.';
  } else if (type === 'kolobok') {
    subject.value = 'Литература';
    grade.value = '1';
    topic.value = 'Сказка Колобок';
    textInput.value = 'Русская народная сказка про Колобка, который ушел от дедушки и бабушки, встретил зайца, волка, медведя и лису.';
  }
  
  showToast("📋 Демо-данные успешно загружены в форму!");
  
  // Instantly scroll down a little bit to form
  const element = document.getElementById('generatorForm');
  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
    "🔍 Анализируем тему: " + topic + "...",
    "🧵 Вышиваем карточки узорами знаний...",
    "🍽️ Подаем горячие карточки на стол!"
  ];
  
  submitBtn.innerHTML = `<span class="btn-sparkle">🌀</span> <span class="btn-text">${loadingMessages[0]}</span>`;
  
  const loadingInterval = setInterval(() => {
    step++;
    if (step < loadingMessages.length) {
      submitBtn.innerHTML = `<span class="btn-sparkle">🌀</span> <span class="btn-text">${loadingMessages[step]}</span>`;
    }
  }, 800);
  
  // Simulate network / generation speed
  setTimeout(() => {
    clearInterval(loadingInterval);
    
    // Create new mock deck in state
    const newDeckId = appState.decks.length;
    const badgeMap = {
      'Русский язык': 'badge-lang',
      'Математика': 'badge-math',
      'Окружающий мир': 'badge-world',
      'Литература': 'badge-lit'
    };
    
    const emojiMap = {
      'Русский язык': '✍️',
      'Математика': '📐',
      'Окружающий мир': '🍀',
      'Литература': '📖',
      'Английский язык': '🇬🇧',
      'История': '🏺',
      'Биология': '🔬',
      'География': '🌍',
      'Физика': '⚡',
      'Информатика': '💻'
    };
    
    const newDeck = {
      id: newDeckId,
      emoji: emojiMap[subject] || '🎒',
      subject: subject,
      title: topic,
      meta: `${count} карточек · ${grade} класс`,
      badgeClass: badgeMap[subject] || 'badge-default',
      cards: []
    };
    
    // Fill with smart mock flashcards based on subject/count
    for (let i = 1; i <= count; i++) {
      newDeck.cards.push({
        q: `Вопрос ${i} по теме "${topic}": Расскажите подробнее про ключевой аспект №${i}?`,
        a: `Ответ ${i}: Подробное объяснение для ${grade} класса по предмету "${subject}" с учетом сложности "${appState.selectedDifficulty}". Это фундаментальное знание!`
      });
    }
    
    appState.decks.unshift(newDeck); // Add to beginning of list
    
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
    showToast(`✨ Умная Самобранка накрыла стол карточками по теме "${topic}"!`);
  }, 3200);
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
    "Давай подумаем вместе! 🤔",
    "Интересный вопрос! Что думаешь? 🧐",
    "Каков будет твой ответ? 😉",
    "Попробуй вспомнить правило! 💡",
    "Хм, дай угадаю, ты это знаешь! 🧠",
    "Тут скрывается важная подсказка! 🔍"
  ];
  
  const happyTexts = [
    "Точно! Ты супер! 🎉",
    "Абсолютно верно! 🌟",
    "Великолепный ответ! 🏆",
    "В точку! Так держать! 🚀",
    "Именно так! Отличная память! 👏",
    "Ты просто гений! 🧠✨"
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
