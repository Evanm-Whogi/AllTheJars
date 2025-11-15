export default function hero() {
    return (
        <div className="container mx-auto text-white">
            <div className="text-center px-3 md:px-0">
                <h1 className="text-6xl font-bold">{process.env.NEXT_PUBLIC_NAME} - <span className="hero-gradient">Minecraft Jars</span></h1>
                <p className="text-xl text-muted pt-2">{process.env.NEXT_PUBLIC_NAME} is your ultimate hub for Minecraft downloads, providing direct-from-source access to every<br/> official and modded Minecraft jar file, ensuring authenticity and ease of access for all your server and client needs.</p>
                <span className="block text-muted mt-5">All files are downloaded directly from their respective source. We don't host any files on our servers.</span>
            </div>
        </div>
    );
}