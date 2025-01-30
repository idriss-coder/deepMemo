import Image from "next/image";

export default function Home() {
  return (
      <div
          className="min-h-screen bg-gradient-to-b from-green-100 to-blue-100 font-[family-name:var(--font-geist-sans)]">
        {/* En-tête */}
        <header className="p-6 bg-white shadow-md">
          <div className="container mx-auto flex items-center justify-between">
            <Image
                src="/logo.svg" // Remplacez par votre logo
                alt="Logo"
                width={120}
                height={40}
            />
            <nav>
              <a href="#" className="text-gray-700 hover:text-green-600 mr-4">
                Connexion
              </a>
              <a
                  href="#"
                  className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600"
              >
                S'inscrire
              </a>
            </nav>
          </div>
        </header>

        {/* Section principale */}
        <main className="container mx-auto p-8">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
            Bienvenue sur notre plateforme d'apprentissage !
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Carte 1 */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <Image
                  src="/lesson-icon.svg" // Remplacez par une icône de leçon
                  alt="Leçon"
                  width={64}
                  height={64}
                  className="mx-auto mb-4"
              />
              <h2 className="text-xl font-semibold text-center text-gray-800 mb-2">
                Leçons
              </h2>
              <p className="text-gray-600 text-center">
                Apprenez à votre rythme avec nos leçons interactives.
              </p>
              <button className="mt-4 w-full bg-green-500 text-white py-2 rounded-full hover:bg-green-600">
                Commencer
              </button>
            </div>

            {/* Carte 2 */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <Image
                  src="/challenge-icon.svg" // Remplacez par une icône de défi
                  alt="Défi"
                  width={64}
                  height={64}
                  className="mx-auto mb-4"
              />
              <h2 className="text-xl font-semibold text-center text-gray-800 mb-2">
                Défis
              </h2>
              <p className="text-gray-600 text-center">
                Testez vos connaissances avec des défis quotidiens.
              </p>
              <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600">
                Participer
              </button>
            </div>

            {/* Carte 3 */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <Image
                  src="/progress-icon.svg" // Remplacez par une icône de progression
                  alt="Progression"
                  width={64}
                  height={64}
                  className="mx-auto mb-4"
              />
              <h2 className="text-xl font-semibold text-center text-gray-800 mb-2">
                Progression
              </h2>
              <p className="text-gray-600 text-center">
                Suivez vos progrès et atteignez vos objectifs.
              </p>
              <button className="mt-4 w-full bg-purple-500 text-white py-2 rounded-full hover:bg-purple-600">
                Voir
              </button>
            </div>
          </div>
        </main>

        {/* Pied de page */}
        <footer className="bg-white p-6 mt-8 shadow-md">
          <div className="container mx-auto text-center text-gray-600">
            <p>© 2023 Votre Plateforme. Tous droits réservés.</p>
            <div className="mt-2 flex justify-center gap-4">
              <a href="#" className="hover:text-green-600">
                Confidentialité
              </a>
              <a href="#" className="hover:text-green-600">
                Conditions
              </a>
              <a href="#" className="hover:text-green-600">
                Contact
              </a>
            </div>
          </div>
        </footer>
      </div>
  );
}