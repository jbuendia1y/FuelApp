import { Link } from "react-router-dom";

export default function EnterprisesList({ data }: { data: any[] }) {
  return (
    <>
      {data.map((item: any) => (
        <div
          className="enterprises__item"
          key={"enterprise__item-" + item.name}
        >
          <img src={item.logo} alt={item.name} />
          <h3>{item.name}</h3>
          <Link className="enterprises__link" to={"/enterprises/" + item.id}>
            {item.name}
          </Link>
        </div>
      ))}
    </>
  );
}
