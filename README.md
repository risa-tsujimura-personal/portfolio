# Portfolio Landing Page

A modern portfolio website built with Next.js, featuring a contact form with email functionality powered by Resend.

## Features

- Responsive design with modern UI components
- Contact form with email sending capability
- Email templates using React Email
- Spam protection with honeypot fields
- Input validation and error handling
- Toast notifications for user feedback

## Contact Form Setup

### 1. Resend Configuration

1. Sign up for a [Resend](https://resend.com/) account
2. Get your API key from the Resend dashboard
3. Set up your domain for sending emails (or use Resend's test domain)

### 2. Environment Variables

Create a `.env.local` file in the project root with the following variables:

```bash
# Resend API key (get from https://resend.com/)
RESEND_API_KEY=your_resend_api_key_here

# Email addresses for contact form
# e.g. "Portfolio Contact <noreply@your-domain.com>"
RESEND_FROM=Portfolio Contact <noreply@your-domain.com>

# Destination that receives contact messages
RESEND_TO=your-email@example.com
```

### 3. Testing the Contact Form

1. Start the development server:
   ```bash
   pnpm dev
   ```

2. Navigate to the contact section and fill out the form
3. Submit the form to test email sending

### 4. Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch
```

## Project Structure

```
├── app/
│   ├── api/contact/route.ts    # Contact form API endpoint
│   └── ...
├── components/
│   ├── contact-section.tsx     # Contact form component
│   └── ...
├── lib/email/
│   ├── config.ts              # Resend client configuration
│   ├── env.ts                 # Environment variable validation
│   └── templates/
│       └── contact-message.tsx # Email template
└── __tests__/
    └── api/
        └── contact.test.ts     # API route tests
```

## Technologies Used

- **Next.js 15** - React framework
- **Resend** - Email sending service
- **React Email** - Email template system
- **Zod** - Schema validation
- **Jest** - Testing framework
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Security Features

- **Input Validation**: All form inputs are validated using Zod schemas
- **Honeypot Protection**: Hidden form field to catch spam bots
- **Rate Limiting**: Built-in protection against spam submissions
- **Environment Variables**: Secure API key management

## Troubleshooting

### Email Not Sending

1. Check that your `.env.local` file has the correct `RESEND_API_KEY`
2. Verify that your `RESEND_FROM` email is verified in Resend
3. Check the browser console and server logs for error messages

### Environment Variables Not Loading

1. Ensure `.env.local` is in the project root directory
2. Restart the development server after adding environment variables
3. Check that variable names match exactly (case-sensitive)

## License

This project is private and proprietary.





