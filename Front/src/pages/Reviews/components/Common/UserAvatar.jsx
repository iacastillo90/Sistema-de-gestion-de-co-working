export function UserAvatar({ name, userId }) {
  const initial = name ? name.charAt(0).toUpperCase() : (userId ? userId.slice(-2).toUpperCase() : '?');
  const hue = userId ? parseInt(userId.slice(-6), 16) % 360 : 200;
  return (
    <div style={{
      width: '40px', height: '40px', borderRadius: '50%',
      background: `hsl(${hue}, 45%, 55%)`,
      color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '0.85rem', fontWeight: 700, flexShrink: 0,
    }}>
      {initial}
    </div>
  );
}
