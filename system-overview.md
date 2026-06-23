# Portfolio CMS System

## System Overview & Technical Design Document

Version: 1.0

---

# 1. Project Overview

## Purpose

The Portfolio CMS is a personal software engineering portfolio platform combined with a lightweight content management system.

The platform serves two primary purposes:

1. Showcase professional work, projects, services, blogs, and technical expertise.
2. Provide an internal admin portal for managing all portfolio content without modifying code.

The platform should feel like a premium software product rather than a traditional resume website.

---

# 2. Design Philosophy

## Theme

Developer Command Center

A modern software engineering portfolio inspired by SaaS dashboards and developer tools.

The design should communicate:

* Technical expertise
* Professionalism
* Product thinking
* System architecture mindset

Avoid:

* Space themes
* Galaxy themes
* Overly futuristic cyberpunk designs
* Excessive animations

---

## Visual Identity

### Color Palette

Background:

* #050816
* #0A0F1F

Surface:

* #111827

Primary:

* #3B82F6

Secondary:

* #06B6D4

Text:

* #F8FAFC

Muted:

* #94A3B8

---

## Typography

Primary:

* Inter
* Geist

Technical:

* JetBrains Mono

---

## UI Principles

* Clean
* Minimal
* Content-focused
* Large typography
* Comfortable spacing
* Glassmorphism accents
* Smooth transitions

---

# 3. Platform Architecture

The application consists of two systems.

## Public Website

Accessible by visitors.

Purpose:

* Portfolio
* Blogs
* Services
* Contact
* AI Assistant

---

## Admin Portal

Accessible only by authenticated administrator.

Purpose:

* Content management
* Portfolio management
* Blog management
* Media management

---

# 4. Public Website Structure

## Home

Purpose:

Landing page introducing the software engineer and highlighting portfolio content.

Sections:

* Hero
* About Preview
* Featured Projects
* Services
* Technology Stack
* Testimonials
* Latest Blogs
* Contact CTA

---

## About

Purpose:

Professional profile.

Sections:

### Introduction

Contains:

* Profile image
* Name
* Role
* Location
* Languages
* Social links
* Professional summary

---

### Core Strengths

Examples:

* Full Stack Development
* System Architecture
* API Engineering
* Cloud Deployment
* Database Design

---

### Experience Timeline

Chronological career history.

---

### Skills Overview

Grouped by:

* Frontend
* Backend
* Database
* Cloud
* DevOps
* AI

---

### Certifications

Displays certifications.

Fields:

* Title
* Issuer
* Date
* Credential URL

---

### Technology Radar

Interactive technology visualization.

Purpose:

Visual representation of technical expertise.

---

### Behind The Screens

Photo gallery showing development process.

Examples:

* Architecture diagrams
* Wireframes
* Planning boards
* Development screenshots
* Deployment process
* Project milestones

---

## Projects

Purpose:

Showcase completed systems and software solutions.

---

### Project Listing

Card-based layout.

Each card contains:

* Cover image
* Title
* Short description
* Technology tags
* View Project button

---

### Project Details

Each project contains:

#### Hero

* Title
* Cover image
* Technology badges
* GitHub URL
* Live Demo URL

---

#### Overview

Answers:

* What is the system?
* What problem does it solve?
* What was the outcome?

---

#### Key Features

Feature breakdown.

---

#### Technology Used

Technology stack grouped by category.

---

#### Challenges & Learnings

Technical challenges encountered and lessons learned.

---

#### Outcome

Results and achievements.

---

#### Gallery

Project screenshots.

---

## Services

Displays services offered.

Examples:

* Web Development
* Mobile Development
* Backend Development
* CMS Development
* Cloud Solutions
* AI Integration

---

## Blogs

Purpose:

Publish technical content.

Features:

* Search
* Categories
* Tags
* Featured articles

---

## Contact

Contact form.

Fields:

* Name
* Email
* Subject
* Message

Stored as inquiries.

---

# 5. Navigation System

## Top Navigation

Floating centered navigation.

Pages:

* Home
* About
* Projects
* Services
* Blogs
* Contact

Additional controls:

* Theme toggle
* Mobile menu

---

## Section Navigation

Desktop only.

Visible on long pages such as About.

Position:

Left side.

Behavior:

* Sticky
* Smooth scrolling
* Active section indicator

Example:

