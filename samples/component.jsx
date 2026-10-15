// JSX components in plain JavaScript.

function Badge(props) {
  const text = props.count > 99 ? "99+" : String(props.count);
  return <span className="badge">{text}</span>;
}

export function Header({ title, count }) {
  return (
    <header>
      <h1>{title}</h1>
      <Badge count={count} />
    </header>
  );
}
