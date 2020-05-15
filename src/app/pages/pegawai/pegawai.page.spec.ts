import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PegawaiPage } from './pegawai.page';

describe('PegawaiPage', () => {
  let component: PegawaiPage;
  let fixture: ComponentFixture<PegawaiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PegawaiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PegawaiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
