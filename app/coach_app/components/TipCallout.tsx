import type { TheoryTip } from '~/coach_app/types';

type TipCalloutProps = {
  tip: TheoryTip;
};

export const TipCallout = ({ tip }: TipCalloutProps) => (
  <div className='coach-tip-callout'>
    <span className='coach-tip-callout__badge'>Совет</span>
    <p className='coach-tip-callout__text'>{tip.text}</p>
  </div>
);
