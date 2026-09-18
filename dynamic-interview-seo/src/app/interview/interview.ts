import { DOCUMENT } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Interview, InterviewService } from '../services/interview.service';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.html',
  styleUrl: './interview.css'
})
export class InterviewComponent implements OnInit {
  interview?: Interview;
  loading = true;
  notFound = false;

  private readonly route = inject(ActivatedRoute);
  private readonly interviewService = inject(InterviewService);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.loadInterview(params.get('id'));
    });
  }

  private loadInterview(id: string | null): void {
    this.loading = true;
    this.notFound = false;
    this.interview = undefined;
    this.resetSeo();

    if (!id) {
      this.loading = false;
      this.notFound = true;
      return;
    }

    this.interviewService.getInterview(id).subscribe({
      next: (data) => {
        this.loading = false;
        this.interview = data;
        this.notFound = !data;

        if (data) {
          this.updateSeo(data, id);
        }
      },
      error: () => {
        this.loading = false;
        this.notFound = true;
        this.resetSeo();
      }
    });
  }

  private resetSeo(): void {
    const defaultDescription = 'Explore dynamic interview opportunities and their required skills.';

    this.title.setTitle('Interview Atlas');
    this.meta.updateTag({ name: 'description', content: defaultDescription });
    this.meta.updateTag({ property: 'og:title', content: 'Interview Atlas' });
    this.meta.updateTag({ property: 'og:description', content: defaultDescription });
  }

  private updateSeo(data: Interview, id: string): void {
    const seoTitle = `${data.jobTitle} Interview | ${data.companyName}`;
    const description = `Take a ${data.jobTitle} interview at ${data.companyName} for ${data.experience} experience.`;

    this.title.setTitle(seoTitle);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: seoTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });

    let canonical = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.rel = 'canonical';
      this.document.head.appendChild(canonical);
    }
    canonical.href = `${this.document.location?.origin ?? ''}/interview/${id}`;
  }
}