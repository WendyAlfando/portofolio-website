// Opening "WA." screen, driven entirely by CSS (see .splash in globals.css) so it can never get stuck
// if JavaScript fails. The inline script runs before the first paint and hides it after the first
// page view of a browser session; it is never shown when reduced motion is preferred.
const oncePerSession =
    'try{if(sessionStorage.getItem("wa-splash")){document.documentElement.dataset.splash="seen"}else{sessionStorage.setItem("wa-splash","1")}}catch(e){}'

export default function SplashScreen({ label }: { label: string }) {
    return (
        <>
            <script dangerouslySetInnerHTML={{ __html: oncePerSession }} />
            <div aria-hidden className="splash pointer-events-none fixed inset-0 z-[100] place-items-center bg-slate-950">
                <div className="absolute inset-0 bg-linear-to-br from-slate-950 via-blue-950/30 to-slate-950" />
                <div className="splash-glow absolute size-72 rounded-full bg-[radial-gradient(closest-side,rgb(250_204_21/0.18),transparent)]" />
                <div className="relative flex flex-col items-center gap-7">
                    <p className="splash-logo bg-linear-to-r from-yellow-400 to-amber-200 bg-clip-text font-display text-6xl font-bold text-transparent md:text-7xl">
                        WA.
                    </p>
                    <div className="h-0.5 w-48 overflow-hidden rounded-full bg-slate-800">
                        <div className="splash-bar h-full origin-left rounded-full bg-linear-to-r from-yellow-400 to-blue-400" />
                    </div>
                    <p className="text-xs tracking-[0.3em] text-slate-400 uppercase">{label}</p>
                </div>
            </div>
        </>
    )
}
