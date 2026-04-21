import { useState } from 'react';
import { Button } from './Button';
import { Text } from './Text';

interface ListItemProps {
  item: string;
  index: number;
  onDelete: (index: number) => void;
  onEdit: (index: number, newValue: string) => void;
}

export const ListItem = ({ item, index, onDelete, onEdit }: ListItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(item);

  const handleSave = () => {
    onEdit(index, editValue);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-2">
      {isEditing ? (
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="flex-1 px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          <Button color="primary" size="small" title="Сохранить" onClick={handleSave} />
          <Button color="secondary" size="small" title="Отмена" onClick={() => {
            setIsEditing(false);
            setEditValue(item);
          }} />
        </div>
      ) : (
        <>
          <div className="flex-1">
            <Text variant="p">
              {index + 1}. {item}
            </Text>
          </div>
          <div className="flex gap-2">
            <Button color="secondary" size="small" title="Редактировать" onClick={() => setIsEditing(true)} />
            <Button color="primary" size="small" title="Удалить" onClick={() => onDelete(index)} />
          </div>
        </>
      )}
    </div>
  );
};