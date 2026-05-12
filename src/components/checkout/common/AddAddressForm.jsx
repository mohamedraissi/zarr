import request from "@/utils/axiosUtils";
import { CountryAPI } from "@/utils/axiosUtils/API";
import { YupObject, nameSchema, phoneSchema } from "@/utils/validation/ValidationSchemas";
import * as Yup from "yup";
import { useQuery } from "@tanstack/react-query";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import SelectForm from "./SelectForm";

const AddAddressForm = ({ mutate, isLoading, type, editAddress, setEditAddress, modal, setModal, isFooterDisplay, method }) => {
  const router = useRouter();
  useEffect(() => {
    modal !== "edit" && setEditAddress && setEditAddress({});
  }, [modal]);
  const { data } = useQuery({
    queryKey: [CountryAPI], queryFn: () => request({ url: CountryAPI }, router),
    refetchOnWindowFocus: false,
    select: (res) => res.data.map((country) => ({ id: country.id, name: country.name, state: country.state })),
  });


  const { t } = useTranslation("common");
  return (
    <Formik
      initialValues={{
        title: editAddress ? editAddress?.title : "",
        street: editAddress ? editAddress?.street : "",
        country_id: editAddress ? editAddress?.country_id : "",
        state_id: editAddress ? editAddress?.state_id : "",
        city: editAddress ? editAddress?.city : "",
        pincode: editAddress ? editAddress?.pincode : "",
        phone: editAddress ? editAddress?.phone : "",
        type: type ? type : null,
        country_code: editAddress ? editAddress?.country_code : "216",
      }}
      validationSchema={YupObject({
        title: Yup.string().required(t('title_is_required')),
        street: Yup.string().required(t('street_is_required')),
        city: Yup.string().required(t('city_is_required')),
        country_id: Yup.string().required(t('country_is_required')),
        state_id: Yup.string().required(t('state_is_required')),
        pincode: Yup.string(),
        phone: Yup.string().min(8, t('phone_too_short')).max(15, t('phone_too_long')).required(t('phone_is_required')),
      })}
      onSubmit={(values) => {
        if (editAddress) {
          values["_method"] = method ? method : "PUT";
        }
        values["pincode"] = values["pincode"].toString();
        mutate(values);
      }}
    >
      {({ values, setFieldValue }) => <SelectForm values={values} setFieldValue={setFieldValue} setModal={setModal} isLoading={isLoading} data={data} isFooterDisplay={isFooterDisplay} />}
    </Formik>
  );
};

export default AddAddressForm;
