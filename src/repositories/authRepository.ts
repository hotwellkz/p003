import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
  type Unsubscribe
} from "firebase/auth";
import { auth } from "../services/firebase";

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthRepository {
  signup: (data: AuthCredentials) => Promise<User>;
  login: (data: AuthCredentials) => Promise<User>;
  logout: () => Promise<void>;
  subscribe: (cb: (user: User | null) => void) => Unsubscribe;
}

// Функция для преобразования Firebase ошибок в понятные сообщения
const getFirebaseErrorMessage = (error: unknown): string => {
  if (error && typeof error === "object" && "code" in error) {
    const code = (error as { code: string }).code;
    switch (code) {
      case "auth/invalid-api-key":
        return "Неверный API ключ Firebase. Проверьте настройки в .env файле.";
      case "auth/unauthorized-domain":
        return "Домен не авторизован. Добавьте домен в Firebase Console → Authentication → Settings → Authorized domains.";
      case "auth/operation-not-allowed":
        return "Email/Password провайдер не включен. Включите его в Firebase Console → Authentication → Sign-in method.";
      case "auth/weak-password":
        return "Пароль слишком слабый. Используйте минимум 6 символов.";
      case "auth/email-already-in-use":
        return "Этот email уже зарегистрирован. Используйте другой email или войдите.";
      case "auth/user-not-found":
        return "Пользователь с таким email не найден.";
      case "auth/wrong-password":
        return "Неверный пароль.";
      case "auth/invalid-email":
        return "Неверный формат email.";
      case "auth/too-many-requests":
        return "Слишком много попыток. Попробуйте позже.";
      case "auth/network-request-failed":
        return "Ошибка сети. Проверьте подключение к интернету.";
      default:
        return `Ошибка авторизации: ${code}. Проверьте настройки Firebase.`;
    }
  }
  return error instanceof Error ? error.message : "Неизвестная ошибка авторизации";
};

export const authRepository: AuthRepository = {
  async signup({ email, password }) {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      return res.user;
    } catch (error) {
      throw new Error(getFirebaseErrorMessage(error));
    }
  },
  async login({ email, password }) {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      return res.user;
    } catch (error) {
      throw new Error(getFirebaseErrorMessage(error));
    }
  },
  async logout() {
    await signOut(auth);
  },
  subscribe(callback) {
    return onAuthStateChanged(auth, callback);
  }
};

