import { animate, animation, keyframes, state, style, transition, trigger, useAnimation } from '@angular/animations';

export let fadeInAnimation = animation([
    style({ opacity: 0, backgroundColor: 'lightgreen' }),
    animate('{{ duration }} {{ easing }}')
], {
    params: {
        duration: '2s',
        easing: 'ease-out'
    }
})

export let fadeOutAnimation = animation([
    style({ opacity: 1 }),
    animate(500)
])

export let fade = trigger('fade', [
    // state('void', style({ opacity: 0 })),
    
    // fade in
    transition(":enter", [
    //   animate(1000) 
    useAnimation(fadeInAnimation)
    ]),
    // fade out
    transition(":leave", [
    //   animate(500) 
    useAnimation(fadeOutAnimation)
    ])
]);

export let bounceOutLeftAnimation = animation(
    animate('0.5s ease-out', keyframes([
        style({
            offset: .2,
            opacity: 1,
            transform: 'translateX(20px)'
        }),
        style({
            offset: 1,
            opacity: 0,
            transform: 'translateX(-100%)'
        })
    ]))
);

export let slide = trigger('slide', [
    state('void', style({ transform: 'translateX(-10px)' })),
    
    // slide in
    transition(":enter", [
        style({ backgroundColor: 'lightgreen' }),
        animate("500ms cubic-bezier(.88,.34,.13,.7)")
    ]),
    // slide out
    // transition(":leave", [
    //     style({ backgroundColor: 'crimson', color: 'crimson' }),
    //     animate("1000ms 100ms cubic-bezier(.88,.34,.13,.7)")
    // ])
    transition(":leave",
        useAnimation(bounceOutLeftAnimation)
    )
]);

export let bounceInLeft = trigger('bounceInLeft', [
    transition(':enter', [
        animate('0.5s ease-out', keyframes([
            style({
                offset: .2,
                opacity: 0,
                transform: 'translateX(-100%)'
            }),
            style({
                offset: 0.8,
                opacity: 1,
                transform: 'translateX(20px)'
            })
        ]))
    ])
]);