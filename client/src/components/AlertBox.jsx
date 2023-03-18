export const alertMsg = (status, msg) => {
  return (
    <div
      className={`${
        status === "error"
          ? "bg-[red]"
          : status === "good"
          ? "bg-[green]"
          : null
      } flex justify-between items-center w-24 p-2`}
    >
      <p className="text-white text-base">{msg}</p>
      <span>x</span>
    </div>
  );
};
