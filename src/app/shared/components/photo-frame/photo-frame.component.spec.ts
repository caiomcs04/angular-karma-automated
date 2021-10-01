import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { PhotoFrameComponent } from './photo-frame.component';
import { PhotoFrameModule } from './photo-frame.module';

describe(PhotoFrameComponent.name, () => {
  let component: PhotoFrameComponent;
  let fixture: ComponentFixture<PhotoFrameComponent> = null;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoFrameModule]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoFrameComponent);
    component = fixture.componentInstance;
  });


  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it(`#${PhotoFrameComponent.prototype.like.name} should trigger (@Output liked) once when called multiple times within debounce time`, fakeAsync(() => {
    fixture.detectChanges();
    let times = 0
    component.liked.subscribe(() => {
      times++
    });
    component.like();
    component.like();
    tick(200)
    expect(times).toBe(1);
  }))

  it(`#${PhotoFrameComponent.prototype.like.name} should trigger (@Output liked)
  two times when called aoutside debounce time`, fakeAsync(() => {
    fixture.detectChanges();
    let times = 0;
    component.liked.subscribe(() => {
      times++
    })
    component.like();
    tick(200);
    component.like();
    tick(200)
    expect(times).toBe(2)
  }))

  it(`Should display number of likes when (@Input likes) is incremented`, () => {
    fixture.detectChanges();
    component.likes++;
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement.querySelector('.like-counter')
    expect(element.textContent.trim()).toBe('1')
  })

  //O prefixo (D) será usado para sinalizar testes com DOM
  it(`(D) Should display image with src and description when bound to properties`, () => {
    const description = 'some description'
    const src = 'http://somesite.com/img.jpg'
    component.src = src;
    component.description = description;
    fixture.detectChanges();
    const img: HTMLImageElement = fixture.nativeElement.querySelector('img');
    expect(img.getAttribute('src')).toBe(src)
    expect(img.getAttribute('alt')).toBe(description)
  })
});
