import { FormInput } from "@/components/Form";
import useEnterprises from "@/hooks/useEnterprises";

export default function SearchCompany() {
  const { enterprises } = useEnterprises();

  return (
    <>
      {enterprises && (
        <>
          <div className="enterprises__search">
            <FormInput
              type="text"
              name="enterprise"
              id="enterprise"
              placeholder="En cuál empresa trabaja ?"
            />
          </div>
          <div className="enterprises-grid">
            {enterprises.map((item) => {
              const data = item.data();
              return (
                <div
                  className="enterprises__item"
                  key={"enterprise__item-" + data.name}
                >
                  <img src={data.logo} alt={data.name} />
                  <h3>{data.name}</h3>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
