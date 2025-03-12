import { Facebook, Instagram } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-[#0B5D3A] text-white p-20 ">
      <div className="md:w-[60%] w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center md:items-start mt-10">
            <h3 className="font-medium karma mb-4">Follow on social service</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-300 transition-colors">
                <Facebook size={25} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors">
                <Instagram size={25} />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-medium mb-4 karma">Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-gray-300 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300 transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300 transition-colors">
                  Contact us
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-medium mb-4 karma">Contacts</h3>
            <ul className="space-y-2 text-sm">
              <li>123 New York</li>
              <li>Support</li>
              <li>+12345678923</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-700 mt-14"></div>

        <div className="text-center text-sm mt-6">Copyright 2023 | all right</div>
      </div>
    </footer>
  )
}

export default Footer
