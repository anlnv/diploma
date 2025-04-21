import { useParams } from 'react-router-dom';
import './component.css';

const Component = ({ components }) => {
  const { id } = useParams();
  const component = components.find(item => item.id === parseInt(id));
  
  if (!component) return <div className="not-found">Компонент не найден</div>;

  const { 
    name,
    class: cls,
    group,
    subgroup,
    tuNumber,
    reliability
  } = component;

  return (
    <div className="card-container">
      <h2 className="title">{name}</h2>
      
      <div className="section">
        <h3 className="section-title">Классификация</h3>
        <ul className="data-list">
          <li className="data-item">
            <span className="label">Класс:</span>
            <span className="value">{cls}</span>
          </li>
          <li className="data-item">
            <span className="label">Группа:</span>
            <span className="value">{group}</span>
          </li>
          <li className="data-item">
            <span className="label">Подгруппа:</span>
            <span className="value">{subgroup}</span>
          </li>
          <li className="data-item tu-number">
            <span className="label">Номер ТУ:</span>
            <span className="value">{tuNumber}</span>
          </li>
        </ul>
      </div>

      <div className="section">
        <h3 className="section-title">Характеристики надежности</h3>
        <ul className="data-list">
          <li className="data-item">
            <span className="label">λ бсг:</span>
            <span className="value">{reliability.lambdaBSG}</span>
          </li>
          <li className="data-item">
            <span className="label">λ бсх:</span>
            <span className="value">{reliability.lambdaBSH}</span>
          </li>
          <li className="data-item">
            <span className="label">Ea:</span>
            <span className="value">{reliability.Ea}</span>
          </li>
          <li className="data-item">
            <span className="label">Трз:</span>
            <span className="value">{reliability.Trz}</span>
          </li>
          <li className="data-item">
            <span className="label">Тсх:</span>
            <span className="value">{reliability.Tsx}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Component;