const Checkbox = ({
  name,
  id,
  value,
  checked,
  onChangeHandler,
}: {
  name: string;
  id: string;
  value: string;
  checked: boolean;
  onChangeHandler: (value: string, checked: boolean) => void;
}) => {
  return (
    <input
      type="checkbox"
      name={name}
      id={id}
      value={value}
      checked={checked}
      multiple
      onChange={(e) => onChangeHandler(value, e.target.checked)}
      className="h-[15px] w-[17px] focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
    />
  );
};
export default Checkbox;
