type NutritionRowProps = {
  calories: number;
};

export const NutritionRow = ({ calories }: NutritionRowProps) => {
  const protein = Math.round(calories * 0.04);
  const fat = Math.round(calories * 0.03);
  const carbs = Math.round(calories * 0.12);

  return (
    <div className='cantata-nutrow'>
      <div className='cantata-nutcell'>
        <span className='cantata-nutval'>{calories}</span>
        <span className='cantata-nutlbl'>ккал</span>
      </div>
      <div className='cantata-nutcell'>
        <span className='cantata-nutval'>{protein} г</span>
        <span className='cantata-nutlbl'>белки</span>
      </div>
      <div className='cantata-nutcell'>
        <span className='cantata-nutval'>{fat} г</span>
        <span className='cantata-nutlbl'>жиры</span>
      </div>
      <div className='cantata-nutcell'>
        <span className='cantata-nutval'>{carbs} г</span>
        <span className='cantata-nutlbl'>углев.</span>
      </div>
    </div>
  );
};
