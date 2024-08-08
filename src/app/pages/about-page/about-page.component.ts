import { Component, OnInit } from '@angular/core';
import { LinkComponent } from '@app/shared/components/UI';
import { VIEWED_ABOUT_PAGE_STORAGE_KEY } from '@app/shared/constants';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [LinkComponent],
  templateUrl: './about-page.component.html',
  styleUrls: ['../pages-styles.scss', './about-page.component.scss'],
})
export class AboutPageComponent implements OnInit {
  ngOnInit(): void {
    sessionStorage.setItem(VIEWED_ABOUT_PAGE_STORAGE_KEY, 'true');
  }
}
