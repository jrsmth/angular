import { trigger, state, style, transition, animate } from "@angular/animations";

export const expandCollapse = trigger('expandCollapse', [
    state('collapsed', style({
      height: 0,
      paddingTop: 0,
      paddingBottom: 0,
      opacity: 0,
      overflow: 'hidden'
    })),

    transition('collapsed => expanded', [
      animate('300ms ease-out', style({
        height: '*',
        paddingTop: '*',
        paddingBottom: '*',
        backgroundColor: 'white'
      })),
      animate('1s', style({ opacity: 1 }))
    ]),

    transition('expanded => collapsed', [
      animate('300ms ease-in')
    ])
  ])