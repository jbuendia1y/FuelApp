import useVehicles from "../hooks/useVehicles";

export default function VehiclesList() {
  const { vehicles } = useVehicles();

  return (
    <>
      <div className="vehicles__list" role={"list"}>
        {vehicles?.map((item) => {
          return (
            <div className="vehicles__item" role={"listitem"} key={item.id}>
              <img className="vehicles__image" alt="vehículo" />
              <div className="vehicles__text">
                <h2>{item.placa}</h2>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
