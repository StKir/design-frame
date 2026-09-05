declare module 'potrace' {
  type TurnPolicy =
    | 'minority'
    | 'majority'
    | 'black'
    | 'white'
    | 'left'
    | 'right';

  type TraceOptions = {
    color?: string;
    background?: string;
    threshold?: number;
    turdSize?: number;
    optTolerance?: number;
    alphamax?: number;
    optCurve?: boolean;
    turnPolicy?: TurnPolicy | number;
    blackOnWhite?: boolean;
  };

  const potrace: {
    trace: (
      source: Buffer | string,
      options: TraceOptions,
      callback: (err: Error | null, svg: string) => void,
    ) => void;
    Potrace: {
      TURNPOLICY_BLACK: number;
      TURNPOLICY_WHITE: number;
      TURNPOLICY_LEFT: number;
      TURNPOLICY_RIGHT: number;
      TURNPOLICY_MINORITY: number;
      TURNPOLICY_MAJORITY: number;
    };
  };

  export default potrace;
}
