# Angular v21 Template

A modern Angular v21 template featuring signal-based state management, dynamic forms, and reusable components following best practices.

## Features

- **Angular v21** - Latest Angular version with standalone components
- **Signal-Based State Management** - Using @ngrx/signals for reactive state
- **Dynamic Forms** - Configuration-driven form generation
- **Reactive Forms** - Custom form components with full validation
- **Dynamic Tables** - Feature-rich tables with sorting, filtering, and pagination
- **Modern Architecture** - Clean folder structure following Angular best practices
- **BEM Naming Convention** - CSS following Block Element Modifier methodology
- **Code Quality Tools** - ESLint and Prettier pre-configured
- **TypeScript 5.9** - Latest TypeScript features
- **SCSS** - Enhanced styling capabilities

## Tech Stack

- **Framework**: Angular v21.0.0
- **State Management**: @ngrx/signals v21.0.1
- **Forms**: Angular Reactive Forms
- **Styling**: SCSS with BEM naming convention
- **Linting**: ESLint with Angular ESLint plugin
- **Formatting**: Prettier v3.7.4
- **Testing**: Vitest

## Project Structure

```
src/app/
├── core/                      # Singleton services, guards, interceptors
│   ├── guards/
│   ├── interceptors/
│   └── services/
├── shared/                    # Shared components, models, directives, pipes
│   ├── components/
│   │   ├── checkbox-input/   # Checkbox component
│   │   ├── dynamic-form/     # Dynamic form generator
│   │   ├── dynamic-table/    # Dynamic table component
│   │   ├── number-input/     # Number input component
│   │   ├── radio-input/      # Radio button component
│   │   ├── text-input/       # Text input component
│   │   └── textarea-input/   # Textarea component
│   ├── directives/
│   ├── pipes/
│   └── models/               # TypeScript interfaces and types
│       ├── form-field.model.ts
│       └── table.model.ts
├── features/                 # Feature modules and pages
│   ├── home/                # Home page
│   ├── reactive-forms-example/  # Reactive forms demo
│   ├── dynamic-forms-example/   # Dynamic forms demo
│   └── table-example/           # Table component demo
├── store/                    # SignalStore state management
│   ├── form.store.ts        # Form state store
│   └── table.store.ts       # Table state store
├── app.ts                   # Root component
├── app.html                 # Root template
├── app.scss                 # Root styles
└── app.routes.ts            # Application routing
```

## Getting Started

### Prerequisites

- Node.js v20.19.6 or higher
- npm 10.8.2 or higher

### Installation

```bash
cd angular-template
npm install
```

### Development Server

```bash
npm start
```

Navigate to `http://localhost:4200/`. The application will automatically reload when you change source files.

### Build

```bash
npm run build
```

Build artifacts will be stored in the `dist/` directory.

### Code Quality

#### Linting

```bash
npm run lint
npm run lint:fix  # Auto-fix issues
```

#### Formatting

```bash
npm run format        # Format all files
npm run format:check  # Check formatting
```

### Testing

```bash
npm test
```

## Components

### Form Components

All form components implement `ControlValueAccessor` and work seamlessly with Angular Reactive Forms:

#### Text Input
```typescript
<app-text-input
  id="username"
  label="Username"
  type="text"
  placeholder="Enter username"
  [required]="true"
  [errors]="errors"
  formControlName="username"
/>
```

#### Number Input
```typescript
<app-number-input
  id="age"
  label="Age"
  [min]="18"
  [max]="100"
  [required]="true"
  formControlName="age"
/>
```

#### Textarea Input
```typescript
<app-textarea-input
  id="description"
  label="Description"
  [rows]="5"
  formControlName="description"
/>
```

#### Checkbox Input
```typescript
<app-checkbox-input
  id="terms"
  label="I agree to terms"
  [required]="true"
  formControlName="terms"
/>
```

#### Radio Input
```typescript
<app-radio-input
  id="gender"
  name="gender"
  label="Gender"
  [options]="genderOptions"
  formControlName="gender"
/>
```

### Dynamic Form Component

Generate forms from configuration:

```typescript
const formConfig: FormFieldConfig[] = [
  {
    id: 'email',
    name: 'email',
    label: 'Email',
    type: 'email',
    validation: { required: true, email: true }
  },
  // ... more fields
];

<app-dynamic-form
  [fields]="formConfig"
  (formSubmit)="onSubmit($event)"
/>
```

### Dynamic Table Component

Feature-rich table with SignalStore:

```typescript
const tableConfig = {
  columns: [...],
  data: [...],
  pagination: { enabled: true, pageSize: 10 },
  sorting: { enabled: true },
  filtering: { enabled: true },
  selectable: true
};

tableStore.initializeTable(tableConfig);

<app-dynamic-table />
```

## State Management with SignalStore

### Form Store

```typescript
import { inject } from '@angular/core';
import { FormStore } from './store/form.store';

export class MyComponent {
  formStore = inject(FormStore);

  ngOnInit() {
    this.formStore.initializeForm(fields);
  }

  onFieldChange(fieldId: string, value: any) {
    this.formStore.updateFieldValue(fieldId, value);
  }
}
```

### Table Store

```typescript
import { inject } from '@angular/core';
import { TableStore } from './store/table.store';

export class MyComponent {
  tableStore = inject(TableStore);

  ngOnInit() {
    this.tableStore.initializeTable(config);
    this.tableStore.setData(data);
  }

  onSort(column: string) {
    this.tableStore.updateSorting(column);
  }
}
```

## BEM Naming Convention

This project follows BEM (Block Element Modifier) naming convention for CSS:

```scss
// Block
.form { }

// Element
.form__input { }
.form__button { }

// Modifier
.form__button--primary { }
.form__button--disabled { }
```

Example:
```html
<div class="form">
  <input class="form__input" />
  <button class="form__button form__button--primary">Submit</button>
</div>
```

## Examples

Visit these routes to see the components in action:

- `/` - Home page with features overview
- `/reactive-forms` - Reactive forms example
- `/dynamic-forms` - Dynamic form generation example
- `/table` - Dynamic table with all features

## Best Practices

### Component Development
- Use standalone components
- Implement signal-based state
- Follow single responsibility principle
- Use TypeScript strict mode
- Implement proper error handling

### State Management
- Use SignalStore for component-level state
- Keep stores focused and single-purpose
- Use computed signals for derived state
- Implement proper typing for all state

### Forms
- Use reactive forms over template-driven forms
- Implement custom validators when needed
- Provide clear error messages
- Use signal-based validation

### Styling
- Follow BEM naming convention
- Use SCSS features (nesting, variables, mixins)
- Keep styles scoped to components
- Use CSS custom properties for theming

## Contributing

1. Follow the existing code style
2. Run linting and formatting before committing
3. Write tests for new features
4. Update documentation as needed

## License

This project is licensed under the MIT License.
