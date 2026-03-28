export default function Container({ className = '', children }) {
  return <div className={`container section-spacing ${className}`}>{children}</div>
}
