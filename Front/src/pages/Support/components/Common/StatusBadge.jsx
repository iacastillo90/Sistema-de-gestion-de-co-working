export function StatusBadge({ status }) {
  const map = {
    Open:        { cls: 'badge-estado badge-pendiente',   ico: 'fa-envelope-open', label: 'Abierto' },
    'In Review': { cls: 'badge-estado badge-confirmada',  ico: 'fa-search',        label: 'En Revisión' },
    Resolved:    { cls: 'badge-estado badge-cancelada',   ico: 'fa-check-circle',  label: 'Resuelto' },
  };
  const s = map[status] || map.Open;
  return <span className={s.cls}><i className={`fas ${s.ico}`}></i>{s.label}</span>;
}
