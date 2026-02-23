# AI Rules & Project Guidelines

## Tech Stack
- **Vite**: Fast build tool and development server.
- **React 18 & TypeScript**: Core UI library with strict type safety.
- **Tailwind CSS**: Utility-first styling with HSL-based design tokens in `index.css`.
- **shadcn/ui**: Accessible UI components built on top of Radix UI primitives.
- **Lucide React**: Standard library for all iconography.
- **React Router DOM**: Client-side routing and navigation management.
- **TanStack Query**: Server state management and data fetching.
- **React Hook Form & Zod**: Type-safe form handling and schema-based validation.
- **jsPDF**: Client-side generation of catalogs and reports.
- **Sonner**: Modern toast notifications for user feedback.

## Library Usage Rules

### Styling & Design
- **Tailwind CSS**: Always use Tailwind classes for layout, spacing, and colors. Avoid writing raw CSS.
- **Colors**: Use the HSL variables defined in `src/index.css` (e.g., `bg-primary`, `text-foreground`, `border-border`).
- **Responsive Design**: Use Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`) for all components.

### Components
- **shadcn/ui**: Use existing components from `src/components/ui/`. Do not modify these files directly; wrap them or create new components in `src/components/` if customization is needed.
- **Icons**: Exclusively use `lucide-react`.

### Forms & Validation
- **Forms**: Use `react-hook-form` for all form state management.
- **Validation**: Define all form schemas using `zod` to ensure runtime and compile-time type safety.

### Navigation
- **Routing**: Keep all route definitions in `src/App.tsx`.
- **Links**: Use `Link` or `NavLink` from `react-router-dom` for internal navigation. Use `useNavigate` for programmatic redirects.

### Data Management
- **Server State**: Use `@tanstack/react-query` for fetching, caching, and updating server data.
- **PDF Generation**: Use `jspdf` for creating downloadable documents like the product catalog or trial reports.

### Notifications
- **Toasts**: Use `sonner` for simple success/error notifications. Use the shadcn `Toaster` for more complex, persistent alerts if necessary.