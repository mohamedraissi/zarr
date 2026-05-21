import * as Yup from "yup";

export const YupObject = (schemaObject) => Yup.object().shape(schemaObject);

export const emailSchema = Yup.string().email("Veuillez saisir une adresse e-mail valide").required("L'adresse e-mail est obligatoire");
export const passwordSchema = Yup.string().min(8, "Trop court !").max(20, "Trop long !").required("Le mot de passe est obligatoire");
export const loginPasswordSchema = Yup.string().required("Le mot de passe est obligatoire");
export const recaptchaSchema = Yup.string().required("Le reCAPTCHA est obligatoire");
export const nameSchema = Yup.string().required("Le nom est obligatoire");
export const descriptionSchema = Yup.string().required("La description est obligatoire").min(10, "La description doit contenir au moins 10 caractères.");
export const roleIdSchema = Yup.string().required("Le rôle est obligatoire");
export const permissionsSchema = Yup.array().min(1, "Au moins une permission est requise").required("Les permissions sont obligatoires");
export const dropDownScheme = Yup.array().min(1, "Veuillez sélectionner au moins une option").required("Ce champ est obligatoire");
export const passwordConfirmationSchema = Yup.string()
  .when("password", {
    is: (val) => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf([Yup.ref("password")], "Les deux mots de passe doivent être identiques"),
  }).required("La confirmation du mot de passe est obligatoire");

export const visibleTimeSchema = Yup.date().when("stock_status", {
  is: (val) => val === "coming_soon",
  then: Yup.date().required("La date de visibilité est obligatoire"),
});

export const ifTypeSimpleSchema = Yup.string().when("type", {
  is: (val) => val == "simple",
  then: Yup.string().required("Ce champ est obligatoire"),
  otherwise: Yup.string().notRequired()
});

export const idCreateAccount = Yup.string().when("create_account", {
  is: true,
  then: Yup.string().required("Ce champ est obligatoire"),
  otherwise: Yup.string().notRequired()
});

export const ifTypeSimpleArraySchema = Yup.array().when("type", {
  is: (val) => val === "simple",
  then: Yup.array().min(1, "Au moins un élément est requis").required("Ce champ est obligatoire"),
  otherwise: Yup.string().notRequired()
});
export const ifIsUnlimited = Yup.number().when("is_unlimited", {
  is: (val) => !val,
  then: Yup.number().positive("Doit être un nombre positif").required("Ce champ est obligatoire"),
});
export const ifIsExpirable = Yup.date().when("is_expired", {
  is: (val) => val,
  then: Yup.date().required("La date est obligatoire"),
});

export const ifTypeIsfree_shipping = Yup.number().when("type", {
  is: (val) => val !== "free_shipping",
  then: Yup.number().positive("Doit être un nombre positif").required("Ce champ est obligatoire"),
});

export const ifShippingTypeIsFree = Yup.number().when("shipping_type", {
  is: (val) => val !== "free",
  then: Yup.number().positive("Doit être un nombre positif").required("Ce champ est obligatoire"),
});

export const discountSchema = Yup.number().min(0, "Le rabais ne peut pas être inférieur à 0").max(100, "Le rabais ne peut pas dépasser 100");
export const requiredSchema = Yup.mixed().required("Ce champ est obligatoire");
export const StatusSchema = Yup.boolean().required("Le statut est obligatoire");

export const phoneSchema = Yup.string().min(8, "Le numéro de téléphone doit contenir 8 chiffres").max(8, "Le numéro de téléphone doit contenir 8 chiffres").required("Le numéro de téléphone est obligatoire");

export const ifIsApplyAll = Yup.array().when("is_apply_all", {
  is: (val) => !val,
  then: Yup.array().min(1, "Sélectionnez au moins une option").required("Ce champ est obligatoire"),
});

export const videoLinkSchema = Yup.string().when('video_provider', {
  is: (val) => val,
  then: Yup.string().required("Le lien de la vidéo est obligatoire"),
  // otherwise: Yup.string().nullable(),
})

export const attributeValues = Yup.array().of(
  Yup.object().shape({
    value: Yup.string().required("La valeur est obligatoire")
  })
)

export const variationSchema = Yup.array().of(Yup.object().shape({
  name: nameSchema,
  price: nameSchema,
  sku: nameSchema,
  quantity: nameSchema,
  status: nameSchema
}))