Introduction
Core Strengths
Experience
Skills
Certifications
Technology Radar
Behind The Screens

Hidden on mobile devices.

---

# 6. Theme System

Default Theme:

Dark Mode

Theme Switcher:

Dark ↔ Light

Requirements:

* Persist preference in localStorage
* Apply only to public website
* Admin portal may remain dark-only

---

# 7. AI Chatbot

Location:

Bottom-right floating widget.

Purpose:

Portfolio assistant.

Capabilities:

* Explain projects
* Explain services
* Answer portfolio questions
* Guide visitors through website

Restrictions:

* No admin access
* No database administration
* No sensitive information exposure

---

# 8. Admin Portal

## Authentication

Single administrator account initially.

Requirements:

* Secure login
* Protected routes
* Session-based authentication

---

## Dashboard

Metrics:

* Total Projects
* Total Blogs
* Total Inquiries
* Total Testimonials

Recent Activity panel.

---

# 9. Content Management Modules

## Projects

CRUD functionality.

Fields:

* Title
* Slug
* Cover Image
* Gallery Images
* Short Description
* Overview
* Outcome
* Key Features
* Technology Used
* Challenges & Learnings
* GitHub URL
* Live URL
* Published Status

---

## Blogs

CRUD functionality.

Fields:

* Title
* Slug
* Cover Image
* Content
* Categories
* Tags
* SEO Metadata
* Published Status

---

## Inquiry

Manage contact submissions.

Actions:

* View
* Search
* Mark Read
* Archive

---

## Calendar

Manage:

* Events
* Reminders
* Content schedules

---

## Behind The Screens

Manage gallery content.

Fields:

* Image
* Caption
* Category
* Display Order

---

## Testimonials

CRUD functionality.

Fields:

* Name
* Position
* Company
* Feedback
* Avatar

---

## Contacts

Manage:

* Email
* Phone
* Location
* Social Media Links

---

## Settings

Manage:

* Website Settings
* SEO Settings
* Theme Settings
* General Configuration

---

# 10. Media Management

Storage Provider:

Cloudinary

Used For:

* Project images
* Blog images
* Profile images
* Behind The Screens images
* Testimonial avatars

Database stores only:

* image_url
* public_id

No binary files stored in database.

---

# 11. Database Architecture

Database:

Neon PostgreSQL

ORM:

Prisma

Core Tables:

users

projects

project_images

blogs

blog_categories

blog_tags

blog_category_relations

blog_tag_relations

testimonials

inquiries

contacts

events

behind_the_screens

settings

sessions

accounts

verification_tokens

---

# 12. Performance Strategy

Goal:

Remain comfortably within Render and Neon free-tier limits.

---

## Rendering Strategy

Static Generation whenever possible.

Use:

* SSG
* ISR
* Server Components

Avoid:

* Excessive SSR

---

## Database Strategy

* Proper indexing
* Pagination
* Optimized queries
* Minimal joins
* Cached reads

---

## Media Strategy

Use Cloudinary CDN.

Benefits:

* Offloads storage
* Reduces bandwidth usage
* Optimized image delivery

---

## Network Strategy

Avoid:

* Polling
* WebSockets
* Unnecessary API requests

Prefer:

* Server Actions
* Cached fetches

---

# 13. Technology Stack

Frontend

* Next.js 16.2
* React
* TypeScript
* Tailwind CSS
* Shadcn UI
* Framer Motion

Backend

* Next.js Route Handlers
* Next.js Server Actions

Database

* Neon PostgreSQL

ORM

* Prisma

Authentication

* Auth.js

Storage

* Cloudinary

Deployment

* Render

---

# 14. Security Requirements

* Protected admin routes
* Secure authentication
* CSRF protection
* Input validation
* Rate limiting
* Sanitized user content
* Secure environment variables

---

# 15. Future Enhancements

Potential future modules:

* Analytics Dashboard
* Newsletter System
* Resume Builder
* Public Project Search
* AI-powered Blog Assistant
* Visitor Tracking
* Project Case Studies
* Multi-user Admin Support

---

# 16. Success Criteria

The platform is successful when:

* Portfolio content is fully manageable from the admin portal.
* Visitors can easily explore projects and technical expertise.
* The website performs well on mobile and desktop.
* Images are efficiently delivered through Cloudinary.
* The application remains within Neon and Render free-tier limits.
* The platform is maintainable, scalable, and production-ready.
