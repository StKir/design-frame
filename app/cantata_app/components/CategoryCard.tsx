import type { CategoryGridItem } from '~/cantata_app/types';

type CategoryCardProps = {
  category: CategoryGridItem;
  onSelect: (id: CategoryGridItem['id']) => void;
};

export const CategoryCard = ({ category, onSelect }: CategoryCardProps) => (
  <button type='button' onClick={() => onSelect(category.id)} className='cantata-catcard'>
    {category.image && (
      <img src={category.image} alt='' className='cantata-catcard__img' />
    )}
    <div className='cantata-catcard__content'>
      <span className='text-[22px]' style={{ color: 'var(--cinnamon)' }}>
        {category.icon}
      </span>
      <span className='cantata-catcard__label'>{category.label}</span>
    </div>
    <div className='cantata-catcard__count'>{category.count} напитков</div>
  </button>
);
