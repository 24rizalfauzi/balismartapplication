import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IdePage } from './ide.page';

describe('IdePage', () => {
  let component: IdePage;
  let fixture: ComponentFixture<IdePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IdePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
