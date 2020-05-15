import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ForumIdePage } from './forum-ide.page';

describe('ForumIdePage', () => {
  let component: ForumIdePage;
  let fixture: ComponentFixture<ForumIdePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForumIdePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ForumIdePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
