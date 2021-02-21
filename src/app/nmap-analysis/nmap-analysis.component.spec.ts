import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NmapAnalysisComponent } from './nmap-analysis.component';

describe('NmapAnalysisComponent', () => {
  let component: NmapAnalysisComponent;
  let fixture: ComponentFixture<NmapAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NmapAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NmapAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
