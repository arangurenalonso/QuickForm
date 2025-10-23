import ThemeSwitcher from '@/modules/ui/components/ThemeSwitcher';

type TitleWithThemeToggleProp = {
  title: string;
};

const TitleWithThemeToggle = ({ title }: TitleWithThemeToggleProp) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h5 className="text-xl font-semibold ">{title}</h5>
        <ThemeSwitcher />
      </div>
    </>
  );
};

export default TitleWithThemeToggle;
