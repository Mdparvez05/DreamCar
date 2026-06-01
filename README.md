# DreamCar - Car Discovery Platform

## Project Overview

DreamCar is a car discovery and comparison platform inspired by websites such as CarDekho and CarWale.

The application allows users to:

* Browse car brands, models, and variants
* Search cars using filters such as fuel type, body type, seating capacity, category, and price
* View specifications including mileage, horsepower, transmission, fuel type, top speed, safety rating, and pricing
* Read user reviews and ratings
* Explore available colors and features for each vehicle

The goal was to build a scalable backend architecture and a responsive frontend that demonstrates real-world product design and API development practices.

---

## What Did I Build and Why?

I built a full-stack car discovery application consisting of:

### Backend

* ASP.NET Core Web API
* Entity Framework Core
* SQL Server / SQLite
* Layered architecture using Controllers, Services, DTOs, and Data Models

### Frontend

* React
* Responsive UI
* API integration with backend services

The focus was on creating a maintainable and extensible architecture that can support future features such as car comparison, wishlists, user authentication, and advanced search.

### What I Deliberately Cut

Due to time constraints, I intentionally excluded:

* AI Enabled search . Text to query conversion.
* Shortlist - Car comparison feature
* Favorites / wishlist functionality
* Email shortlisted cars with cc as sales team
* Advanced caching
* Search indexing
* Image upload management
* Payment or booking workflows

The priority was delivering a working end-to-end product with clean architecture and searchable vehicle data.

---

## Tech Stack and Why I Chose It

### Frontend

* ReactJS

Reason:
React provides component-based architecture, fast development, and a strong ecosystem.

### Backend

* ASP.NET Core Web API
* Entity Framework Core

Reason:
I have professional experience working with .NET technologies and wanted a strongly typed, scalable backend framework.

### Database

* SQLite

Reason:
Relational databases fit the application's structured data model involving Brands, Models, Variants, Specifications, Reviews, Features, and Categories.

### Hosting

* Azure App Service
* Static frontend deployment

Reason:
Azure integrates naturally with .NET applications and simplifies deployment.

---

## AI Usage

### What I Delegated to AI

I used AI tools for:

* Initial database schema brainstorming
* Sample data generation
* API contract validation
* Entity relationship suggestions
* README drafting
* Debugging support
* Code review assistance

### What I Implemented Manually

* Overall application architecture
* Database design decisions
* Service layer implementation
* API endpoints
* Entity relationships
* Search filtering logic
* Frontend integration
* Deployment setup
* Testing and debugging

### Where AI Helped Most

AI significantly accelerated:

* Boilerplate generation
* SQL seed data creation
* Entity Framework model creation
* Documentation writing
* Error diagnosis

### Where AI Got in the Way

Some generated code:

* Included unnecessary abstractions
* Produced inefficient queries
* Required manual refactoring
* Occasionally misunderstood business requirements

Careful review and validation were necessary before adopting AI-generated suggestions.

---

## If I Had Another 4 Hours

I would add:

1. Car Comparison Module

   * Compare specifications side-by-side

2. Authentication

   * Login and registration

3. Wishlist

   * Save favorite vehicles

4. Advanced Filtering

   * Multiple category selection
   * Feature-based filtering

5. Dashboard Analytics

   * Most viewed vehicles
   * Popular brands

6. Improved UI

   * Skeleton loaders
   * Better mobile responsiveness
   * Enhanced accessibility

7. Automated Testing

   * Unit tests
   * Integration tests

---

## Run Instructions

### Backend

```bash
dotnet restore
dotnet ef database update
dotnet run
```

Backend runs on:

```text
https://localhost:5001
```

### Frontend

```bash
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

### Environment

Update the database connection string in:

```text
appsettings.json
```

before running the application.

---

## Repository

GitHub Repository:
<https://github.com/Mdparvez05/DreamCar>

## Live Application

Live URL:
[<ADD_DEPLOYMENT_URL>](https://dreamcar.azurewebsites.net/)

## Screen Recording

Recording URL:
<[ADD_RECORDING_URL](https://www.loom.com/share/cb16d41ccfea4cddaeef502dc84f35d7)>
