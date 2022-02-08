const yup = require('yup');

module.exports.signUpSchem = yup.object().shape({
    firstName: yup.string().required().min(1),
    lastName: yup.string().required().min(1),
    nickname: yup.string().required().min(1),
    email: yup.string().email().required().min(4),
    password: yup.string().required().min(8),
});

module.exports.signInSchem = yup.object().shape({
    email: yup.string().email().required().min(4),
    password: yup.string().required().min(8),
});

module.exports.taskSchem = yup.object().shape({
    title: yup.string().required().min(1),
    body: yup.string().required().min(1),
});


