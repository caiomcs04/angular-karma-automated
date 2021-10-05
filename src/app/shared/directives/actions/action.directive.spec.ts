import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActionDirective } from "./actions.directive";
import { ActionsModule } from "./actions.module";

describe(ActionDirective.name, () => {
    let fixture: ComponentFixture<ActionDirectiveTestComponent>;
    let component: ActionDirectiveTestComponent;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ActionDirectiveTestComponent],
            imports: [ActionsModule]
        }).compileComponents();

        fixture = TestBed.createComponent(ActionDirectiveTestComponent)
        component = fixture.componentInstance;
    });

    it(`(D) (@Output appAction) Should emit event with playload when ENTER is pressed`, () => {
        const divEl: HTMLElement = fixture.nativeElement.querySelector('.dummy-component');
        const event = new KeyboardEvent('keyup', { key: 'Enter' })
        divEl.dispatchEvent(event)
        expect(component.hasEvent()).toBe(true)
    })

    it(`(D) (@Output appAction) Should emit event with playload when Clicked is pressed`, () => {
        const divEl: HTMLElement = fixture.nativeElement.querySelector('.dummy-component');
        const event = new Event('click')
        divEl.dispatchEvent(event)
        expect(component.hasEvent()).toBe(true)
    })
});


@Component({
    template: `<div (appAction)="actionHandler($event)" class="dummy-component" ></div>`
})
class ActionDirectiveTestComponent {
    event: Event = null
    public actionHandler(event: Event): void {
        this.event = event
    }

    hasEvent(): boolean {
        return !!this.event
    }
}