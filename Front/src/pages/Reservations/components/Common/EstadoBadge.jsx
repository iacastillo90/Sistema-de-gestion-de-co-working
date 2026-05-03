function EstadoBadge({ estado }) {
  const cls = {
    Confirmada: 'badge-estado badge-confirmada',
    Cancelada:  'badge-estado badge-cancelada',
    Pendiente:  'badge-estado badge-pendiente',
  };
  const ico = {
    Confirmada: 'fa-check-circle',
    Cancelada:  'fa-times-circle',
    Pendiente:  'fa-clock',
  };
  return (
    <span className={cls[estado] ?? 'badge-estado badge-cancelada'}>
      <i className={`fas ${ico[estado] ?? 'fa-circle'}`}></i>
      {estado}
    </span>
  );
}

export default EstadoBadge;
