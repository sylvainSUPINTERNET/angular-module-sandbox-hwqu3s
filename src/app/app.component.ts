import {
  Component,
  ElementRef,
  HostListener,
  QueryList,
  ViewChildren,
} from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  //Panel
  @ViewChildren('panel') panels: QueryList<ElementRef>;
  currentPanel: string = 'panel1';

  // Menu
  @ViewChildren('section') sections: QueryList<ElementRef>;
  currentSection: string = 'section1';

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let el: ElementRef = this.panels.find((panel: ElementRef) => {
      return (
        panel.nativeElement.getBoundingClientRect().top >= 0 &&
        panel.nativeElement.getBoundingClientRect().top <=
          window.innerHeight / 2
      );
    });

    if (el) {
      this.currentPanel = el.nativeElement.id;

      let activeSection: ElementRef = this.sections.find(
        (section) =>
          section.nativeElement.id ===
          `section${this.currentPanel.split('panel')[1]}`
      );

      this.currentSection = activeSection.nativeElement.id;
      // console.log('Active link : ', this.currentSection);
      // console.log('Watching panel : ', this.currentPanel);
    }
  }

  scrollToSection(sectionId: string) {
    this.currentSection = sectionId;
    let panelId = `panel${sectionId.split('section')[1]}`;
    console.log('Scroll to : ', panelId);
    this.panels
      .find((section: ElementRef) => section.nativeElement.id === panelId)
      ?.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
