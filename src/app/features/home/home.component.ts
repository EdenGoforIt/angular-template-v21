import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="home-container">
      <div class="hero">
        <h1>Angular v21 Template</h1>
        <p class="tagline">
          Modern architecture with Signals, SignalStore, and Dynamic Forms
        </p>
      </div>

      <div class="features">
        <h2>Features</h2>
        <div class="feature-grid">
          <div class="feature-card">
            <div class="icon">🚀</div>
            <h3>Angular v21</h3>
            <p>Built with the latest Angular version featuring standalone components</p>
          </div>

          <div class="feature-card">
            <div class="icon">📡</div>
            <h3>Signals & SignalStore</h3>
            <p>Modern reactive state management using @ngrx/signals</p>
          </div>

          <div class="feature-card">
            <div class="icon">📝</div>
            <h3>Dynamic Forms</h3>
            <p>
              Flexible form generation with reactive forms and dynamic configuration
            </p>
          </div>

          <div class="feature-card">
            <div class="icon">📊</div>
            <h3>Dynamic Tables</h3>
            <p>Feature-rich tables with sorting, filtering, and pagination</p>
          </div>

          <div class="feature-card">
            <div class="icon">🎨</div>
            <h3>Modern UI</h3>
            <p>Clean, responsive design with modern CSS practices</p>
          </div>

          <div class="feature-card">
            <div class="icon">🔧</div>
            <h3>Developer Tools</h3>
            <p>ESLint, Prettier, and TypeScript for code quality</p>
          </div>
        </div>
      </div>

      <div class="quick-start">
        <h2>Quick Start</h2>
        <div class="example-links">
          <a routerLink="/reactive-forms" class="example-link">
            <div class="link-icon">📋</div>
            <div class="link-content">
              <h3>Reactive Forms</h3>
              <p>Explore reactive form components with signal-based validation</p>
            </div>
            <div class="link-arrow">→</div>
          </a>

          <a routerLink="/dynamic-forms" class="example-link">
            <div class="link-icon">⚙️</div>
            <div class="link-content">
              <h3>Dynamic Forms</h3>
              <p>See how to generate forms from configuration</p>
            </div>
            <div class="link-arrow">→</div>
          </a>

          <a routerLink="/table" class="example-link">
            <div class="link-icon">📊</div>
            <div class="link-content">
              <h3>Data Tables</h3>
              <p>Interactive tables with advanced features</p>
            </div>
            <div class="link-arrow">→</div>
          </a>
        </div>
      </div>

      <div class="architecture">
        <h2>Architecture</h2>
        <div class="architecture-content">
          <div class="architecture-item">
            <h4>📁 Folder Structure</h4>
            <ul>
              <li><code>core/</code> - Singleton services, guards, interceptors</li>
              <li><code>shared/</code> - Reusable components, models, pipes</li>
              <li><code>features/</code> - Feature modules and pages</li>
              <li><code>store/</code> - SignalStore state management</li>
            </ul>
          </div>

          <div class="architecture-item">
            <h4>🏗️ Tech Stack</h4>
            <ul>
              <li>Angular v21 with standalone components</li>
              <li>@ngrx/signals for state management</li>
              <li>Reactive Forms with custom controls</li>
              <li>TypeScript 5.9</li>
              <li>SCSS for styling</li>
            </ul>
          </div>

          <div class="architecture-item">
            <h4>✨ Form Components</h4>
            <ul>
              <li>Text Input (with email, password variants)</li>
              <li>Number Input</li>
              <li>Textarea</li>
              <li>Checkbox</li>
              <li>Radio Buttons</li>
              <li>Dynamic Form Generator</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .home-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
      }

      .hero {
        text-align: center;
        padding: 3rem 0;
        margin-bottom: 3rem;
      }

      h1 {
        font-size: 3rem;
        font-weight: 800;
        color: #1f2937;
        margin-bottom: 1rem;
      }

      .tagline {
        font-size: 1.25rem;
        color: #6b7280;
        max-width: 600px;
        margin: 0 auto;
      }

      h2 {
        font-size: 2rem;
        font-weight: 700;
        color: #1f2937;
        margin-bottom: 2rem;
      }

      .features {
        margin-bottom: 4rem;
      }

      .feature-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
      }

      .feature-card {
        background: white;
        padding: 2rem;
        border-radius: 0.5rem;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
        transition: transform 0.2s, box-shadow 0.2s;
      }

      .feature-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.15);
      }

      .icon {
        font-size: 3rem;
        margin-bottom: 1rem;
      }

      .feature-card h3 {
        font-size: 1.25rem;
        font-weight: 600;
        color: #1f2937;
        margin-bottom: 0.5rem;
      }

      .feature-card p {
        color: #6b7280;
        line-height: 1.6;
      }

      .quick-start {
        margin-bottom: 4rem;
      }

      .example-links {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .example-link {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        padding: 1.5rem;
        background: white;
        border-radius: 0.5rem;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
        text-decoration: none;
        transition: transform 0.2s, box-shadow 0.2s;
      }

      .example-link:hover {
        transform: translateX(8px);
        box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.15);
      }

      .link-icon {
        font-size: 2.5rem;
        flex-shrink: 0;
      }

      .link-content {
        flex: 1;
      }

      .link-content h3 {
        font-size: 1.25rem;
        font-weight: 600;
        color: #1f2937;
        margin-bottom: 0.25rem;
      }

      .link-content p {
        color: #6b7280;
        margin: 0;
      }

      .link-arrow {
        font-size: 1.5rem;
        color: #3b82f6;
        flex-shrink: 0;
      }

      .architecture {
        margin-bottom: 4rem;
      }

      .architecture-content {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
      }

      .architecture-item {
        background: white;
        padding: 2rem;
        border-radius: 0.5rem;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
      }

      .architecture-item h4 {
        font-size: 1.125rem;
        font-weight: 600;
        color: #1f2937;
        margin-bottom: 1rem;
      }

      .architecture-item ul {
        list-style-type: none;
        padding: 0;
      }

      .architecture-item li {
        padding: 0.5rem 0;
        color: #4b5563;
        line-height: 1.6;
      }

      code {
        background: #f3f4f6;
        padding: 0.125rem 0.375rem;
        border-radius: 0.25rem;
        font-family: 'Courier New', monospace;
        font-size: 0.875rem;
        color: #dc2626;
      }
    `,
  ],
})
export class HomeComponent {}
