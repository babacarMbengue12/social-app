import * as yup from "yup";

// yup.setLocale({
//     mixed: {
//         required: '${label} est un champ obligatoire',
//         email: 'Adresse e-mail invalide',
//         // min: '${label} doit étre supérieur ou égal à ${min}',
//         // max: '${label} doit étre inférieur ou égal à ${max}',
//     },
//     string: {
//         min: '${label} doit comporter plus de ${min} caractères',
//         max: '${label} ne doit pas comporter plus de ${max} caractères',
//     }
// })

yup.name = (label) =>
  yup
    .string()
    .label(label)
    .matches(/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/, {
      message: "ce champ n'est pas valide",
    });

export default yup;
