export default function PopularProducts() {
    return (
        <section className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 text-center">Popular Products</h2>
            <p className="text-center text-gray-600 mt-2">A quick look at customer favorites.</p>

            <div className="grid md:grid-cols-3 gap-8 mt-10">
                {[1, 2, 3].map((item) => (
                    <div key={item} className="shadow bg-white rounded-xl p-5 hover:shadow-lg transition">
                        <div className="h-40 bg-gray-200 mb-4 rounded"></div>
                        <h3 className="text-xl font-semibold">Product Name {item}</h3>
                        <p className="text-gray-600 text-sm mt-2">
                            Short description about the product. Clean UI and fast loading.
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
