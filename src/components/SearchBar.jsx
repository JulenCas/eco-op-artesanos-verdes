function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <label htmlFor="search-input">Buscar productos</label>
      <input
        id="search-input"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Ej. bambú, hogar..."
      />
    </div>
  );
}

export default SearchBar;
