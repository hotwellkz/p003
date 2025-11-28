# 🔧 Переменные окружения для Netlify

## 📋 Обязательные переменные окружения

Для корректной работы приложения в Netlify необходимо установить следующие переменные окружения:

### Firebase Configuration

```
VITE_FIREBASE_API_KEY=AIzaSy... (ваш API ключ из Firebase Console)
VITE_FIREBASE_AUTH_DOMAIN=prompt-6a4fd.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=prompt-6a4fd
VITE_FIREBASE_STORAGE_BUCKET=prompt-6a4fd.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

### OpenAI Configuration

```
VITE_OPENAI_API_KEY=sk-your-openai-api-key-here
VITE_OPENAI_MODEL=gpt-4o-mini
```

### Netlify Secrets Scanning (опционально)

```
SECRETS_SCAN_SMART_DETECTION_ENABLED=false
```

## 🔍 Как получить значения Firebase

1. Откройте [Firebase Console](https://console.firebase.google.com/)
2. Выберите проект `prompt-6a4fd`
3. Перейдите в **Project Settings** (⚙️) → **General**
4. Найдите раздел **Your apps** → **Web app**
5. Скопируйте значения из конфигурации:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",           // → VITE_FIREBASE_API_KEY
  authDomain: "...",            // → VITE_FIREBASE_AUTH_DOMAIN
  projectId: "...",            // → VITE_FIREBASE_PROJECT_ID
  storageBucket: "...",         // → VITE_FIREBASE_STORAGE_BUCKET
  messagingSenderId: "...",     // → VITE_FIREBASE_MESSAGING_SENDER_ID
  appId: "..."                  // → VITE_FIREBASE_APP_ID
};
```

## ⚠️ Важно

- **НЕ используйте** `VITE_FIREBASE_APY_KEY` (с опечаткой) - это неправильное имя
- **Используйте** `VITE_FIREBASE_API_KEY` (правильное имя)
- Все переменные должны начинаться с `VITE_` для работы с Vite
- После добавления переменных пересоберите проект в Netlify

## 📝 Инструкция по добавлению в Netlify

1. Откройте Netlify Dashboard → ваш сайт
2. Перейдите в **Site settings** → **Build & deploy** → **Environment variables**
3. Нажмите **Add variable** для каждой переменной
4. Введите **Key** и **Value** (см. список выше)
5. Выберите **Scopes**: Production, Deploy previews, Branch deploys (по необходимости)
6. Сохраните
7. Запустите новый деплой

## ✅ Проверка

После деплоя проверьте консоль браузера:
- Должно быть сообщение: `🔥 Firebase конфигурация: {...}`
- Должно быть сообщение: `✅ Firebase успешно инициализирован`
- Не должно быть ошибок `auth/invalid-api-key`

