import Link from "next/link"

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white selection:bg-blue-500/30">
            <div className="text-center">
                <h1 className="text-9xl font-bold font-playfair bg-gradient-to-r from-blue-500 to-yellow-500 bg-clip-text text-transparent mb-4">
                    404
                </h1>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Halaman Tidak Ditemukan</h2>
                <p className="text-slate-400 max-w-md mx-auto mb-10 text-lg">
                    Maaf, halaman yang Anda cari tidak tersedia. Mungkin telah dipindahkan atau dihapus.
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/25 hover:-translate-y-1"
                >
                    Kembali ke Beranda
                </Link>
            </div>
        </div>
    )
}
