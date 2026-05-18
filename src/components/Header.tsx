import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={{ 
      backgroundColor: '#333', 
      padding: '12px 20px',
      color: 'white'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '20px', fontWeight: 'bold' }}>
          Моё приложение
        </Link>
        
        <div style={{ display: 'flex', gap: '20px' }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Главная</Link>
          <Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>О нас</Link>
          <Link to="/contact" style={{ color: 'white', textDecoration: 'none' }}>Контакты</Link>
          <Link to="/demo" style={{ color: 'white', textDecoration: 'none' }}>Компоненты</Link>
          <Link to="/todo" style={{ color: 'white', textDecoration: 'none' }}>Список</Link>
          <Link to="/server" className="hover:text-blue-200 transition">Сервер</Link>
          <Link to="/auth" className="hover:text-blue-200 transition">Вход</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;