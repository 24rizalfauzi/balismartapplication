import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SharingSessionPage } from './sharing-session.page';

describe('SharingSessionPage', () => {
  let component: SharingSessionPage;
  let fixture: ComponentFixture<SharingSessionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharingSessionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SharingSessionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
