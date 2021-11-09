export default function SupervisoresList(props: { supervisores: any[] }) {
  return (
    <div>
      <ul>
        {props.supervisores.map((item) => (
          <li key={`supervisor-uid-${item.uid}`}>{item.uid}</li>
        ))}
      </ul>
    </div>
  );
}
