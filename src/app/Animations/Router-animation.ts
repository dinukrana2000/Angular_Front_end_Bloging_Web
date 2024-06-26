import { trigger, transition, style, animate, query, group } from '@angular/animations';

export const fadeInOutAnimation = trigger('fadeInOutAnimation', [
  transition('* <=> *', [
    query(':enter, :leave', style({ position: 'absolute', width: '100%' }), { optional: true }),
    group([
      query(':enter', [
        style({ opacity: 0 }),
        animate('600ms ease-in-out', style({ opacity: 1 }))
      ], { optional: true }),
      query(':leave', [
        style({ opacity: 1 }),
        animate('600ms ease-in-out', style({ opacity: 1 }))
      ], { optional: true })
    ])
  ])
]);
