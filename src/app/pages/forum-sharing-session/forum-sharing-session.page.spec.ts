import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ForumSharingSessionPage } from './forum-sharing-session.page';

describe('ForumSharingSessionPage', () => {
  let component: ForumSharingSessionPage;
  let fixture: ComponentFixture<ForumSharingSessionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForumSharingSessionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ForumSharingSessionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
