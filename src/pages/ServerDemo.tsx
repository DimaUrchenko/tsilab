import { useState, useEffect } from 'react';
import { Text } from '../components/Text';

interface ServerData {
  message: string;
  title: string;
}

const ServerDemo = () => {
  const [data, setData] = useState<ServerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5001/api/data");
        
        if (!response.ok) {
          throw new Error(`Ошибка: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
        setError('');
      } catch (error) {
        console.error("Error fetching data:", error);
        setError('Не удалось загрузить данные с сервера');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-8">
      <Text variant="h1" bold center>Сервер + React</Text>
      
      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <Text variant="h2" bold>Данные с сервера:</Text>
        
        {loading && (
          <div className="mt-4 text-blue-600">Загрузка...</div>
        )}
        
        {error && (
          <div className="mt-4 text-red-600">{error}</div>
        )}
        
        {data && !loading && (
          <div className="mt-4 space-y-2">
            <div className="p-3 bg-green-100 rounded">
              <Text bold>Сообщение:</Text>
              <Text>{data.message}</Text>
            </div>
            <div className="p-3 bg-blue-100 rounded">
              <Text bold>Товар:</Text>
              <Text>{data.title}</Text>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 text-center text-gray-500 text-sm">
        <Text>Сервер работает на http://localhost:5001</Text>
      </div>
    </div>
  );
};

export default ServerDemo;