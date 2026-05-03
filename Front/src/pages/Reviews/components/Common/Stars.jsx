export function Stars({ n, size = '1rem' }) {
  return (
    <div style={{ fontSize: size, letterSpacing: '1px' }}>
      {Array.from({ length: 5 }, (_, i) => (
        <i key={i} className={`fas fa-star ${i < n ? 'star-filled' : 'star-empty'}`}></i>
      ))}
    </div>
  );
}
