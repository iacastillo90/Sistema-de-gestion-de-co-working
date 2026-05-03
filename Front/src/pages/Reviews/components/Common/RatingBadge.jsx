export function RatingBadge({ n }) {
  const cls = n >= 4 ? 'badge-confirmada' : n >= 3 ? 'badge-pendiente' : 'badge-cancelada';
  return <span className={`badge-estado ${cls}`}><i className="fas fa-star"></i>{n}/5</span>;
}
