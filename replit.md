# Overview

This is a PUBG-style name generator web application that allows users to create stylized gaming names using Unicode character transformations. The application features a dark gaming-themed interface with vibrant accent colors and provides both real-time text conversion and a curated collection of pre-made stylish names with symbols and special characters. Users can copy names to clipboard, search and filter by categories, and manage favorites.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite for build tooling
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: React hooks with TanStack React Query for server state
- **Routing**: Wouter for lightweight client-side routing

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **API Design**: RESTful API endpoints for favorites and history management
- **Data Persistence**: In-memory storage (MemStorage) for development simplicity
- **Development Server**: Custom Vite integration for hot module replacement

## Design System
- **Theme**: Dark gaming aesthetic with cyberpunk-inspired colors
- **Color Palette**: Cyan primary (#00BFFF), lime secondary (#84FF00), purple accent (#BF00FF)
- **Typography**: Orbitron display font for headers, Inter for body text
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts

## Core Features
- **Unicode Text Transformation**: Real-time conversion of regular text to stylized Unicode characters using mathematical alphanumeric symbols
- **Pre-made Name Collection**: Curated database of 100+ PUBG-style names with categories (cool, aggressive, royal, symbols, legendary)
- **Clipboard Integration**: One-click copying with visual feedback using native Clipboard API
- **Search and Filtering**: Real-time search with category-based filtering system
- **Favorites System**: User preference storage for quick access to liked names

## Data Architecture
- **Schema Definition**: Shared TypeScript types using Drizzle ORM for type safety
- **Storage Interface**: Abstract storage layer supporting both in-memory and database implementations
- **Data Categories**: Organized name collections with tags and metadata for enhanced searchability

# External Dependencies

## Frontend Dependencies
- **React Ecosystem**: React 18, React DOM, TanStack React Query for data fetching
- **UI Framework**: Radix UI primitives for accessibility, Tailwind CSS for styling
- **Utility Libraries**: Class Variance Authority for component variants, clsx for conditional classes
- **Development Tools**: Vite for bundling, TypeScript for type safety

## Backend Dependencies
- **Web Framework**: Express.js for HTTP server and routing
- **Database**: Neon PostgreSQL with Drizzle ORM for schema management
- **Session Management**: Connect-pg-simple for PostgreSQL session storage
- **Validation**: Zod for runtime type validation and schema parsing

## Development Tools
- **Build System**: Vite with custom plugins for Replit integration
- **Code Quality**: TypeScript compiler for static analysis
- **Fonts**: Google Fonts integration for Orbitron and Inter typography
- **Runtime**: Node.js with ES modules support