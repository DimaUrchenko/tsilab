const About = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">О нас</h1>
      <p className="text-xl text-gray-600 mb-4">
        Это приложение создано с использованием:
      </p>
      <ul className="text-gray-600 space-y-2">
        <li>React</li>
        <li>Vite (быстрая сборка)</li>
        <li>React Router (навигация)</li>
        <li>TypeScript (типизация)</li>
        <li>Tailwind CSS (стилизация)</li>
      </ul>
    </div>
  )
}

export default About