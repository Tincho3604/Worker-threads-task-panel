import './filter.css'

interface FilterProps {
  value: '2' | '0' | '1';
  onChange: (value: '2' | '0' | '1') => void;
}

export const Filter = ({ value, onChange }: FilterProps) => {
  return (
    <select
      className="filter"
      value={value}
      onChange={(e) => onChange(e.target.value as '2' | '0' | '1')}
    >
      <option value="2">Todos</option>
      <option value="0">🟢 Activo</option>
      <option value="1">🟠 Inactivo</option>
    </select>
  );
}