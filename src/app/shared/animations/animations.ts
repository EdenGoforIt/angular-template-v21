import { animate, sequence, style, transition, trigger, keyframes, state } from '@angular/animations';

/**
 *  For every row added/modified in a table
 */
export const animateNewRows = trigger('animateNewRows', [
  transition(
    'void => *',
    [
      style({ height: '*', opacity: '0' }),
      sequence([
        animate('{{transition}}', style({ height: '*', opacity: '.2' })),
        animate('{{transition}}', style({ height: '*', opacity: 1 }))
      ])
    ],
    { params: { transition: '.30s ease' } }
  )
]);

export const wobbleButton = trigger('wobbleButton', [
  state('initial', style({})),
  state('final', style({})),
  transition(
    'initial <=> final',
    animate(
      '1000ms',
      keyframes([
        style({ transform: 'translateY(0) rotate(0)', offset: 0 }),
        style({ transform: 'translateY(-20px) rotate(-8deg)', offset: 0.15 }),
        style({ transform: 'translateY(10px) rotate(8deg)', offset: 0.3 }),
        style({ transform: 'translateY(-10px) rotate(-4.6deg)', offset: 0.45 }),
        style({ transform: 'translateY(5px) rotate(3.4deg)', offset: 0.6 }),
        style({ transform: 'translateY(-2px) rotate(-1.8deg)', offset: 0.75 }),
        style({ transform: 'translateY(0) rotate(0)', offset: 1.0 })
      ])
    )
  )
]);
