import { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";

const initialForm = {
  name: "",
  surname: "",
  email: "",
  password: "",
  term: false,
};

let schema = yup.object().shape({
  name: yup.string().required("Lütfen isminizi giriniz."),
  surname: yup.string().required("Lütfen soyisminizi giriniz."),
  email: yup.string().email().required("Lütfen mailinizi giriniz."),
  password: yup.string().required().min(6, "Şifreniz en az 6 haneli olmalı."),
  term: yup
    .boolean()
    .oneOf([true], "Devam edebilmek için onaylamanız gerekir."),
});

function Form(props) {
  //const { addMember } = props;
  const [formData, setFormData] = useState(initialForm);
  const [isEditing, setIsEditing] = useState(false);
  const [buttonDisabledMi, setButtonDisabledMi] = useState(true);

  const [errors, setErrors] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    term: false,
  });

  useEffect(() => {
    schema.isValid(formData).then((valid) => setButtonDisabledMi(!valid));
  }, [formData]);

  useEffect(() => {
    console.log("yeniden render");
    props.editMode ? setFormData(props.editMode) : setFormData(initialForm);

    props.editMode ? setIsEditing(true) : setIsEditing(false);
  }, [props.editMode]);

  function changeHandler(e) {
    const { value, type, checked, name } = e.target;
    let fieldData = type === "checkbox" ? checked : value;
    const newFormData = {
      ...formData,
      [name]: fieldData,
    };
    setFormData(newFormData);
    checkValidation(name, fieldData);
  }

  function checkValidation(name, value) {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => {
        setErrors({
          ...errors,
          [name]: "",
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [name]: err.errors[0],
        });
      });
  }

  function submitHandler(e) {
    e.preventDefault();
    axios
      .post("https://reqres.in/api/users", formData)
      .then(function (response) {
        console.log(response.data);
        props.addMember(response.data);
        setFormData(initialForm);
        setIsEditing(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <div>
      {isEditing ? <h3>Üye Düzenle</h3> : <h3>Yeni Üye Ekle</h3>}
      <form onSubmit={submitHandler}>
        <div className="form-line">
          <label htmlFor="name">First name: </label>
          <input
            onChange={(e) => changeHandler(e)}
            type="text"
            id="name"
            name="name"
            value={formData.name}
          />
        </div>
        {errors.name && <p>{errors.name} </p>}
        <div className="form-line">
          <label htmlFor="surname">Last name: </label>
          <input
            onChange={(e) => changeHandler(e)}
            type="text"
            id="surname"
            name="surname"
            value={formData.surname}
          />
        </div>
        {errors.surname && <p>{errors.surname} </p>}
        <div className="form-line">
          <label htmlFor="email">E-mail: </label>
          <input
            onChange={(e) => changeHandler(e)}
            type="email"
            id="email"
            name="email"
            value={formData.email}
          />
        </div>
        {errors.email && <p>{errors.email} </p>}
        <div className="form-line">
          <label htmlFor="password">Password: </label>
          <input
            onChange={(e) => changeHandler(e)}
            type="password"
            id="password"
            name="password"
            value={formData.password}
          />
        </div>
        {errors.password && <p>{errors.password} </p>}
        <div className="form-line">
          <label htmlFor="term">Onay </label>
          <input
            onChange={(e) => changeHandler(e)}
            type="checkbox"
            id="term"
            name="term"
            checked={formData.term}
          />{" "}
        </div>
        {errors.term && <p>{errors.term} </p>}
        <button disabled={buttonDisabledMi} className="submit" type="submit">
          {" "}
          {isEditing ? "Üye Düzenle" : "Yeni Üye Ekle"}
        </button>
      </form>{" "}
    </div>
  );
}

export default Form;
