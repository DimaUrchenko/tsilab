import { Button } from './Button';
import { Text } from './Text';
import { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (value: string) => void;
}

export const Modal = ({ isOpen, onClose, onAdd }: ModalProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (inputValue.trim()) {
      onAdd(inputValue);
      setInputValue('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-full">
        <Text variant="h2" bold className="mb-4">
          Добавить новый элемент
        </Text>
        
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Введите название..."
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          autoFocus
        />
        
        <div className="flex justify-end gap-2">
          <Button
            color="secondary"
            size="small"
            title="Отмена"
            onClick={onClose}
          />
          <Button
            color="primary"
            size="small"
            title="Добавить"
            onClick={handleAdd}
          />
        </div>
      </div>
    </div>
  );
};