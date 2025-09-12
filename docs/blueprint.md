# **App Name**: LiquorStore.ai

## Core Features:

- Invoice OCR and Parsing: Ingests invoice images/PDFs, performs OCR, and uses AI to parse line items into a structured format. Uses a tool to decide whether normalization rules should be applied.
- Invoice Review: Allows users to review parsed invoice data, make inline edits, and flag potential issues.
- Inventory Management: Provides a searchable and filterable table to manage inventory levels, prices, and vendor information.
- POS Sync: Syncs inventory data with supported POS systems (e.g., Clover, BottlePOS) via pluggable adapters.
- Vendor Rule Management: Allows admins to create and manage vendor rules for data normalization and POS mapping.
- Dashboard Overview: Displays key metrics such as invoices processed, pending approvals, and inventory value in a visual dashboard.
- Authentication and Authorization: Secure user authentication with role-based access control (Admin, Manager, Clerk) enforced via Firebase Auth and Firestore Security Rules.

## Style Guidelines:

- Primary color: Deep purple (#673AB7) to convey a sense of professionalism and security appropriate to back-office business software.
- Background color: Light gray (#F5F5F5), almost the same hue as purple, desaturated to 20%, brightened appropriately for a light scheme
- Accent color: Teal (#009688), approximately 30 degrees 'left' of purple in hue, desaturated, lightened significantly for contrast.
- Headline font: 'Space Grotesk', sans-serif, for a modern feel.
- Body font: 'Inter', sans-serif, to pair with Space Grotesk, for body text
- Code font: 'Source Code Pro' for displaying structured logs
- Use consistent and clear icons from a library like Material Design Icons.
- Employ a clean and structured layout with a sidebar navigation and top bar for key actions.
- Incorporate subtle transitions and loading animations to enhance the user experience.