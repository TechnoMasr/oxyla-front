import { useMutation } from "@tanstack/react-query";
import img from "../../../assets/images/book-img.jpg";
import { sendNewsletter } from "../../../services/homeServices";
import { useState } from "react";
import SuccessModal from "../../../components/modals/SuccessModal";

const HomeBanner = () => {
  const [email, setEmail] = useState("");
  const [successModal, setSuccessModal] = useState(false);

  // ✅ React Query mutation
  const mutation = useMutation({
    mutationFn: sendNewsletter,
    onSuccess: () => {
      setEmail("");
      setSuccessModal(true);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    mutation.mutate(email);
  };

  return (
    <section className="my-10 container">
      <div className="bg-stone-200 rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-2/5 lg:w-1/3 h-[300px]">
          <img src={img} alt="" className="w-full h-full object-cover" />
        </div>

        <div className="p-4 lg:p-8 flex-1 content-center">
          <p className="text-2xl lg:text-4xl font-bold text-center mb-4 lg:mb-8">
            Get special offers on oxygen rooms.
          </p>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-2 rounded-full flex items-center"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-2 outline-0 border-0"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button className="bg-myGreen text-white px-4 py-2 rounded-full hover:brightness-90 transition cursor-pointer">
              {mutation.isPending ? "Sending..." : "Subscribe"}
            </button>
          </form>
        </div>
      </div>

      <SuccessModal
        openModal={successModal}
        onClose={() => setSuccessModal(false)}
        msg="Your email has been sent successfully."
        onConfirm={() => setSuccessModal(false)}
        btnText="OK"
      />
    </section>
  );
};

export default HomeBanner;
