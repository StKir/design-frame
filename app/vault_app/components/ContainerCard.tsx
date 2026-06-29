import { RoleBadge } from '~/vault_app/components/RoleBadge';
import type { Container } from '~/vault_app/types';

type ContainerCardProps = {
  container: Container;
};

export const ContainerCard = ({ container }: ContainerCardProps) => (
  <div className='vault-card p-4'>
    <h3 className='text-[17px] font-medium vault-text'>{container.name}</h3>
    <p className='mt-1.5 line-clamp-2 text-[14px] leading-snug vault-text-muted'>
      {container.description}
    </p>
    <div className='mt-4 grid grid-cols-3 gap-3'>
      <div>
        <div className='vault-micro-label'>Источники</div>
        <div className='mt-1 text-[15px] font-medium vault-tabular vault-text-blue'>
          {container.sourcesCount}
        </div>
      </div>
      <div>
        <div className='vault-micro-label'>Создан</div>
        <div className='mt-1 text-[15px] font-medium vault-tabular vault-text'>{container.createdAt}</div>
      </div>
      <div>
        <div className='vault-micro-label'>Роль</div>
        <div className='mt-1'>
          <RoleBadge role={container.role} />
        </div>
      </div>
    </div>
  </div>
);
