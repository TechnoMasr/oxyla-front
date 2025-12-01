import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { sendContactUs } from "../../../services/homeServices";
import * as yup from "yup";
import FormBtn from "../../../components/form/FormBtn";
import FormError from "../../../components/form/FormError";
import MainInput from "../../../components/form/MainInput";
import SuccessModal from "../../../components/modals/SuccessModal";
import { useState } from "react";
import { LiaFaxSolid } from "react-icons/lia";
import { TbPhoneCall } from "react-icons/tb";
import { HiOutlineMailOpen } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const ContactForm = () => {
  const { t } = useTranslation();
  const [successModal, setSuccessModal] = useState(false);

  const { setting } = useSelector((state) => state.setting);

  const contactSchema = yup.object().shape({
    inquiry_type: yup.string().required(t("ContactForm.errors.inquiry_type")),
    subject: yup.string().required(t("ContactForm.errors.subject")),
    message: yup.string().required(t("ContactForm.errors.message")),
    file_path: yup
      .mixed()
      .nullable()
      .required(t("ContactForm.errors.file_path")),
    name: yup.string().required(t("ContactForm.errors.name")),
    email: yup
      .string()
      .email(t("ContactForm.errors.emailInvalid"))
      .required(t("ContactForm.errors.email")),
    phone: yup.string().required(t("ContactForm.errors.phone")),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(contactSchema),
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: (formData) => sendContactUs(formData),
    onSuccess: () => {
      setSuccessModal(true);
      reset();
    },
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "file_path" && value?.[0]) {
        formData.append(key, value[0]);
      } else {
        formData.append(key, value);
      }
    });
    mutate(formData);
  };

  const contactUsList = [
    {
      label: t("ContactForm.contactLabels.phone"),
      value: setting?.phone,
      icon: <TbPhoneCall />,
    },
    {
      label: t("ContactForm.contactLabels.email"),
      value: setting?.site_email,
      icon: <HiOutlineMailOpen />,
    },
    {
      label: t("ContactForm.contactLabels.fax"),
      value: setting?.fax,
      icon: <LiaFaxSolid />,
    },
  ];

  return (
    <section className="space-y-6">
      <hgroup>
        <h1 className="text-3xl lg:text-5xl font-bold mb-2">
          {t("ContactForm.getInTouch").split(" ")[0]}{" "}
          <span className="text-myPurple">
            {t("ContactForm.getInTouch").split(" ")[1]}
          </span>
        </h1>
        <p className="text-sm text-gray-500">{t("ContactForm.description")}</p>
      </hgroup>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <MainInput
          id="inquiry_type"
          label={t("ContactForm.inquiryType")}
          type="select"
          options={[
            { value: "", label: t("ContactForm.selectInquiry") },
            { value: "general", label: t("ContactForm.general") },
            { value: "support", label: t("ContactForm.support") },
            { value: "complaint", label: t("ContactForm.complaint") },
            { value: "suggestion", label: t("ContactForm.suggestion") },
            { value: "partnership", label: t("ContactForm.partnership") },
          ]}
          register={register("inquiry_type")}
          error={errors.inquiry_type?.message}
        />

        <MainInput
          id="subject"
          label={t("ContactForm.subject")}
          placeholder={t("ContactForm.subjectPlaceholder")}
          register={register("subject")}
          error={errors.subject?.message}
        />

        <MainInput
          id="message"
          label={t("ContactForm.messageDetails")}
          type="textarea"
          placeholder={t("ContactForm.messagePlaceholder")}
          register={register("message")}
          error={errors.message?.message}
        />

        <MainInput
          id="file_path"
          label={t("ContactForm.attachFile")}
          type="file"
          register={register("file_path")}
          error={errors.file_path?.message}
        />

        <MainInput
          id="name"
          label={t("ContactForm.name")}
          placeholder={t("ContactForm.namePlaceholder")}
          register={register("name")}
          error={errors.name?.message}
        />

        <MainInput
          id="email"
          label={t("ContactForm.email")}
          placeholder={t("ContactForm.emailPlaceholder")}
          register={register("email")}
          error={errors.email?.message}
        />

        <MainInput
          id="phone"
          label={t("ContactForm.phone")}
          type="number"
          placeholder={t("ContactForm.phonePlaceholder")}
          register={register("phone")}
          error={errors.phone?.message}
        />

        <FormBtn title={t("ContactForm.send")} loading={isPending} />
        <FormError errorMsg={error?.response?.data?.message} />
      </form>

      <div className="flex flex-wrap justify-between gap-4">
        {contactUsList.map(
          (item, index) =>
            item.value && (
              <div
                key={index}
                className="flex items-center gap-2 text-myBlue-1 group text-sm"
              >
                <span className="text-3xl group-hover:scale-120 duration-300">
                  {item.icon}
                </span>
                <div>
                  <p className="font-bold">{item.label}</p>
                  <p className="text-myPurple">{item.value}</p>
                </div>
              </div>
            )
        )}
      </div>

      <SuccessModal
        openModal={successModal}
        onClose={() => setSuccessModal(false)}
        msg={t("ContactForm.messageSent")}
        onConfirm={() => setSuccessModal(false)}
        btnText={t("ContactForm.ok")}
      />
    </section>
  );
};

export default ContactForm;
