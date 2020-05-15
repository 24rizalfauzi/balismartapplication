import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EbookPage } from './ebook.page';

describe('EbookPage', () => {
  let component: EbookPage;
  let fixture: ComponentFixture<EbookPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EbookPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EbookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
