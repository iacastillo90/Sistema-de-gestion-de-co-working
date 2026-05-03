function TicketStatusBadge({ status }) {
  const config = {
    'Open': { cls: 'badge-estado badge-open', ico: 'fa-envelope-open' },
    'In Review': { cls: 'badge-estado badge-in-review', ico: 'fa-search' },
    'Resolved': { cls: 'badge-estado badge-resolved', ico: 'fa-check-circle' },
  };
  const { cls, ico } = config[status] || config['Open'];
  return (
    <span className={cls}>
      <i className={`fas ${ico}`}></i>{status}
    </span>
  );
}

export default TicketStatusBadge;
