// JSX components with TypeScript.

interface ButtonProps {
  label: string;
  onPress(): void;
}

function Button(props: ButtonProps) {
  const { label } = props;
  return (
    <button className="btn" onClick={props.onPress}>
      {label}
    </button>
  );
}

export function Toolbar() {
  const handlePress = () => console.log("pressed");
  return (
    <div className="toolbar">
      <Button label="Save" onPress={handlePress} />
    </div>
  );
}
