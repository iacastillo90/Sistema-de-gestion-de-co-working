export function AdminHeader({ title, subtitle, icon }) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
      <div>
        <h2 className="section-title admin-header-title">
          <i className={`fas ${icon} section-icon`}></i>{title}
        </h2>
        <p className="text-muted mb-0">{subtitle}</p>
      </div>
    </div>
  );
}
