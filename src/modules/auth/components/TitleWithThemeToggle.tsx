import ThemeSwitcher from '@/modules/ui/components/ThemeSwitcher';

type TitleWithThemeToggleProp = {
  title: string;
  showWellCome: boolean;
};

const TitleWithThemeToggle = ({
  title,
  showWellCome,
}: TitleWithThemeToggleProp) => {
  return (
    <>
      {/* Optional welcome heading */}
      {showWellCome && (
        <h1 className="mb-2 text-center text-xl font-semibold">Welcome</h1>
      )}
      <div className="flex items-center justify-between">
        <h5 className="text-xl font-semibold ">{title}</h5>
        <ThemeSwitcher />
      </div>
    </>
  );
};

export default TitleWithThemeToggle;
