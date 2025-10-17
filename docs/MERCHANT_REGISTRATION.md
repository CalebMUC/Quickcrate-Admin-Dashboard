# Merchant Registration Wizard

## Overview

A comprehensive step-by-step merchant registration system built with React Hook Form, Zod validation, and TypeScript. The wizard guides users through a 5-step process to collect all necessary merchant information while maintaining a user-friendly experience.

## Features

### ✅ **Step-by-Step Process**
1. **Contact Information** - Personal details and contact info
2. **Business Information** - Business details, type, and category
3. **Payment Information** - Conditional payment method setup
4. **Documents Upload** - File uploads with preview and validation
5. **Terms & Review** - Final review and terms acceptance

### 🎨 **User Experience**
- **Progressive Stepper** - Visual progress indicator with clickable navigation
- **Form Validation** - Real-time validation with clear error messages
- **Responsive Design** - Works seamlessly on desktop and mobile
- **File Upload** - Drag & drop with preview and validation
- **Conditional Fields** - Dynamic form fields based on selections
- **Data Persistence** - Form data preserved across steps

### 🔧 **Technical Features**
- **TypeScript** - Full type safety with proper interfaces
- **React Hook Form** - Efficient form handling with validation
- **Zod Schema** - Runtime validation and type inference
- **File Handling** - Upload, preview, and validation
- **Toast Notifications** - Success/error feedback
- **Debug Mode** - Development-only form data preview

## File Structure

```
components/merchants/registration/
├── merchant-registration-wizard.tsx    # Main wizard orchestrator
├── contact-step.tsx                    # Step 1: Contact information
├── business-step.tsx                   # Step 2: Business details
├── payment-step.tsx                    # Step 3: Payment methods
├── documents-step.tsx                  # Step 4: File uploads
└── terms-review-step.tsx              # Step 5: Review and submit

components/ui/
└── stepper.tsx                        # Reusable progress stepper

lib/types/
└── merchant-registration.ts           # TypeScript interfaces and constants

app/merchants/
├── page.tsx                          # Updated merchants list page
└── new/page.tsx                      # New registration page
```

## Step Details

### Step 1: Contact Information
**Required Fields:**
- Merchant Name (min 2 chars)
- Email (valid format)
- Phone (min 10 digits, numeric validation)
- Address (min 10 chars for complete address)

**Optional Fields:**
- Social Media

**Validations:**
- Real-time form validation
- Email format checking
- Phone number pattern validation

### Step 2: Business Information
**Required Fields:**
- Business Name (min 2 chars)
- Business Type (dropdown selection)

**Optional Fields:**
- Business Registration Number
- KRA PIN
- Business Nature (description)
- Business Category (dropdown)
- Delivery Method (dropdown)

**Features:**
- Pre-defined dropdown options
- Business type categories
- Delivery method selection

### Step 3: Payment Information
**Dynamic Fields Based on Selection:**

**Payment Channel Selection (required):**
- Bank Transfer
- M-Pesa
- Cash on Delivery

**Conditional Validations:**
- **If Bank selected:** Bank Name, Account Number, Account Holder Name (all required)
- **If M-Pesa selected:** Either Paybill OR Till Number required
- **Cash on Delivery:** No additional fields

**Features:**
- Multi-select payment channels
- Conditional field rendering
- Dynamic validation rules
- Visual payment method icons

### Step 4: Documents Upload
**File Upload Features:**
- **Supported Formats:** PDF, JPEG, JPG, PNG
- **File Size Limit:** 5MB per file
- **Upload Methods:** Click to upload or drag & drop
- **Preview:** Image preview for supported formats
- **Validation:** File type and size checking

**Documents:**
- KRA PIN Certificate (optional)
- Business Registration Certificate (optional)

**Features:**
- File preview with remove/replace options
- Progress indicators
- Error handling for invalid files
- Clean file URL management

### Step 5: Terms & Review
**Review Features:**
- **Complete Data Summary:** All entered information displayed
- **Edit Navigation:** Click edit buttons to return to specific steps
- **Document Status:** Shows uploaded vs. not uploaded status
- **Scrollable Review:** Clean layout with organized sections

