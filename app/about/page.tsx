import { Metadata } from "next";
import Link from "next/link";
import { HeroSection } from "@/components/sections";

export const metadata: Metadata = {
  title: "Tentang | SuratAI",
  description: "Tentang generator surat otomatis menggunakan Next.js.",
};

export default function AboutPage() {
  return (
    <main className="flex-1 bg-slate-50 transition-colors dark:bg-slate-950">
      <div className="relative isolate overflow-hidden">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-600 to-blue-400 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>

        <div className="mx-auto max-w-4xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-white">
              Tentang SuratAI
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-slate-300">
              SuratAI adalah aplikasi generator surat otomatis yang dirancang untuk
              membantu pengguna membuat surat resmi seperti surat lamaran kerja
              dan surat permohonan magang dengan cepat, mudah, dan profesional.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <div className="h-5 w-5 flex-none text-blue-600 dark:text-blue-400">✨</div>
                  Tujuan Aplikasi
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-slate-300">
                  <p className="flex-auto">
                    Misi kami adalah menyederhanakan proses pembuatan dokumen administratif.
                    Seringkali membuat format surat yang tepat memakan waktu dan rumit.
                    Dengan SuratAI, Anda cukup mengisi formulir dan surat Anda siap dicetak.
                  </p>
                </dd>
              </div>

              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <div className="h-5 w-5 flex-none text-blue-600 dark:text-blue-400">🚀</div>
                  Fitur Utama
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-slate-300">
                  <ul className="list-disc pl-5 space-y-1 flex-auto">
                    <li>Preview real-time dari dokumen yang diketik.</li>
                    <li>Auto-save draft untuk memastikan data Anda tidak hilang.</li>
                    <li>Export dokumen ke format PDF dan DOCX.</li>
                    <li>Kemampuan print langsung dari browser.</li>
                    <li>Dark mode dan antarmuka responsif di semua perangkat.</li>
                  </ul>
                </dd>
              </div>

              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <div className="h-5 w-5 flex-none text-blue-600 dark:text-blue-400">💻</div>
                  Teknologi
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-slate-300">
                  <p className="flex-auto">
                    Aplikasi ini dibangun menggunakan Next.js 15, React 19, dan Tailwind CSS.
                    Untuk keperluan export dokumen, kami menggunakan html2pdf.js dan library docx.
                  </p>
                </dd>
              </div>

              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <div className="h-5 w-5 flex-none text-blue-600 dark:text-blue-400">📖</div>
                  Cara Penggunaan
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-slate-300">
                  <p className="flex-auto">
                    Pilih jenis surat dari beranda, lalu isi setiap kolom yang tersedia di formulir. 
                    Anda dapat melihat perubahannya langsung pada panel preview. 
                    Setelah selesai, gunakan tombol export atau print untuk mendapatkan hasil akhirnya.
                  </p>
                  <p className="mt-6">
                    <Link href="/" className="text-sm font-semibold leading-6 text-blue-600 dark:text-blue-400">
                      Mulai buat surat <span aria-hidden="true">→</span>
                    </Link>
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </main>
  );
}
