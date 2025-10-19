import ThemeSwitcher from '@/components/navbar/ThemeSwitcher';

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
        <h4 className="mb-2 text-center text-2xl font-semibold">Welcome</h4>
      )}

      {/* Title + theme toggle */}
      <div className="flex items-center justify-between">
        <h5 className="text-xl font-semibold mb-2">{title}</h5>
        <ThemeSwitcher />
      </div>
    </>
  );
};

export default TitleWithThemeToggle;
