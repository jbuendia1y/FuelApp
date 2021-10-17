export default function SupervisoresList(props: { supervisores: any[] }) {
  return (
    <div>
      <ul>
        {props.supervisores.map((item) => (
          <li>{item.uid}</li>
        ))}
      </ul>
    </div>
  );
}
