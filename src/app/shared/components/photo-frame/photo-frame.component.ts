import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-photo-frame',
  templateUrl: './photo-frame.component.html',
  styleUrls: ['./photo-frame.component.scss']
})
export class PhotoFrameComponent implements OnInit, OnDestroy {
  @Output() liked: EventEmitter<void> = new EventEmitter();

  @Input() description: string = '';
  @Input() src: string = '';
  @Input() likes: number = 0;

  debounceSubject: Subject<void> = new Subject();
  unsubscribe: Subject<void> = new Subject();

  like(): void {
    this.debounceSubject.next()
  }

  constructor() { }

  ngOnInit(): void {
    //Subject feito para evitar multiplos cliques
    this.debounceSubject.asObservable()
      .pipe(debounceTime(200))
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.liked.emit()

      })
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
