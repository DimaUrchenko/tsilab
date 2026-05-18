import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

// Хранилище пользователей
let users = [];

// Регистрация
app.post('/api/register', (req, res) => {
  const { firstName, lastName, phone, email, password, role } = req.body;
  
  // Валидация
  if (!firstName || !lastName || !phone || !email || !password) {
    return res.status(400).json({ error: 'Все поля обязательны для заполнения' });
  }
  
  // Проверка email на уникальность
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ error: 'Пользователь с таким email уже существует' });
  }
  
  // Создаём нового пользователя
  const newUser = {
    id: users.length + 1,
    firstName,
    lastName,
    phone,
    email,
    password, // В реальном проекте нужно хешировать!
    role: role || 'user'
  };
  
  users.push(newUser);
  console.log('Новый пользователь:', newUser);
  
  res.status(201).json({ 
    message: 'Регистрация успешна!',
    user: { id: newUser.id, firstName, lastName, email, role: newUser.role }
  });
});

// Авторизация (логин)
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email и пароль обязательны' });
  }
  
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return res.status(401).json({ error: 'Неверный email или пароль' });
  }
  
  res.json({ 
    message: 'Вход выполнен успешно!',
    user: { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role }
  });
});

// Получить всех пользователей (только для админа)
app.get('/api/users', (req, res) => {
  res.json(users);
});

app.get('/api/data', (req, res) => {
  res.json({ message: "Hello from server!", title: "Яблоко" });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
  console.log(`POST /api/register - регистрация`);
  console.log(`POST /api/login - авторизация`);
});