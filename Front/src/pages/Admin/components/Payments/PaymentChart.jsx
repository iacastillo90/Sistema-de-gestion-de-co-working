export function PaymentChart({ pctCompletado, pctPendiente }) {
  return (
    <div className="premium-card h-100">
      <div className="card-body p-4 d-flex flex-column justify-content-center">
        <div className="text-muted fw-bold mb-3"><i className="fas fa-chart-pie me-2"></i>Proporción de Recaudación</div>
        
        <div className="progress" style={{ height: '24px', borderRadius: '12px' }}>
          <div 
            className="progress-bar bg-success" 
            role="progressbar" 
            style={{ width: `${pctCompletado}%`, fontWeight: 'bold' }} 
            title={`Completado: ${pctCompletado}%`}
          >
            {pctCompletado > 10 ? `${pctCompletado}%` : ''}
          </div>
          <div 
            className="progress-bar bg-warning text-dark" 
            role="progressbar" 
            style={{ width: `${pctPendiente}%`, fontWeight: 'bold' }} 
            title={`Pendiente: ${pctPendiente}%`}
          >
            {pctPendiente > 10 ? `${pctPendiente}%` : ''}
          </div>
        </div>
        
        <div className="d-flex justify-content-between mt-2 small text-muted">
          <span><i className="fas fa-circle text-success me-1"></i>Cobrado</span>
          <span><i className="fas fa-circle text-warning me-1"></i>Por cobrar</span>
        </div>
      </div>
    </div>
  );
}
