import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GangguanPage } from './gangguan.page';

describe('GangguanPage', () => {
  let component: GangguanPage;
  let fixture: ComponentFixture<GangguanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GangguanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GangguanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
