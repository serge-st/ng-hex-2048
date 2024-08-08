import { Component } from '@angular/core';
import { LinkComponent } from '@app/shared/components/UI/link/link.component';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [LinkComponent],
  templateUrl: './about-page.component.html',
  styleUrls: ['../pages-styles.scss', './about-page.component.scss'],
})
export class AboutPageComponent {}
