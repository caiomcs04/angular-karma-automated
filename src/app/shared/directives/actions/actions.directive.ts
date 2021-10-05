import { Directive, EventEmitter, HostListener, Output } from "@angular/core";

@Directive({
    selector: '[appAction]'
})

export class ActionDirective {
    @Output() private appAction: EventEmitter<Event> = new EventEmitter

    @HostListener('click', ['$event'])
    handleClick(event: Event): void {
        this.appAction.emit(event)
    }

    @HostListener('keyup', ['$event'])
    handleKeyUp(event: KeyboardEvent): void {
        this.appAction.emit(event)

    }
}