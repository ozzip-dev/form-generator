// type Props = {
//   label: string;
//   name: string;
//   required: boolean;
// };

// const label = ({ label, name, required }: Props) => (
//   <label
//     htmlFor={name}
//     className="pointer-events-none absolute left-2 top-0 z-10 -translate-y-1/2 bg-white px-2 text-sm text-font-light transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm peer-focus:text-accent"
//   >
//     {label}
//     {required && <span className="text-red ml-0.5">*</span>}
//   </label>
// );

// export default label;

type Props = {
  label: string;
  name: string;
  required: boolean;
};

const label = ({ label, name, required }: Props) => (
  <label htmlFor={name} className="peer-focus:text-accent">
    {label}
    {required && <span className="text-red ml-0.5">*</span>}
  </label>
);

export default label;
