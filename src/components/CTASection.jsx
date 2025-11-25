import Link from "next/link";

export default function CTASection() {
    return (
        <section className="py-20 bg-black text-white text-center mt-16">
            <h2 className="text-4xl font-bold">Ready to Start Managing?</h2>
            <p className="mt-3 text-gray-300">
                Create an account and take control of your product workflow.
            </p>

            <Link
                href="/register"
                className="mt-6 inline-block bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition"
            >
                Get Started
            </Link>
        </section>
    );
}
