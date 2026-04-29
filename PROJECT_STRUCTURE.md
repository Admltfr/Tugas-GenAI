# 📄 SuratAI - Generator Surat Otomatis

Generator surat otomatis modern untuk membuat surat lamaran kerja dan surat magang profesional dengan mudah. Dibangun dengan Next.js 16, React 19, TypeScript, dan Tailwind CSS.

## ✨ Fitur Utama

- ✅ **Desain Modern & Responsif** - Tampilan clean dan professional menggunakan Tailwind CSS
- ✅ **Formulir Interaktif** - Form yang user-friendly dengan validasi real-time
- ✅ **TypeScript** - Type-safe development dengan TypeScript
- ✅ **Komponen Reusable** - Form components yang mudah digunakan kembali
- ✅ **Validasi Form Lengkap** - Email validation, phone number validation, required fields
- ✅ **Responsive Layout** - Perfect di desktop, tablet, dan mobile
- ✅ **Dark Mode Ready** - Siap untuk dark mode implementation
- ✅ **No Backend/Database** - Frontend-only, mudah dideploy

## 📁 Struktur Folder

```
project/
├── app/                          # Next.js App Router
│   ├── lamaran/
│   │   └── page.tsx             # Halaman Surat Lamaran Kerja
│   ├── magang/
│   │   └── page.tsx             # Halaman Surat Magang
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Landing page
├── components/                   # Komponen React
│   ├── form/                    # Form components
│   │   ├── InputField.tsx       # Input field reusable
│   │   ├── TextAreaField.tsx    # Textarea field reusable
│   │   ├── SelectField.tsx      # Select dropdown reusable
│   │   ├── DateField.tsx        # Date picker reusable
│   │   ├── BiodataFormComponent.tsx  # Komponen form utama
│   │   └── index.ts             # Exports
│   ├── layout/                  # Layout components
│   │   ├── Navbar.tsx           # Navigation bar
│   │   ├── Footer.tsx           # Footer
│   │   └── index.ts             # Exports
│   └── sections/                # Halaman sections
│       ├── HeroSection.tsx      # Hero section landing page
│       ├── TemplatesSection.tsx # Pilihan jenis surat
│       ├── TemplateCard.tsx     # Card template
│       ├── FeaturesSection.tsx  # Fitur aplikasi
│       └── index.ts             # Exports
├── lib/                          # Utility functions
│   └── validation.ts            # Validasi form
├── types/                        # TypeScript types
│   └── index.ts                 # Type definitions
├── templates/                    # Letter templates (future use)
├── public/                       # Static files
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript config
├── tailwind.config.ts           # Tailwind config
└── next.config.ts               # Next.js config
```

## 🚀 Cara Memulai

### Prerequisites
- Node.js 18+ 
- npm atau yarn

### Installation

```bash
# 1. Navigate ke project directory
cd d:/Projects/Rd NextJS/gen-ai

# 2. Install dependencies
npm install

# 3. Jalankan development server
npm run dev
```

