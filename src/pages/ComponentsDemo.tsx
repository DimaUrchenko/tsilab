import { useState } from 'react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Text } from '../components/Text';

const ComponentsDemo = () => {
  const [textValue, setTextValue] = useState('');
  const [emailValue, setEmailValue] = useState('');

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '40px 20px' }}>
      <Text variant="h1" bold center>Демонстрация компонентов</Text>
      
      {/* Компонент Text */}
      <div style={{ marginTop: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <Text variant="h2" bold>Компонент Text</Text>
        <Text variant="h1">Заголовок H1</Text>
        <Text variant="h2">Заголовок H2</Text>
        <Text variant="h3">Заголовок H3</Text>
        <Text variant="p">Обычный параграф</Text>
        <Text variant="p" bold>Жирный текст</Text>
        <Text variant="p" center>Текст по центру</Text>
      </div>
      
      {/* Компонент Input */}
      <div style={{ marginTop: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <Text variant="h2" bold>Компонент Input</Text>
        
        <Input
          label="Обычное поле"
          placeholder="Введите текст..."
          value={textValue}
          onChange={setTextValue}
        />
        
        <div style={{ marginTop: '15px' }}>
          <Input
            label="Email (с ошибкой)"
            type="email"
            placeholder="example@mail.com"
            value={emailValue}
            onChange={setEmailValue}
            error={emailValue && !emailValue.includes('@') ? 'Неверный email' : undefined}
          />
        </div>
        
        <div style={{ marginTop: '15px' }}>
          <Input
            label="Отключённое поле"
            value="Я отключён"
            onChange={() => {}}
            disabled
          />
        </div>
      </div>
      
      {/* Компонент Button */}
      <div style={{ marginTop: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <Text variant="h2" bold>Компонент Button</Text>
        
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '15px' }}>
          <Button color="primary" size="small" title="Маленькая" onClick={() => alert('Маленькая')} />
          <Button color="primary" size="middle" title="Средняя" onClick={() => alert('Средняя')} />
          <Button color="primary" size="large" title="Большая" onClick={() => alert('Большая')} />
          <Button color="secondary" size="middle" title="Secondary" onClick={() => alert('Secondary')} />
          <Button color="primary" size="middle" title="Отключена" onClick={() => {}} disabled />
        </div>
      </div>
      
      {/* Результат ввода */}
      {textValue && (
        <div style={{ marginTop: '30px', padding: '16px', backgroundColor: '#e8f4fd', borderRadius: '8px' }}>
          <Text bold>Вы ввели:</Text>
          <Text>{textValue}</Text>
        </div>
      )}
    </div>
  );
};

export default ComponentsDemo;