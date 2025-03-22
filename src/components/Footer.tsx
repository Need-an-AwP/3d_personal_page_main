const Footer = () => {
    return (
        <div className="flex flex-row items-center justify-between p-4 px-20 gap-6">
            <div className="text-xs text-neutral-600">
                ©2025 KLZ
            </div>

            <div className="flex flex-row justify-between items-center text-sm text-neutral-500 gap-5">
                <div className="space-y-2 text-right">
                    <p>
                        Creativity from <a href="https://www.nareshkhatri.site/" target="_blank" rel="noopener noreferrer" className="underline">Naresh Khatri</a>
                    </p>
                    <p>Deployed on Cloudflare</p>
                </div>
                <div className="w-0.5 h-[50px] bg-neutral-500 rounded-full"/>
                <div className="text-left">
                    Made with<br />
                    <a href="https://ui.shadcn.com/" target="_blank" rel="noopener noreferrer" className="underline">shadcn/ui</a><br />
                    <a href="https://ui.aceternity.com/" target="_blank" rel="noopener noreferrer" className="underline">Aceternity UI</a>
                </div>
            </div>

        </div>
    )
}

export default Footer;