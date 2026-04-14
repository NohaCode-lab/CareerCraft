
const PageHeader = ({ title, description }) => {
  return (
    <div className="mb-6 flex flex-col gap-2">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        {title}
      </h1>

      {description ? (
        <p className="max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
};

export default PageHeader;