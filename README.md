# Delve Compliance Checker

A modern, full-stack application built with Next.js 14 to monitor and manage Supabase configuration compliance. This tool helps ensure your Supabase instance follows security best practices by checking Multi-Factor Authentication (MFA), Row Level Security (RLS), and Point in Time Recovery (PITR) configurations.

## Features

- 🔒 **Security Compliance Checks**
  - MFA status monitoring for all users
  - RLS configuration verification
  - PITR backup status tracking

- 🎯 **Real-time Monitoring**
  - Instant compliance status updates
  - Detailed status reporting
  - Historical compliance tracking

- 🛠 **Automated Fixes**
  - One-click compliance issue resolution
  - Automatic configuration updates
  - Validation after fixes

- 💻 **Modern Tech Stack**
  - Next.js 14 (App Router)
  - TypeScript
  - Supabase
  - Tailwind CSS
  - Shadcn/UI

## Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Supabase account and project

## Installation

1. Clone the repository
```bash
git clone https://github.com/an525ish/compliance-checker.git
cd compliance-checker
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

Fill in your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

4. Set up the database
```sql
-- Run the SQL setup scripts provided in /database/setup.sql
```

5. Start the development server
```bash
npm run dev
```

## Database Setup

1. Create required tables and functions:
```sql
-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    email TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    mfa_enabled BOOLEAN DEFAULT false
);

-- Additional setup SQL provided in /database/setup.sql

2. Configure RLS policies as needed

## Usage

1. Access the application at `http://localhost:3000`
2. Log in with your Supabase credentials
3. Navigate to the Compliance Dashboard
4. Run compliance checks using the provided buttons
5. View detailed reports and fix any issues
```

## Screenshots

<img width="1510" alt="Image" src="https://github.com/user-attachments/assets/9a41646c-2207-4c07-ae36-f1676f0a0900" />
