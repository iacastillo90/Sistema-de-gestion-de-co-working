function EstadoBadge({ estado }) {
  const config = {
    Pendiente: { cls: 'badge-estado badge-cancelada', ico: 'fa-clock' },
    Completado: { cls: 'badge-estado badge-confirmada', ico: 'fa-check-double' },
  };
  const { cls, ico } = config[estado] || config.Pendiente;
  return (
    <span className={cls}>
      <i className={`fas ${ico}`}></i>{estado}
    </span>
  );
}

export default EstadoBadge;
