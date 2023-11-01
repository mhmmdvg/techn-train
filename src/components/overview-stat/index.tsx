import { FC, useState } from 'react';

type IProps = {
  title: string;
  value: string;
};

const OverviewStat: FC<IProps> = ({ title, value }) => {
  const [colorChange, setColor] = useState(false);

  return (
    <div
      className="bg-white dark:bg-black/20 border border-muted/50 rounded-md w-36 md:w-[230px] text-secondary dark:text-white flex flex-col items-center space-y-4 p-8 transition-all dark:hover:text-accent hover:border-accent hover:text-accent hover:drop-shadow-lg hover:cursor-pointer"
      onMouseEnter={() => setColor(true)}
      onMouseLeave={() => setColor(false)}
    >
      <h3
        className={`font-semibold text-sm transition-all ${
          colorChange ? 'text-accent' : 'text-secondary/50 dark:text-white/50'
        }`}
      >
        {title}
      </h3>
      <p className="font-bold text-2xl">{value}</p>
    </div>
  );
};

export default OverviewStat;
