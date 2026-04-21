import { useState } from 'react';
import { Button } from '../components/Button';
import { Text } from '../components/Text';

const TodoList = () => {
  const [items, setItems] = useState<string[]>([
    "Изучить React",
    "Сделать лабораторную работу"
  ]);
  const [newItem, setNewItem] = useState('');
  const [showModal, setShowModal] = useState(false);

  const addItem = () => {
    if (newItem.trim()) {
      setItems([...items, newItem]);
      setNewItem('');
      setShowModal(false);
    }
  };

  const deleteItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-2xl mx-auto p-5">
      <Text variant="h1" bold>Список задач</Text>
      
      <div className="mt-4">
        <Button
          color="primary"
          size="middle"
          title="+ Добавить"
          onClick={() => setShowModal(true)}
        />
      </div>

      {/* Список */}
      <div className="mt-5">
        {items.length === 0 ? (
          <Text>Список пуст</Text>
        ) : (
          items.map((item, index) => (
            <div 
              key={index} 
              className="flex justify-between items-center p-3 border-b border-gray-200"
            >
              <span className="text-gray-700">{index + 1}. {item}</span>
              <Button
                color="secondary"
                size="small"
                title="Удалить"
                onClick={() => deleteItem(index)}
              />
            </div>
          ))
        )}
      </div>

      {/* Модальное окно (Tailwind версия) */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-5 w-80 max-w-full">
            <Text variant="h3" bold>Добавить элемент</Text>
            
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Введите название..."
              className="w-full p-2 my-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            
            <div className="flex gap-2 justify-end">
              <Button 
                color="secondary" 
                size="small" 
                title="Отмена" 
                onClick={() => setShowModal(false)} 
              />
              <Button 
                color="primary" 
                size="small" 
                title="Добавить" 
                onClick={addItem} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;