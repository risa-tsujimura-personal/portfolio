# Portfolio Landing Page

A modern portfolio website built with Next.js, featuring a contact form with email functionality powered by Gmail SMTP (via nodemailer).

## Features

- Responsive design with modern UI components
- Contact form with email sending capability
- Spam protection with honeypot fields
- Input validation and error handling
- Toast notifications for user feedback

## Contact Form Setup

### 1. Gmail App Password

1. Enable 2-Step Verification on the Gmail account you want to send from
2. Generate an App Password at https://myaccount.google.com/apppasswords
3. Use that 16-character password as `GMAIL_APP_PASSWORD` below (not your normal Gmail password)

### 2. Environment Variables

Create a `.env.local` file in the project root with the following variables:

```bash
# Gmail address used to authenticate and send the contact form emails
GMAIL_USER=your-address@gmail.com

# App password generated above
GMAIL_APP_PASSWORD=your-16-char-app-password

# Destination that receives contact messages (defaults to GMAIL_USER if unset)
CONTACT_TO=your-address@gmail.com
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
└── __tests__/
    └── api/
        └── contact.test.ts     # API route tests
```

## Technologies Used

- **Next.js 15** - React framework
- **Nodemailer** - Email sending via Gmail SMTP
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

1. Check that your `.env.local` file has the correct `GMAIL_USER` and `GMAIL_APP_PASSWORD`
2. Verify you generated an App Password (not your normal Gmail password) with 2-Step Verification enabled
3. Check the browser console and server logs for error messages

### Environment Variables Not Loading

1. Ensure `.env.local` is in the project root directory
2. Restart the development server after adding environment variables
3. Check that variable names match exactly (case-sensitive)

## License

This project is private and proprietary.





