import { useState } from 'react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Text } from '../components/Text';

const Home = () => {
  const [name, setName] = useState('');

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 20px', textAlign: 'center' }}>
      <Text variant="h1" bold>Добро пожаловать! 👋</Text>
      <Text variant="p">Это главная страница с кастомными компонентами</Text>
      
      <div style={{ marginTop: '30px' }}>
        <Input
          label="Ваше имя"
          placeholder="Введите имя"
          value={name}
          onChange={setName}
        />
      </div>
      
      {name && (
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#e8f4fd', borderRadius: '8px' }}>
          <Text>Привет, {name}! 👋</Text>
        </div>
      )}
      
      <div style={{ marginTop: '30px' }}>
        <Button
          color="primary"
          size="middle"
          title="Нажми меня"
          onClick={() => alert(`Привет, ${name || 'гость'}!`)}
        />
      </div>
    </div>
  );
};

export default Home;