Buka browser ke [http://localhost:3000](http://localhost:3000) untuk melihat aplikasi.

## 📖 Komponen & Type Definitions

### Form Components

#### InputField
Component untuk text input field dengan validasi error display.

```tsx
<InputField
  label="Nama Lengkap"
  name="namaLengkap"
  value={formData.namaLengkap}
  onChange={handleChange}
  error={errors.namaLengkap}
  placeholder="Masukkan nama lengkap"
  required
/>
```

#### TextAreaField
Component untuk textarea dengan customizable rows.

```tsx
<TextAreaField
  label="Deskripsi Diri"
  name="deskripsiDiri"
  value={formData.deskripsiDiri}
  onChange={handleChange}
  error={errors.deskripsiDiri}
  rows={6}
  required
/>
```

#### SelectField
Component dropdown dengan custom styling.

```tsx
<SelectField
  label="Pendidikan Terakhir"
  name="pendidikanTerakhir"
  value={formData.pendidikanTerakhir}
  onChange={handleChange}
  options={EDUCATION_OPTIONS}
  required
/>
```

#### DateField
Component untuk date picker input.

```tsx
<DateField
  label="Tanggal Lahir"
  name="tanggalLahir"
  value={formData.tanggalLahir}
  onChange={handleChange}
  required
/>
```

### Validasi Form

Fungsi `validateBiodataForm` melakukan validasi:
- ✅ Required fields tidak boleh kosong
- ✅ Email format valid
- ✅ Nomor telepon hanya angka
- ✅ Tanggal valid
- ✅ Semua field ada

```tsx
import { validateBiodataForm } from '@/lib/validation';

const errors = validateBiodataForm(formData);
if (Object.keys(errors).length === 0) {
  // Form valid, lanjutkan proses
}
```

### Type Definitions

```tsx
interface BiodataForm {
  namaLengkap: string;
  tempatLahir: string;
  tanggalLahir: string;
  alamat: string;
  email: string;
  nomorTelepon: string;
  pendidikanTerakhir: string;
  deskripsiDiri: string;
}

interface LetterTemplateType {
  id: string;
  name: string;
  description: string;
  icon: string;
  route: string;
}
```

## 🎨 Styling & Tailwind CSS

Project menggunakan Tailwind CSS v4 untuk styling. Semua components sudah menggunakan Tailwind classes:

- Color scheme: Blue primary, Gray neutrals
- Spacing: Consistent gap dan padding
- Border radius: 6px (rounded-lg) untuk form, 8px (rounded-xl) untuk cards
- Shadows: Hover effects dengan shadow-md, shadow-lg
- Responsive: Mobile-first approach dengan md: dan lg: breakpoints

## 📄 Halaman & Routes

### Landing Page (`/`)
- Hero section dengan CTA button
- Template selection dengan 2 pilihan (Lamaran & Magang)
- Features section
- Responsive navbar dan footer

### Surat Lamaran Kerja (`/lamaran`)
- Form biodata lengkap
- Validasi real-time
- Success message setelah submit
- Back button ke landing page

### Surat Magang (`/magang`)
- Form biodata lengkap (sama seperti lamaran)
- Validasi real-time
- Success message setelah submit
- Back button ke landing page

## 🔧 Cara Extend Project

### Menambah Field Baru

1. Tambah di `types/index.ts`:
```tsx
interface BiodataForm {
  // ... existing fields
  fieldBaru: string;
}
```

2. Tambah di `lib/validation.ts`:
```tsx
if (!data.fieldBaru.trim()) {
  errors.fieldBaru = 'Field baru wajib diisi';
}
```

3. Tambah di form component:
```tsx
<InputField
  label="Field Baru"
  name="fieldBaru"
  value={formData.fieldBaru}
  onChange={handleChange}
  error={errors.fieldBaru}
  required
/>
```

### Menambah Template Surat Baru

1. Tambah ke `TEMPLATES` array di `components/sections/TemplatesSection.tsx`
2. Buat folder baru di `app/[template-name]/`
3. Buat `page.tsx` di folder tersebut dengan route yang sesuai

### Mengintegrasikan PDF Generation

1. Install `@react-pdf/renderer`:
```bash
npm install @react-pdf/renderer
```

2. Buat komponen template di `templates/`
3. Integrate di form submit handler

## 🎯 Development Guidelines

- **Component Structure**: Semua components di `components/` dengan folder yang terorganisir
- **Types**: Semua TypeScript interfaces di `types/index.ts`
- **Utils**: Helper functions di `lib/` folder
- **Validation**: Centralized di `lib/validation.ts`
- **Styling**: Gunakan Tailwind CSS, hindari inline styles
- **'use client'**: Components yang interactive harus pakai directive ini

## 📦 Scripts

```bash
# Development
npm run dev         # Start dev server

# Production
npm run build       # Build untuk production
npm run start       # Run production build

# Linting
npm run lint        # Run ESLint
```

## 🚀 Deployment

Project ini ready untuk deployment di:
- **Vercel** (Recommended untuk Next.js)
- **Netlify**
- **GitHub Pages**
- **AWS Amplify**
- **DigitalOcean App Platform**

### Deploy ke Vercel

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Deploy
vercel

# 3. Follow prompts
```

## 📝 Future Enhancements

- [ ] PDF export functionality
- [ ] More letter templates
- [ ] User accounts & letter history
- [ ] Email preview sebelum download
- [ ] Multiple language support
- [ ] Dark mode
- [ ] Letter customization
- [ ] Download sebagai format berbeda (Word, PDF, etc)

## 🤝 Contributing

Jika ada saran atau improvement, silakan buat issue atau PR.

## 📄 License

MIT License - Silakan digunakan untuk keperluan apapun.

---

**Dibuat dengan ❤️ menggunakan Next.js 16, React 19, TypeScript, dan Tailwind CSS**