**Terms Acceptance:**
- Terms and Conditions (required checkbox)
- Return Policy (required checkbox)
- Links to full terms (placeholder)

**Submission:**
- Final validation before submit
- Loading state during submission
- Success/error toast notifications

## Data Structure

```typescript
interface MerchantRegistrationData {
  // Contact (Step 1)
  merchantName: string
  email: string
  phone: string
  address: string
  socialMedia: string

  // Business (Step 2)
  businessName: string
  businessType: string
  businessRegistrationNo: string
  kraPin: string
  businessNature: string
  businessCategory: string
  deliveryMethod: string

  // Payment (Step 3)
  preferredPaymentChannel: PaymentChannel[]
  bankName?: string
  bankAccountNo?: string
  bankAccountName?: string
  mpesaPaybill?: string
  mpesaTillNumber?: string

  // Documents (Step 4)
  kraPinCertificate?: File | null
  businessRegistrationCertificate?: File | null

  // Terms (Step 5)
  termsAndCondition: boolean
  returnPolicy: boolean
  status: string
}
```

## Usage

### Navigation to Registration
```tsx
// From merchants page
<Button onClick={() => router.push("/merchants/new")}>
  <UserPlus className="mr-2 h-4 w-4" />
  New Registration
</Button>
```

### Wizard Implementation
```tsx
<MerchantRegistrationWizard
  onComplete={(data) => {
    // Handle successful registration
    console.log("Registration data:", data)
    // API call to save merchant
    // Navigate to success page
  }}
  onCancel={() => {
    // Handle cancellation
    router.back()
  }}
/>
```

## Validation Rules

### Contact Step
- Merchant name: minimum 2 characters
- Email: valid email format
- Phone: minimum 10 digits, numeric pattern
- Address: minimum 10 characters

### Business Step
- Business name: minimum 2 characters
- Business type: required selection from dropdown

### Payment Step
- At least one payment channel required
- Bank details: all fields required if bank selected
- M-Pesa: either paybill or till number required if selected

### Documents Step
- File size: maximum 5MB per file
- File types: PDF, JPEG, JPG, PNG only
- Optional uploads with validation

### Terms Step
- Both terms checkboxes must be accepted
- Cannot submit without acceptance

## Integration Points

### API Integration
The wizard is designed to easily integrate with your backend API:

```typescript
// In the main wizard component
const handleSubmit = async (finalData: MerchantRegistrationData) => {
  try {
    // Replace with your API endpoint
    const response = await fetch('/api/merchants/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(finalData)
    })
    
    if (response.ok) {
      toast.success("Registration submitted successfully!")
      onComplete?.(finalData)
    }
  } catch (error) {
    toast.error("Failed to submit registration")
  }
}
```

### File Upload Integration
For file uploads, you'll need to implement multipart form data:

```typescript
const uploadFiles = async (files: { [key: string]: File }) => {
  const formData = new FormData()
  Object.entries(files).forEach(([key, file]) => {
    formData.append(key, file)
  })
  
  // Upload to your file storage service
  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData
  })
  
  return response.json()
}
```

## Customization

### Adding New Steps
1. Create new step component following existing patterns
2. Add step to STEPS array in wizard
3. Add case to renderCurrentStep switch
4. Update TypeScript interfaces

### Modifying Validation
Update Zod schemas in each step component:

```typescript
const customSchema = z.object({
  newField: z.string().min(1, "New field is required"),
  // ... existing fields
})
```

### Styling Customization
All components use Tailwind CSS and shadcn/ui components. Customize through:
- Tailwind classes
- CSS custom properties
- Theme configuration

## Browser Support
- Modern browsers with ES2017+ support
- File API support for uploads
- Responsive design for mobile devices

## Performance Considerations
- Form data persisted in component state
- File URLs properly cleaned up
- Conditional rendering for better performance
- Optimized re-renders with React Hook Form

This registration wizard provides a professional, user-friendly experience while maintaining robust validation and type safety throughout the process.