export default function Modal({ titulo, sobre, onFechar, children }) {
  return (
    <div className="hk-fundo" onClick={e => e.target === e.currentTarget && onFechar()}>
      <div className="hk-modal" role="dialog" aria-modal="true" aria-label={titulo}>
        <div className="hk-modal-topo">
          <button className="hk-x" onClick={onFechar} aria-label="Fechar">×</button>
          {sobre && <p className="hk-sobre">{sobre}</p>}
          <h3>{titulo}</h3>
        </div>
        <div className="hk-modal-corpo">{children}</div>
      </div>
    </div>
  )
}
