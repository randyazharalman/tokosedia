import pluralize from 'pluralize';
interface FilterOption {
  id: string;
  name: string;
  count: number;
  checked: boolean;
}
type SelectionsFilterProps = {
  filterData: FilterOption[];
  filterName: string,
  onChange: (brandId: string) => void;
};

const FilterSelections = ({ filterData,filterName, onChange }: SelectionsFilterProps) => {
  return (
    <div className="pb-6">
      <h3 className="font-medium mb-4 capitalize">{pluralize(filterName)} </h3>
      <div className="space-y-2">
        {filterData.map((data) => (
          <div key={data.id} className="flex items-center">
            <input
              type="checkbox"
              id={`${filterName.toLowerCase()}-${data.id}`}
              checked={data.checked}
              onChange={() => onChange(data.id)}
              className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
            />
            <label
              htmlFor={`${filterName.toLowerCase()}-${data.id}`}
              className="ml-2 text-sm text-gray-700"
            >
              {data.name} <span className="text-gray-500">({data.count})</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterSelections;
